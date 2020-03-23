import React, { useState, useEffect } from 'react';
import QiniuService from '../service/qiniu';

export default function useFile() {
    const [ files, setFiles ] = useState([]);
    const [ currentDir, setCurrentDir ] = useState('');

    const readDir = function() {
        return QiniuService.readDir(currentDir).then(setFiles);
    };

    useEffect(() => {
        readDir();
    }, [currentDir]);

    return {
        files, 
        currentDir,
        setCurrentDir,
        readDir
    };
}