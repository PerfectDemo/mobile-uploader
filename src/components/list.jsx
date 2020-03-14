import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';

import { Context } from '../context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function SimpleList() {
  const { files } = useContext(Context);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">

        { files.map(file => {
          if (file.type === 'file') {
            return <>
              <ListItem button>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
              </ListItem>
              <Divider />
                  </>
          } else if (file.type === 'dir') {
            return <>
              <ListItem button>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={file.name} />
              </ListItem>
              <Divider />
            </>
          }
        })}
      </List>
    
     
    </div>
  );
}