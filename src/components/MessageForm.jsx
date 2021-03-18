import { useState } from 'react';
import { sendMessage, isTyping } from 'react-chat-engine'; // Here were using some react-chat-engine features
import { SendOutlined, PictureOutlined } from '@ant-design/icons'; // Importing the icons for send button

const MessageForm = (props) => { // This component will hold all the logic to write and send messages
    const [value, setValue] = useState('') // What is our state? It is the 'value'. Our initial state is an empty string.
    const { chatId, creds } = props; // Destructuring from the props

    const handleSubmit = (event) => {
        event.preventDefault(); // on every handleSubmit in React you have to add the event.preventDefault. This will make sure to not do a browser refresh once you submit the form. We don't wnat browser refreshes on a React app.

        const text = value.trim(); // trim simply removes the leading and trailing whitespace

        if (text.length > 0) sendMessage(creds, chatId, { text }) // Check if there is actually a message. If so then send the message passing in the creds, chatId, and text object in the sendMessage function

        setValue('') // Clear the text by resetting state to empty string
    }

    const handleChange = (event) => {
        setValue(event.target.value) // Where the value of the input is stored in

        isTyping(props, chatId) // We pass in all the props and chatId to this function
    }

    const handleUpload = (event) => {
        sendMessage(creds, chatId, { files: event.target.files, text: '' }) // This handles the upload of images
    }

    return ( // Here we render the form that we can write our messages in
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Send a message ..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    )
}

export default MessageForm;