class Xhr {
    constructor() {
        this.apiUrl = env.apiUrl;

        this.clear();
    }

    send() {
        const self = this;

        const fullUrl = self.apiUrl + self.url;

        const xhr = new XMLHttpRequest();

        xhr.open(self.method, fullUrl, true);

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        if (this.jwt) {
            xhr.setRequestHeader('Auth-Token', localStorage.getItem('jwt-' + api.userID));
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;

            if (xhr.status !== 200) {
                
                const errorModal = new ErrorModal(JSON.parse(xhr.responseText));
        
                errorModal.show();

                return;
            }

            let response = JSON.parse(xhr.responseText);

            if (typeof self.handler == 'function') {
                self.handler(response);
            }
        };

        xhr.send(JSON.stringify(this.body));
    }

    clear() {
        this.method = 'GET';
        this.url = '/';

        this.body = {};

        this.handler = null;
        this.jwt = false;
    }
}