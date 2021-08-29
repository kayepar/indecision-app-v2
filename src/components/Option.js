import React from 'react';

const Option = (props) => {
    return (
        <div className="option">
            <p className="option__text">
                {props.index}. {props.text}
            </p>
            <button className="button button--link" onClick={() => {}}>
                x
            </button>
        </div>
    );
};

export default Option;
