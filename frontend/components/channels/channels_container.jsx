
import React from 'react';
import { connect } from 'react-redux';
import { getChannels } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { Link, Redirect, withRouter } from 'react-router-dom';


class ChannelList extends React.Component{


  formModal(){
    // <MyModal component={myForm}  closeModal={this.props.closeModal}/>
    return(
        <div className="modal-backdrop" onClick={() => this.props.closeModal()}>
        </div>)
    ;

  }



  render(){
    let channelComponents = [];

    if (this.props.channels){
      channelComponents = this.props.channels.map( (channel) =>{
        return <li key={channel.id}># {channel.name}</li>
      });
    }

    return (
      <div className="channels-container">
        <div className="chatroom-title">{this.props.chatroom.title}</div>

        <ul className="channel-list-items">
          {channelComponents}
        </ul>

        <div className="channel-user-info">
          <div>{this.props.currentUser ?
            this.props.currentUser.username : ''}</div>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>

      </div>
    );
  }// end render

  componentWillReceiveProps(newProps){
    // debugger
    if(this.props.chatroom.id != newProps.chatroom.id){
      this.props.fetchChannels(newProps.chatroom.id)
    }
  }

}



function mapStateToProps(state, ownProps){
  let chatroom = {title: '', id: ''};
  let channels = [];
  if(ownProps.match && state.entities.chatrooms[ownProps.match.params.chatroom_id]){
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id];
  }
  if( chatroom.channels ){
    chatroom.channels.forEach( (channelId) =>{
      channels.push( state.entities.channels[channelId] );
    });
  };

  let currentUser =  undefined ;
  if( state.session.currentUserId ){
    // logged in, pass on currentUser
      currentUser= state.entities.users[state.session.currentUserId];
  }

  return { chatroom,
        currentUser,
        channels };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    logout: () => dispatch( logout() ),
    fetchChannels: (chatroomId) => dispatch( getChannels(chatroomId) ),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelList));
