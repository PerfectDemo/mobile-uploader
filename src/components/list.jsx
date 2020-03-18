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

import { Context } from '../context';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));


export default function SimpleList() {
  const { files, currentDir, setCurrentDir } = useContext(Context);
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
     File.downloadFile(currentDir, seletedFile).then(() => console.log('download!'));
  };

  const handleDetail = function() {
    Qiniu.stat(currentDir, seletedFile).then((res)=> {
       setDetail(res);
       setDialogOpen(true);
    });
  }

  const handleDialogClose = function() {
      setDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <div className={classes.root}>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">

        { files.map(file => {
          if (file.type === 'file') {
            return <React.Fragment>
              <ListItem button onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                  setSelectedFile(file.name);
              }}>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
              </ListItem>
              <Divider />
                  </React.Fragment>
          } else if (file.type === 'dir') {
            return <React.Fragment>
                    <ListItem button onClick={() => setCurrentDir(file.name + '/')}>
                    <ListItemIcon>
                      <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
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
        <Typography className={classes.typography} onClick={ handleDetail }>详情</Typography>
        <Typography className={classes.typography} onClick={ handleDownload }>下载</Typography>
      </Popover>


      <DetailDialog detail={detail} open={dialogOpen} onClose={ handleDialogClose }/>
    
     
    </div>
  );
}