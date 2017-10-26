
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';

class ChatroomList extends React.Component{

  render(){
    const chatroomEls = this.props.chatrooms.map( (chatroom) =>{
      return <ChatroomListItem chatroom={chatroom} key={chatroom.id}/>
    });
    return (
      <section>
        {chatroomEls}
      </section>
    );
  }// end render

  componentDidMount(){
    this.props.fetchChatrooms();
  }

}



function mapStateToProps(state, ownProps){
  return {
    chatrooms: Object.values(state.entities.chatrooms),
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    fetchChatrooms: () => dispatch( getChatrooms() ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatroomList);