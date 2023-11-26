import Cookies from "js-cookie";

class WebClient {

    unauthorizedRedirect;

    constructor() {

    }

    get(url, bearerToken, successCallback, errorCallback) {
        var headers = {}
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'GET', mode: "cors", headers: headers}
        this.fetch(url, options, successCallback, errorCallback);
    }

    post(url, body, bearerToken, successCallback, errorCallback) {
        var headers = { 'Content-Type':'application/json' }
        if (bearerToken) { headers['Authorization'] = `Bearer ${bearerToken}` }
        const options = {method: 'POST', mode: "cors", credentials: 'include', headers: headers, body: JSON.stringify(body)}
        this.fetch(url, options, successCallback, errorCallback);
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
            switch (true) {
                case (response.status == 401 && this.unauthorizedRedirect):
                    window.location.href = this.unauthorizedRedirect;
                    break;
                case (response.status >= 300):
                    this.handleResponse(response, errorCallback);
                    break;
                case (response.status >= 200):
                    this.handleResponse(response, successCallback);
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
            console.log("unexpected error occured with http request", err)
        });
    }

    handleResponse(response, callback) {
        if (response.headers.get("Content-Length") == 0) {
            callback({status: response.status, body: null})
        }
        response
            .json()
            .then(body => {
                callback({status: response.status, body: body});
            })
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