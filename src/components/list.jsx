import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import FolderIcon from '@material-ui/icons/Folder';
import ImageIcon from '@material-ui/icons/Image';

import File from '../service/file';
import Qiniu from '../service/qiniu';
import DetailDialog from './detail-dialog';
import { getBaseName, getNearestDirName } from '../utils/file';

import { Context } from '../context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  
  },
  typography: {
    padding: theme.spacing(2)
  },

  list: {
    paddingTop: 0,
    paddingBottom: 0
  }

}));


export default function SimpleList() {
  const { files, currentDir, setCurrentDir, readDir, snackShow } = useContext(Context);
  const [ seletedFile, setSelectedFile ] = useState('');
  const [ detail, setDetail ] = useState({});
  const [ dialogOpen, setDialogOpen ] = useState(false);
  const classes = useStyles();

  // pop
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = function() {
     File.downloadFile(seletedFile.key).then(() => console.log('download!'));
  };

  const handleDetail = function() {
      setDialogOpen(true);
  }

  const handleDialogClose = function() {
      setDialogOpen(false);
  };

  const handleDelete = function() {
      Qiniu.delete(seletedFile.key).then(() => {
        setAnchorEl(null);
        snackShow('删除成功!')
        readDir();
      });
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className={classes.root}>
      <Divider />
      <List className={classes.list} component="nav" aria-label="main mailbox folders">

        { files.map((file, key) => {
           const baseName = getBaseName(file.name)
          if (file.type === 'file' && baseName !== '.keep') {
            return <React.Fragment>
              <ListItem key={key} button onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  setSelectedFile(file);
              }}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText primary={ baseName } />
              </ListItem>
              <Divider />
                  </React.Fragment>
          } else if (file.type === 'dir') {
            return <React.Fragment>
                    <ListItem key={key} button onClick={() => setCurrentDir(file.name)}>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText primary={ getNearestDirName(file.name) } />
                  </ListItem>
                  <Divider />
                </React.Fragment>
          }
        })}
      </List>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography button className={classes.typography} onClick={ handleDetail }>详情</Typography>
        <Typography button className={classes.typography} onClick={ handleDownload }>下载</Typography>
        <Typography button className={classes.typography} onClick={ handleDelete }>删除</Typography>
      </Popover>


      <DetailDialog detail={seletedFile} open={dialogOpen} onClose={ handleDialogClose }/>
    
     
    </div>
  );
}