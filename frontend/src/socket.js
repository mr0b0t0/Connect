import socketIOClient from "socket.io-client";
import {server} from "./config";;
const socket = socketIOClient(server);
export default () => socket;