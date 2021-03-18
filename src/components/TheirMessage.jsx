const TheirMessage = ({ lastMessage, message }) => {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username === message.sender.username
    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div
                    className="message-avatar"
                    style={{ backgroundImage: `url(${message?.sender?.avatar})` }} // dynamic logic to check if the message sender avatar exists. If so then it will display that avatar only if it is the first message by the user.
                />
            )}
            {message?.attachments?.length > 0
                ? ( // will make sure to render the image if the message is the image
                    <img
                        src={message.attachments[0].file}
                        alt="message-attachment"
                        className="message-image"
                        style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }} // because on chat apps the messenger you're receiving from usually appears on the left side of the screen the styles will put TheirMessage to the left
                    />
                ) : (
                    <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        {message.text}
                    </div>
                )

            }
        </div>
    )
}

export default TheirMessage;