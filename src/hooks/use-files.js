import React, { useState, useEffect } from 'react';
import fileService from '../service/file';

export default function useFile() {
    const [ files, setFiles ] = useState([]);
    const [ currentDir, setCurrentDir ] = useState('');

    const readDir = function() {
        return fileService.readDir(currentDir + '.ls').then(setFiles);
    };

    useEffect(() => {
        readDir();
    }, [currentDir]);

    return {
        files, 
        currentDir,
        setCurrentDir
    };
}