import React from 'react';
import PropTypes from 'prop-types';

const KeyField = props => {
    let inputField = props.edit ? 'input-field' : ''

    return <div className={ 'col s4 m3 l3 truncate strong ' + inputField }>
        <strong>{ props.title }:</strong>
    </div>
}

KeyField.propTypes = {
    edit: PropTypes.bool,
    title: PropTypes.string,
}

export default KeyField;
