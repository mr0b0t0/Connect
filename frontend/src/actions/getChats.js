import axios from 'axios';
import config from './config';

export default async() => {
    const res = await axios.get('/get_chats', config);
    return res.data.chatNames;
}
