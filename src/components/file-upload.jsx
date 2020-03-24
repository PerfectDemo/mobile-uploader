import React, { Fragment, useState, useContext, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/CloudUpload';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';



import { getFileExtension } from '../utils/file';


import { Context } from '../context';
import Qiniu from '../service/qiniu';



const useDialogStyles = makeStyles((theme) => ({
    dialogItem: {
        marginLeft: theme.spacing(1)
    },
}));

const KeyDialog = function(props) {
    const classes = useDialogStyles();
    const { open, onClose, onSubmit, defaultKey } = props;
    const [ key, setKey ] = useState(defaultKey);
    const ext = getFileExtension(defaultKey);
    const endIndex = defaultKey.indexOf(ext);
    const end = endIndex ? endIndex - 1 : defaultKey.length;
    const baseName = defaultKey.substring(0, end); 

    useEffect(() => setKey(defaultKey), [ defaultKey ]);
        
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
            <List>
                <ListItem button>
                    <TextField 
                        onChange={ (event)=> setKey(event.target.value + `.${ext}`) }
                        className={classes.dialogItem} 
                        id="standard-basic" 
                        label="请输入文件名" 
                        defaultValue={baseName}
                        InputProps={
                            {
                                endAdornment: <InputAdornment position="end">{`.${ext}`}</InputAdornment>,
                            }
                        }
                    />
                    <Button className={classes.dialogItem} onClick={ ()=> onSubmit(key) }variant="contained">上传</Button>
                </ListItem>
            </List>
        </Dialog>
    );
};

const useProgressStyles = makeStyles(theme => ({
    progress: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const ProgressDialog = function(props) {
    const classes = useProgressStyles();
    const { open, subscription, progress, cancel } = props;

    return (
        <Dialog maxWidth="lg" fullWidth={true} aria-labelledby="simple-dialog-title" open={open}>
            <List>
                <ListItem button>   
                    <LinearProgress style={{ width: '100%' }} className={classes.progress} variant="determinate" value={ progress } />
                    <Button style={{ marginLeft: '1rem' }}onClick={() => {
                        subscription.unsubscribe();
                        cancel();
                    } } variant="contained">取消</Button>
                </ListItem>
            </List>
        </Dialog>
    );
}

const useStyles = makeStyles(() => ({
    input: {
      display: 'none',
    },
}));


export default function FileUploader(props) {
    const classes = useStyles();
    const { currentDir, readDir, snackShow } = useContext(Context);
    const [ file, setFile ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ defaultKey, setDefaultKey ] = useState('');

    // progress
    const [ progressOpen, setProgressOpen ] = useState(false);
    const [ progress, setProgress ] = useState(0);
    const [ subscription, setSubscription ] = useState(null);


    const handleUpload = (event) => {
        const uploadFile = event.target.files[0];
        setFile(uploadFile);
        setDefaultKey(uploadFile.name);
        setOpen(true);
    };

    const handleSubmit = (keyName) => {
        // TODO: do upload
        setOpen(false);
        const fileName = currentDir + keyName;
        console.log(fileName);
        setProgressOpen(true);
     
        Qiniu.upload(file, fileName, {
            next(res) {
                const percent = res.total.percent;
                console.log(res.total.percent);
                setProgress(percent | 0);
            },
            error(res) {

            },
            complete() {
               readDir();
               setProgressOpen(false);
               snackShow('上传成功!');
            }
        }).then((subscription) => {
           setSubscription(subscription);
        });
    }

    const handleClose = (event) => {
        setOpen(false);
    }

    return <Fragment>
            <input type="file" id="file-upload" className={classes.input} onChange={(event) => handleUpload(event) }/>
            <label htmlFor="file-upload">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <UploadIcon />
                </IconButton>
            </label>
            <KeyDialog open={open} onClose={ handleClose } defaultKey={defaultKey} onSubmit={ handleSubmit }/>
            <ProgressDialog open={progressOpen} subscription={subscription} progress={progress} cancel={()=> {
                setProgressOpen(false);
                snackShow('取消上传！');
            }}/>
        </Fragment>
}