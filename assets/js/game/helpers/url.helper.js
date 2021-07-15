class UrlHelper {
    static get(key) {
        let s = window.location.search;
        s = s.match(new RegExp(key + '=([^&=]+)'));

        return s ? decodeURIComponent(s[1]) : false;
    }
}