import MessageForm from './MessageForm'
import MyMessage from './MyMessage'
import TheirMessage from './TheirMessage'

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;
    console.log('PROPS', props)
    const chat = chats && chats[activeChat];

    const renderReadReceipts = (message, isMyMessage) => { // Here we check to see who received and read that message and display them
        return chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        )) // Map over the people that read the message
    }

    const renderMessages = () => { //Here were pulling the ids of the messages so that we can differentiate which messages are whose
        const keys = Object.keys(messages);
        console.log("KEYS", keys)

        return keys.map((key, index) => { //
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1]; // is this the last message that was sent? Basically saying if there are messages find the last message
            const isMyMessage = userName === message.sender.username; // is this my message? 

            return ( // create a div that's going to act as our message
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        { // This dynamic block of code will render the MyMessage component if it is my message else it will render the TheirMessage component
                            isMyMessage
                                ? <MyMessage message={message} />
                                : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div> // since we're mapping through things we need to add a key and inline styling 
            )
        })
    }

    if (!chat) return 'Loading... ';

    return ( // here we'll render the structure of the chat feed
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div> {/* <!-- ? makes sure we have chat before we try to access the title variable --> */}
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.userName}`)} {/* dynamic logic to find the person's username to display as the subtitle */}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    )
}

export default ChatFeed;