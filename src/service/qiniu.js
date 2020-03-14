import CryptoJS  from "crypto-js";

const getTimeStamp = () => (+new Date() / 1000).toFixed(0);

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
                return localPolicy;
            }
        } 

        let result = await this._getSign(this.baseUrl + '/api/v1/put-policy');
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

        let result = await this._getSign(this.baseUrl + '/api/v1/overwrite-policy');
        let timestamp = getTimeStamp() + (result.expires * 0.9 | 0);
        result.timestamp = timestamp;
        localStorage.setItem('put-policy', JSON.stringify(result));
    }

    async _getSign(api) {
        const data ={
            "bucket": "ninja-notebook",
            "expires": 7200,
            "nonce": Math.random() * 10000 | 0,
            "ts":  getTimeStamp()
        };

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
}

export default new Qiniu();