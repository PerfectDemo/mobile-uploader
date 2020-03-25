import CryptoJS  from "crypto-js";
import File from './file';
import * as qiniu from 'qiniu-js';


const getTimeStamp = () => parseInt((+new Date() / 1000).toFixed(0));

class Qiniu {
    constructor() {
        this.baseUrl = "http://127.0.0.1:3001";
        this.bucket = "ninja-notebook";

    }

    async _getUploadPolicy() {
        let localPolicy = localStorage.getItem('put-policy');
    
        if (localPolicy) {
            const localPolicyObj = JSON.parse(localPolicy);
            if (localPolicyObj.timestamp > getTimeStamp()) {
                return localPolicyObj;
            }
        } 

        let result = await this._signRequest(this.baseUrl + '/api/v1/put-policy', {
            "bucket": "ninja-notebook",
            "expires": 7200,
            "nonce": Math.random() * 10000 | 0,
            "ts":  getTimeStamp()
        });

        let timestamp = getTimeStamp() + (result.expires * 0.9 | 0);
        result.timestamp = timestamp;
        localStorage.setItem('put-policy', JSON.stringify(result));
        return result;
    }

    async _getOverwritePolicy() {
        let localPolicy = localStorage.getItem('overwrite-policy');

        if (localPolicy) {
            const localPolicyObj = JSON.parse(localPolicy);
            if (localPolicyObj.timestamp > getTimeStamp()) {
                return localPolicy;
            }
        } 

        let result = await this._signRequest(this.baseUrl + '/api/v1/overwrite-policy', {
            "bucket": "ninja-notebook",
            "expires": 7200,
            "nonce": Math.random() * 10000 | 0,
            "ts":  getTimeStamp()
        });
        let timestamp = getTimeStamp() + (result.expires * 0.9 | 0);
        result.timestamp = timestamp;
        localStorage.setItem('put-policy', JSON.stringify(result));
    }

    async _signRequest(api, data) {
        const appsecret = 'wryyyyyyyyy';
        const signStr = Object.keys(data).sort().map(key => `${key}=${data[key]}`).join('&');
        const sign = CryptoJS.HmacSHA1(signStr, appsecret).toString(CryptoJS.enc.Hex).toUpperCase();
        api = api + '?sign=' + sign;
        const result = await this._post(api, data);
        return result;
    }

    _post(url, data) {
        return fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/json'
            })
        }).then(res => res.json())
    }

    async stat(dir, file) {
        const api = '/api/v1/stat';
        const key = dir + file;
        const paramObj = { key, bucket: this.bucket };
        const paramStr = Object.keys(paramObj).map(key => `${key}=${paramObj[key]}`).join('&');
        const response = await fetch(`${this.baseUrl}${api}?${paramStr}`);
        const jsonResult = await response.json();
        jsonResult.url = File.getDownloadUrl(dir, file);
        return jsonResult;
    }

    async upload(file, key, observer, putExtra, config) {
        const tokenRaw = await this._getUploadPolicy();
        const token = tokenRaw.token;
        let observable = qiniu.upload(file, key, token, putExtra, config);

        let subscription = observable.subscribe(observer);
        
        return subscription;
    }

    async readDir(dir) {
        // TODO: support marker
        const query = {
            bucket: this.bucket,
            prefix: dir, 
            delimiter: '/'
        };

        const api = '/api/v1/list?' + Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
        const result = await fetch(this.baseUrl + api);
        const json = await result.json();
        const files = json.items || [];
        const dirs = json.commonPrefixes || [];

        return [...dirs.map(dir => ({ type: 'dir', name: dir })), ...files.map(file => {
            file.name = file.key;
            file.type = 'file';
            return file
        })];
    }

    async delete(key) {
        const result = await this._signRequest(this.baseUrl + '/api/v1/delete', {
            bucket: this.bucket,
            key,
            nonce: Math.random() * 10000 | 0,
            ts:  getTimeStamp()
        });
        return result;
    }


}

export default new Qiniu();