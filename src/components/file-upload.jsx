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
}

const useStyles = makeStyles(() => ({
    input: {
      display: 'none',
    },
}));


export default function FileUploader(props) {
    const classes = useStyles();
    const { currentDir, readDir } = useContext(Context);
    const [ file, setFile ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ defaultKey, setDefaultKey ] = useState('');


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
        console.log(fileName)
        Qiniu.upload(file, fileName).then(() => setTimeout(() => readDir(), 1000));
        
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
        </Fragment>
}