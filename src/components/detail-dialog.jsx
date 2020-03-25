import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import { useClipboard } from 'use-clipboard-copy';


import { convertSize } from '../utils/size';
import { timeConvert } from '../utils/time';

import File from '../service/file';
import { Button } from '@material-ui/core';


// overflow:hidden; //超出的文本隐藏
// text-overflow:ellipsis; //溢出用省略号显示
// white-space:nowrap; //溢出不换行

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },

  listText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});


export default function DetailDialog(props) {
    const classes = useStyles();
    const { onClose, detail, open } = props;
    const { fsize, mimeType, putTime, key } = detail;
    const url = File.getUrl(key);
    const clipboard = useClipboard();

        
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
            <DialogTitle id="simple-dialog-title">Detail</DialogTitle>
            <Divider/>
            <List>
                <ListItem button key={key}>
                    <ListItemText className={classes.listText} primary={`key: ${key}`} />
                </ListItem>
                <ListItem button key={fsize}>
                    <ListItemText className={classes.listText} primary={`size: ${convertSize(fsize)}`} />
                </ListItem>
                <ListItem button key={mimeType}>
                    <ListItemText className={classes.listText} primary={`mimeType: ${mimeType}`} />
                </ListItem>
                <ListItem button key={putTime}>
                    <ListItemText className={classes.listText} primary={`putTime: ${timeConvert(putTime / 10000000 | 0)}`} />
                </ListItem>
                <ListItem>
                    <ListItemText className={classes.listText} primary={`url: ${url}`} />
                </ListItem>
                <ListItem style={{ display: 'flex', justifyContent:'center', alignItems: 'center'}}>
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
