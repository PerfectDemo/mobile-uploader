
require('babel-polyfill');


import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';



import SimpleList from './components/list';
import DirBreadCrumbs from './components/dir-bread-crumbs';
import PopupMenu from './components/popup-menu';

import { Context } from './context';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      stickToBottom: {
        position: "fixed",
        width: "100%",
        bottom: 0
      },
      toolBar: {
        paddingRight: theme.spacing(1)
      }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function() {

    const classes = useStyles();
    const { 
      currentDir, 
      setCurrentDir,  

      snackBarOpen,
      snackMessage,
      snackHide,
      snackType 
    } = useContext(Context);

    const [ open, setOpen ] = useState(false);
    const [ popupAnchorEl, setPopupAnchorEl ] = useState(null);
  
    const results = currentDir.split('/');
    const front = results[results.length - 3] ? (results[results.length - 3]  +  '/') : '';
    const title = results[results.length - 2];

    const handleCreateButton = (event) => {
        setPopupAnchorEl(event.currentTarget);  
        setOpen(true);
    } 


    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar className={classes.toolBar}>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=> setCurrentDir(front) }>
                  <ArrowBackIosIcon />
                </IconButton>
                <div className={classes.title}>
                  <Typography variant="h6">
                    {title ? title : '根目录'}
                  </Typography>
                </div>
                <IconButton edage="end" color="inherit" onClick={ handleCreateButton }>
                    <AddIcon />
                </IconButton>
            </Toolbar>
            </AppBar>
            <DirBreadCrumbs dir={currentDir}/>

            <SimpleList />

            <PopupMenu open={open} anchorEl={popupAnchorEl} currentDir={currentDir} onClose={() => setOpen(false) }/>
            <Snackbar
              open={snackBarOpen}
              onClose={snackHide}
            >
               <Alert severity={snackType}>{snackMessage}</Alert>
            </Snackbar>
            
        </div>     
    )
}