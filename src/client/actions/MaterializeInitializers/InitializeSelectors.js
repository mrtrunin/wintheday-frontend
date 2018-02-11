export default function InitializeSelectors() {
    let options = {}
    let elem = document.querySelectorAll('select');
    M.Select.init(elem, options);
}