import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";

import UserContext from "../../UserContext";
import Autocomplete from "../../utils/autocomplete/Autocomplete";

// socket
import getSocket from "../../../socket";

// api calls
import getChats from "../../../actions/getChats";

const socket = getSocket();

const Connect = () => {
    const {user} = useContext(UserContext);
    const [chatName, setChatName] = useState('');
    const [username, setUsername] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        setLoading(true);
        getChats()
        .then(chatNames => setOptions(chatNames))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, [setOptions]);
    useEffect(() => {
        socket.on('formError', () => setError('Something went wrong'));
    }, []);
    const handleClick = e => {
        e.preventDefault();
        socket.emit('connectUser', {chatName, user: username});
    }
    if(user) return <Redirect to='/'/>;
    if(loading) return <h2>Loading...</h2>;
    return (
        <div className='connect-wrap'>
            <form>
                <h3>Connect</h3>
                <span>{error}</span>
                <div className='input-wrap'>
                    <label htmlFor="username">Nickname</label>
                    <input type="text" placeholder='e.g. JohnDoe' id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                </div>
                <Autocomplete options={options} setOption={setChatName} label='Chat name'/>
                <button onClick={handleClick}>
                    Connect
                </button>
            </form>
        </div>
    );
}

export default Connect;
