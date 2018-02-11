import React, { Component } from 'react';
import StatementUploadForm from './StatementUploadForm';
import UploadStatement from 'api/UploadStatement';
import { connect } from 'react-redux';
import store from 'store';
import Message from 'actions/Message';
import PropTypes from 'prop-types';

@connect((store) => {
    return {
        uploading: store.statementUpload.uploading,
        message: store.statementUpload.message
    }
})

class StatementUploadContainer extends Component {
    constructor() {
        super()
        this.handleStatementUpload = this.handleStatementUpload.bind(this)
    }

    async handleStatementUpload(statement) {
        let file = statement.file
        let bank = statement.bank

        await store.dispatch({
            type: 'UPLOAD_STATEMENT'
        })
        await UploadStatement(file, bank)
        await Message(this.props.message)
    }

    render() {
        return (<StatementUploadForm uploadStatement={ this.handleStatementUpload } uploading={ this.props.uploading } />);
    }
}

StatementUploadContainer.propTypes = {
    message: PropTypes.string,
    uploading: PropTypes.bool,
}

export default StatementUploadContainer
