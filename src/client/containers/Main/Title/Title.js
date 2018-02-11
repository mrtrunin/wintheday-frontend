import React from 'react';
import PropTypes from 'prop-types';

const Title = props => {
    let title = props.title;

    return (<div>
        <nav className="top-nav pink lighten-2">
            <div className="container">
                <div className="nav-wrapper">
                    <a className="header page-title white-text vertical-align">{title}</a>
                </div>
            </div>
        </nav>
        <div className="row"></div>
    </div>);
}

Title.propTypes = {
    title: PropTypes.string,
}

export default Title