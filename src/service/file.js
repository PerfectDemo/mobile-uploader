class FileService {
    constructor() {
        this.ossUrl = 'http://q6me6dnk1.bkt.clouddn.com/';
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

    async downloadFile(dir, file) {
        const blob = await this.baseDownloadFileBlob(dir, file);
        this.downloadBlob(blob, file); 
    }

    async baseDownloadFileBlob(dir, file) {
        const filePath = getDownloadUrl(dir, file)
        console.log(filePath);
        const response = await fetch(filePath);
        const blob = await response.blob();
        return blob;
    }

    getDownloadUrl(dir, file) {
        return this.ossUrl + dir + file;
    }

    downloadBlob(blob, fileName) {
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.download = fileName;
        a.href = blobUrl;
        a.click();
        document.body.removeChild(a);
    }
}

export default new FileService();