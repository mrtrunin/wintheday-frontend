import React from 'react';

const FieldSubmitButton = props => {
    return <button type="submit" className="btn-floating pink lighten-2 waves-effect waves-light" onClick={props.handleFieldSubmit}><i class="material-icons">check</i></button>
}

export default FieldSubmitButton;
