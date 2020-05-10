import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import FileUploader from './file-upload';

import Qiniu from '../service/qiniu';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    typography: {
      padding: theme.spacing(2),
    },
}));

const useDialogStyles = makeStyles((theme) => ({
    dialogItem: {
        marginLeft: theme.spacing(1)
    },
}));

const DirDialog = function(props) {
    const classes = useDialogStyles();
    const { open, onClose, onSubmit } = props;
    const [ dirname, setDirName ] = useState('');

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
            <List>
                <ListItem button>
                    <TextField 
                        onChange={ (event)=> setDirName(event.target.value) }
                        className={classes.dialogItem} 
                        id="standard-basic" 
                        label="请输入文件夹名" 
                    />
                    <Button className={classes.dialogItem} onClick={ ()=> onSubmit(dirname) }variant="contained">上传</Button>
                </ListItem>
            </List>
        </Dialog>
    );
}


export default function PopupMenu (props) {
    const { onClose, anchorEl, currentDir, open } = props;

    const classes = useStyles();
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const createDir = function(dirname) {
        setDialogOpen(false);
        const blob = new Blob([''], {
            type: 'text/plain'
        });
        const file = new File([blob], '.keep');
        const key = currentDir  + dirname + '/' + '.keep';
        console.log(key, file);
        Qiniu.upload(file, key);
    }

    return <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
            <Typography button className={classes.typography} onClick={ ()=> setDialogOpen(true) }>新建文件夹</Typography>
            <DirDialog open={dialogOpen} onClose={()=> setDialogOpen(false) } onSubmit={ createDir } />
            <FileUploader />
        </Popover>
}