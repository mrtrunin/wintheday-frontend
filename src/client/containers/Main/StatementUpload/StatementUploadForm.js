import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StatementUploadForm extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.uploadStatement({
            file: this.state.file,
            bank: this.bank.value
        });
    }

    onChange(e) {
        this.setState({
            file: e.target.files[0]
        })
    }

    componentDidMount() {
        this.enableMaterialiseSelect();
    }

    enableMaterialiseSelect() {
        var options = {}
        var elem = document.querySelector('select');
        // eslint-disable-next-line
        var instance = M.Select.init(elem, options);        
    }

    render() {
        return (<form onSubmit={ this.handleSubmit }>
            <div className="row">
                <div className="row"></div>
                <div className="col s5 offset-s3 center-align">
                    <div className="input-field">
                        <select ref={(input) => {this.bank = input}} onChange={ this.handleSelectChange }>
                            <option value="" disabled="disabled" defaultValue="selected">Choose your bank</option>
                            <option value="Swedbank">Swedbank</option>
                        </select>
                        <label>Bank</label>
                    </div>
                    <div className="row"></div>
                    <div className="file-field input-field">
                        <div className="btn pink lighten-2 waves-effect waves-light">
                            <span>File</span>
                            <input type="file" onChange={ this.onChange } />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <div className="row"></div>
                    <div className="row"></div>
                    <button type="submit" className="btn-large pink lighten-2 waves-effect waves-light" disabled={ this.props.uploading }>Upload</button>
                </div>
            </div>
        </form>)
    }
}

StatementUploadForm.propTypes = {
    uploadStatement: PropTypes.func,
    uploading: PropTypes.bool,

}

export default StatementUploadForm;
