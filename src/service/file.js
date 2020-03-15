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

    async readFile(file) {

    }
}

export default new FileService();