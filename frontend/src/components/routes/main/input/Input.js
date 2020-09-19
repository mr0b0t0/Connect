import React, {useRef, useEffect, useState} from 'react';

const Input = ({handleMessage}) => {
    const [content, setContent] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, []);
    const handleKeyDown = e => {
        if(e.key === 'Enter' && content !== ''){
            try {
                handleMessage(content);
            }catch(err){
                console.log(err);
            }
        }
    }
    return (
        <input
        className='chat-input'
        ref={inputRef}
        placeholder='content'
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        />
    );
}

export default Input;
