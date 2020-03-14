
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import UploadIcon from '@material-ui/icons/CloudUpload';


import SimpleList from './components/list';

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
      }
  }));

export default function() {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <div className={classes.title}>
                  <Typography variant="h6">
                          ninja
                  </Typography>
                </div>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
          
            <SimpleList />


          
            <BottomNavigation className={classes.stickToBottom}
                // value={value}
                // onChange={(event, newValue) => {
                //     alert('xiba');
                // }}
                // showLabels
                // className={classes.root}
                >
                <BottomNavigationAction label="Recents" icon={<UploadIcon />} />
            </BottomNavigation>
        </div>     
    )
}