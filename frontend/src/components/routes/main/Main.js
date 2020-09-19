import React, {useRef, useEffect, useContext} from 'react';
import {Redirect} from "react-router-dom";
import UserContext from "../../UserContext";
import Message from './message/Message';
import Input from './input/Input';

// socket
import getSocket from "../../../socket";

const socket = getSocket();

const Main = ({chat}) => {
    const {user, setUser} = useContext(UserContext);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView();
    }
    useEffect(scrollToBottom, [chat]);
    const handleLeave = e => {
        e.preventDefault();
        try{
            socket.emit('leaveChat', {chatName: chat.chatName, user});
            setUser(null);
            localStorage.clear();
        }catch(err){
            console.log(err);
        }
    }
    const handleMessage = content => {
        try{
            socket.emit('message', {chatName: chat.chatName, user, content});
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='main-wrap'>
            <div className="title-wrap">
                <span onClick={handleLeave}>{'<-'}</span>
                <h3>{chat.chatName}</h3>
                <div/>
            </div>
            <div className="main">
                {chat.messages.map(message => <Message key={message.id} message={message}/>)}
                <div ref={messagesEndRef} className='anchor'/>
            </div>
            <Input handleMessage={handleMessage}/>
        </div>
    );
}

const MainWrap = ({chat}) => {
    const {user} = useContext(UserContext);
    if(!user || !chat) return <Redirect to='/connect'/>;
    return <Main chat={chat}/>;
}

export default MainWrap;
