const MyMessage = ({ message }) => {
    if (message?.attachments?.length > 0) {
        return ( // will make sure to render the image if the message is the image
            <img
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: 'right' }}
            />
        )
    }
    return ( // If not then we will simply render the text
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3b2a50' }}>
            {message.text}
        </div>
    )
}

export default MyMessage;