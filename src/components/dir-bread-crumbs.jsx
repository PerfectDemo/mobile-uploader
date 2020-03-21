import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const useStyles = makeStyles(theme => ({
    root: {
       padding: theme.spacing(1)
    },
  }));

export default function DirBreadCrumbs(props) {
    const classes = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={props.dir ? classes.root : null } aria-label="breadcrumb">
        {
            props.dir.split('/').map((childDir,key) =>
                <Link key={key} color="inherit" href="/">
                {childDir}
                </Link>)
        }  
        </Breadcrumbs>
    );
}

/**
 *    <Link
        color="textPrimary"
        href="/components/breadcrumbs/"
        onClick={handleClick}
        aria-current="page"
      >
        Breadcrumb
      </Link>
 */