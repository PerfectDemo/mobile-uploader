export const getFileExtension = function (filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export const getBaseName = function (str) {
    var idx = str.lastIndexOf('/')
    idx = idx > -1 ? idx : str.lastIndexOf('\\')
    if (idx < 0) {
      return str
    }
    return str.substring(idx + 1);
}

export const getNearestDirName = function(dir) {
    const dirs = dir.split('/');
    return dirs.length <=0 ? dir : dirs[dirs.length - 2]
}