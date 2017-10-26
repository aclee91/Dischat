
import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms, joinChatroom, createChatroom } from '../../actions/chatroom_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect } from 'react-router-dom';
import ChatroomListItem from './chatroom_list_item';
import AddChatroomButton from './add_chatroom_button';
import AddChatroomForm from './add_chatroom_form';

class ChatroomList extends React.Component{


  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()}>
          <AddChatroomForm
            joinChatroom={this.props.joinChatroom}
            createChatroom={this.props.createChatroom}
            errors={this.props.errors}
            />
        </div>)
    ;
  }

  render(){
    const chatroomEls = this.props.chatrooms.map( (chatroom) =>{
      return <ChatroomListItem chatroom={chatroom} key={chatroom.id}/>
    });
    return (
      <section className="chatroom-container">
        {this.props.modal === "addChatroomButton" ? this.formModal() : ''}
          <div className="chatroom-list">
            {chatroomEls}
          </div>
          <AddChatroomButton
            openModal={this.props.openModal}/>
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
    modal: state.ui.modal,
    errors: state.errors,
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    fetchChatrooms: () => dispatch( getChatrooms() ),
    joinChatroom: (chatroomId) => dispatch( joinChatroom(chatroomId) ),
    createChatroom: (chatroom) => dispatch( createChatroom(chatroom) ),
    openModal: (modal) => dispatch( openModal(modal) ),
    closeModal: () => dispatch( closeModal() ),
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatroomList);
