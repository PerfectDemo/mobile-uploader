import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';

import { convertSize } from '../utils/size';
import { timeConvert } from '../utils/time';


const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function DetailDialog(props) {
    const classes = useStyles();
    const { onClose, detail, open } = props;
    const { fsize, mimeType, putTime, url } = detail;
        
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
            <DialogTitle id="simple-dialog-title">Detail</DialogTitle>
            <Divider/>
            <List>
                <ListItem button key={fsize}>
                    <ListItemText primary={`size: ${convertSize(fsize)}`} />
                </ListItem>
                <ListItem button key={mimeType}>
                    <ListItemText primary={`mimeType: ${mimeType}`} />
                </ListItem>
                <ListItem button key={putTime}>
                    <ListItemText primary={`putTime: ${timeConvert(putTime / 10000000 | 0)}`} />
                </ListItem>
                <ListItem button key={url}>
                    <ListItemText primary={`url: ${url}`} />
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
