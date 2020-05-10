import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useClipboard } from 'use-clipboard-copy';


import { convertSize } from '../utils/size';
import { timeConvert } from '../utils/time';

import File from '../service/file';
import Qiniu from '../service/qiniu';
import { Button, Divider } from '@material-ui/core';


// overflow:hidden; //超出的文本隐藏
// text-overflow:ellipsis; //溢出用省略号显示
// white-space:nowrap; //溢出不换行

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  appBar: {
    position: 'relative',
  },

  listText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },

  listTextTitle: {
      fontWeight: 'bold',
      fontSize: '1rem',
  },

  listTextContent: {
    fontSize: '2rem',
    paddingLeft: '10px'
  },

  listItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  url: {
    paddingLeft: '10px',
    whiteSpace: 'pre'
  }
});


export default function DetailDialog(props) {
    const classes = useStyles();
    const { onClose, detail, open } = props;
    const { fsize, mimeType, putTime, key } = detail;
    const url = Qiniu.getDownloadUrl(key);
    const clipboard = useClipboard();
    
    return (
        <Dialog fullScreen={true} aria-labelledby="simple-dialog-title" open={open}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={ onClose } aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Detail
                </Typography>
                <div style={{ width: '2rem', height: '100%'}}></div>
              </Toolbar>
            </AppBar>
            <List>
                <ListItem button key={key} className={classes.listItem}>
                    <ListItemText className={ classes.listText } primary={<Typography className={classes.listTextTitle}>KEY</Typography>} />
                    <ListItemText className={`${classes.listText} ${classes.listTextContent}`} primary={`${key}`} />
                </ListItem>
                <Divider />
                <ListItem button key={fsize} className={classes.listItem}>
                    <ListItemText className={ classes.listText } primary={<Typography className={classes.listTextTitle}>SIZE</Typography>} />
                    <ListItemText  className={`${classes.listText} ${classes.listTextContent}`} primary={`${convertSize(fsize)}`} />
                </ListItem>
                <Divider />
                <ListItem button key={mimeType} className={classes.listItem}>
                    <ListItemText className={ classes.listText } primary={<Typography className={classes.listTextTitle}>MIMETYPE</Typography>} />
                    <ListItemText className={`${classes.listText} ${classes.listTextContent}`} primary={mimeType} />
                </ListItem>
                <Divider />
                <ListItem button key={putTime} className={classes.listItem}>
                    <ListItemText  className={ classes.listText } primary={<Typography className={classes.listTextTitle}>UPLOADTIME</Typography>} />
                    <ListItemText  className={`${classes.listText} ${classes.listTextContent}`} primary={timeConvert(putTime / 10000000 | 0)} />
                </ListItem>
                <Divider />
                <ListItem  button key={url}  className={classes.listItem}>
                    <ListItemText  className={ classes.listText } primary={<Typography className={classes.listTextTitle}>URL</Typography>} />
                    <ListItemText className={{...classes.listText, ...classes.url, ...classes.listTextContent}} primary={url} />
                </ListItem>
                <Divider />
                <ListItem className={classes.listItem} style={{ display: 'flex', justifyContent:'center', alignItems: 'center' }}>
                    <Button variant="outlined" onClick={()=> clipboard.copy(url) }>复制链接</Button>
                </ListItem>
               
            </List>
        </Dialog>
    );
}


/* <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
<DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
<List>
  {emails.map(email => (
    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={email} />
    </ListItem>
  ))}
</List>
</Dialog> */
