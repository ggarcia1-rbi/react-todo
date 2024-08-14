import React, { useEffect, useRef } from 'react';

function InputWithLabel({id, value, onInputChange, children}){
    const inputRef = useRef();

    useEffect(() => { 
        inputRef.current.focus();
    }, []);

    return(
        <>
        <label htmlFor={id}>{children}</label>
        <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={onInputChange}
        />
        </>
    );
}

export default InputWithLabel;