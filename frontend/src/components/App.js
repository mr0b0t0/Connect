import React, {useState, useMemo, useEffect} from 'react';
import {
	BrowserRouter as Router, 
	Switch,
	Route
} from "react-router-dom";

// routes
import Connect from "./routes/connect/Connect";
import Main from "./routes/main/Main";

// context
import UserContext from './UserContext';

// api calls
import getChat from "../actions/getChat";

// socket
import getSocket from "../socket";


const App = () => {
	const [user, setUser] = useState(null);
	const [chat, setChat] = useState(null);
	const [loading, setLoading] = useState(false);
	const userValue = useMemo(() => ({user, setUser}), [user, setUser]);
	useEffect(() => {
		const user = localStorage.getItem('user');
		const chatName = localStorage.getItem('chatName');
		if(user && chatName){
			setLoading(true);
			getChat(chatName).then(chat => {
				setChat(chat);
				setUser(user);
			})
			.catch(err => console.log(err))
			.finally(() => setLoading(false));
		}
	}, [setChat, setUser]);
	useEffect(() => {
		getSocket().on('chatInfo', ({chat, user}) => {
			setChat(chat);
			setUser(user);
			localStorage.setItem('user', user);
			localStorage.setItem('chatName', chat.chatName);
		});
	}, [setChat, setUser]);
	useEffect(() => {
		getSocket().on('chatUpdate', ({chat}) => {
			setChat(chat);
			localStorage.setItem('chatName', chat.chatName);
		});
	}, [setChat, setUser]);
	if(loading) return <h2>Loading...</h2>;
	return (
			<Router>
				<Switch>
					<UserContext.Provider value={userValue}>
						<Route path='/connect' exact component={() => <Connect setChat={setChat}/>}/>
						<Route path='*' component={() => <Main chat={chat}/>}/>
					</UserContext.Provider>
				</Switch>
			</Router>
	);
}

export default App;
