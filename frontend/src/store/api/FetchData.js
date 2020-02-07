import {toastr} from 'react-redux-toastr';
import axios from 'axios';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import LocalStorageService from '../../services/LocalStorageService';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_DELETE = 'delete';
const CLIENT = '/api/v1';

export class FetchData {
    get (url, requestParams) {
        return this.makeRequest(url, METHOD_GET, null, requestParams)
    }

    post (url, body, requestParams) {
        return this.makeRequest(url, METHOD_POST, body, requestParams)
    }

    put (url, body, requestParams) {
        return this.makeRequest(url, METHOD_PUT, body, requestParams)
    }

    deleteApi (url, requestParams) {
        return this.makeRequest(url, METHOD_DELETE, null, requestParams)
    }

    makeRequest (url, method, body, reqParams) {
        const requestParams = {
            method: method || METHOD_GET,
            data: body,
            params: {
                ...(reqParams || {})
            }
        }

        requestParams.headers = {
            'Content-Type': 'application/json'
        }

        const token = LocalStorageService.get(LocalStorageService.Keys.TOKEN);
        requestParams.headers.Authorization = `Bearer ${token}`;
        const requestUrl = CLIENT + url;
        return this.sendRequest(requestUrl, requestParams)
    }

    sendRequest (url, requestParams) {
        return new Promise((resolve, reject) => {
            axios(url, requestParams)
                .then(result => resolve(result))
                .catch(reason => {
                    this.requestFailed(reason)
                    reject(reason)
                })
        })
    }

    requestFailed (reason) {
        if (reason.message) {
            toastr.error(reason.message, reason.response && reason.response.data && reason.response.data.message)
        } else {
            toastr.error('Error', 'An error has occurred')
        }
    }
}

const api = new FetchData();

export default api;
