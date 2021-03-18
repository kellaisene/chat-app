import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';

import './App.css';

const App = () => {
    return (
        <ChatEngine
            height="100vh"
            projectID="58e0e2c9-fa14-40bf-8f19-5c7acf48667a"
            userName="kellerj"
            userSecret="123123"
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}

        />
    )
}

export default App;