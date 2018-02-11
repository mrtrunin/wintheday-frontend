function Message(message, type='info') {

    let messageTypeColorMap = {
        'success': 'green lighten-1',
        'error': 'red darken-5',
        'info': ''
    }

    // eslint-disable-next-line
    return M.toast({
        html: message,
        classes: messageTypeColorMap[type],
        displayLength: 1000
    })
}

export default Message;
