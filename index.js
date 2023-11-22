import Cookies from "js-cookie";

class WebClient {

    constructor() {

    }

    get(url, bearerToken, successCallback) {
        var headers = {}
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'GET', mode: "cors", headers: headers}
        this.fetch(url, options, successCallback, null);
    }

    get(url, bearerToken, successCallback, errorCallback) {
        var headers = {}
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'GET', mode: "cors", headers: headers}
        this.fetch(url, options, successCallback, errorCallback);
    }

    post(url, body, bearerToken, successCallback) {
        var headers = { 'Content-Type':'application/json' }
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'POST', mode: "cors", credentials: 'include', headers: headers, body: JSON.stringify(body)}
        this.fetch(url, options, successCallback, null);
    }

    post(url, body, bearerToken, successCallback, errorCallback) {
        var headers = { 'Content-Type':'application/json' }
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'POST', mode: "cors", credentials: 'include', headers: headers, body: JSON.stringify(body)}
        this.fetch(url, options, successCallback, errorCallback);
    }

    put(url, body, bearerToken, successCallback) {
        var headers = { 'Content-Type':'application/json' }
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'PUT', mode: "cors", headers: headers, body: JSON.stringify(body)}
        this.fetch(url, options, successCallback, null);
    }

    put(url, body, bearerToken, successCallback, errorCallback) {
        var headers = { 'Content-Type':'application/json' }
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'PUT', mode: "cors", headers: headers, body: JSON.stringify(body)}
        this.fetch(url, options, successCallback, errorCallback);
    }

    fetch(url, options, successCallback, errorCallback) {
        fetch(url, options)
        .then(response => {
            if (response.headers.get("Content-Length") == 0) {
                if (response.status >= 300)
                    errorCallback({status: response.status, body: null});
                else
                    successCallback({status: response.status, body: null});
            }
            else {
                response.json().then(body => {
                    if (response.status >= 300)
                        errorCallback({status: response.status, body: body});
                    else {
                        successCallback({status: response.status, body: body});
                    }
                })
            }
        })
        .catch(err => {
            console.log("unexpected error occured with http request", err)
        });
    }

    setCookie(key, value) {
        Cookies.set(key, value);
    }

    getCookie(id) {
        return Cookies.get(id);
    }

    removeCookie(id) {
        Cookies.remove(id);
    }

}

export default new WebClient();