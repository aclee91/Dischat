
import React from 'react';
import SessionFormContainer from './session_form/session_form_container';
import {Route} from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import AuthRoute from '../util/auth_route';
import ProtectedRoute from '../util/protected_route';
import ChatroomsContainer from './chatrooms/chatrooms_container';
import ChannelsContainer from './channels/channels_container';
import MessagesContainer from './messages/messages_container';
import FriendListContainer from './friends/friend_list_container';
import FriendMessagesContainer from './friends/friend_messages_container';

const App = () =>{

  return (
    <div className="app-container">
      <Route exact path="/" component={GreetingContainer} />
      <ProtectedRoute path="/chatrooms/:chatroom_id" component={ChatroomsContainer} />
      <ProtectedRoute path="/chatrooms/@me" component={FriendListContainer} />
      <ProtectedRoute path="/chatrooms/@me/:channel_id" component={FriendMessagesContainer} />
      <ProtectedRoute path="/chatrooms/:chatroom_id/channels/:channel_id/" component={ChannelsContainer} />
      <Route path="/chatrooms/:chatroom_id/channels/:channel_id/messages" component={MessagesContainer} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
    </div>

  );

}

export default App;
