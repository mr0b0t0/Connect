const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectToDb = require('./db/connect');
const socket = require('./socket');

const {port, cookieParserSecret, origins} = require('./config');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

// middleware
app.use(helmet());
app.use(
    cors(
      {
          credentials: true, 
          origin: origins,
      }
    )
);
app.use(cookieParser(cookieParserSecret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', require('./api/chats'));

socket(io);

app.get('*', (_, res) => {
    return res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

connectToDb().then(
    server.listen(port, () => console.log(`\n\nServer running on port ${port}\n\n`))
);