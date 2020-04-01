import { getBaseName } from '../utils/file';

class FileService {
    constructor() {
        this.ossUrl = 'http://q6me6dnk1.bkt.clouddn.com/';
    }

    getUrl(key) {
        return this.ossUrl + key;
    }

    async readDir(dir) {
        const result = await fetch(this.ossUrl + dir);
        const text = await result.text();
        const files = text.split('\n').map(item => {
            const sentences = item.split(',').map(i => i.trim());
            return {
                name: sentences[0],
                type: sentences[1],
                size: sentences[2]
            }
        });
        return files;
    }

    async downloadFile(file) {
        const filePath = this.ossUrl + file;
        console.log('download file:', filePath);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.download = getBaseName(file);
        a.href = filePath;
        a.click();

        setTimeout(() => document.removeChild(a), 1500);
    }

    getDownloadUrl(dir, file) {
        return this.ossUrl + dir + file;
    }
}

export default new FileService();