import React, {useContext} from 'react';
import UserContext from "../../../UserContext";
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';


const Message = ({message}) => {
    const {user} = useContext(UserContext);
    const isMine = message.user === user;
    return (
        <div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${isMine ? 'start' : 'end'}`,
          ].join(' ')}>
            <div className="bubble-container">
              <div className="bubble">
                    <Tooltip title={message.user}>
                        <Avatar style={{marginTop: '2px'}}>
                            {message.user[0].toUpperCase()}
                        </Avatar>
                    </Tooltip>
                    <div className='bubble-inner'>
                        <p>
                            {message.content}
                        </p>
                        <small className='ftxs'>{moment(message.date).fromNow()}</small>
                    </div>
              </div>
            </div>
        </div>
    )
}


export default Message;
