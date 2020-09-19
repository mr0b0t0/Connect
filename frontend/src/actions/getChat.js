import axios from 'axios';
import config from './config';

import {server} from "../config";

axios.defaults.baseURL = `${server}/api`;

export default async chatName => {
    const res = await axios.get(`/get_chat/${chatName}`, config);
    return res.data.chat;
}
