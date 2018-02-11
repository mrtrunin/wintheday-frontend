function GoToUrl(path) {
    let slash = (window.location.href).slice(-1) == '/' ? '' : '/';
    window.location = window.location.href + slash + path;
}

export default GoToUrl;
