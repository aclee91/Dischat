/* globals Pusher */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMembers } from '../../actions/chatroom_actions';
import UserList from "../users/user_list";

class MembersList extends React.Component{

  constructor(props){
    super(props);
  }

  render(){

    return (
      <section className="members-list">
        <div className="members-list-title">
          MEMBERS - {this.props.members.length}
        </div>
        <UserList users={this.props.members} />
      </section>
    );
  }// end render


  componentDidMount(){
    // grab members based on memberlist
    if( this.props.chatroom){
      this.props.getMembers(this.props.chatroom.id);

      this.pusher = new Pusher('4bea1f61f6acc7db5343', {
        cluster: 'us2',
        encrypted: true
      });

      let updateMemberAction = this.props.updateMember;
      let cID = this.props.chatroom.id;

      var channel = this.pusher.subscribe('member_' + this.props.chatroom.id);
      channel.bind('member_joined', function(data) {
        updateMemberAction(data, cID)
      });

    }// end this.props.chatroom

  }

  componentWillUnmount(){
    if(this.pusher){
      this.pusher.unsubscribe('member_' + this.props.chatroom.id);
    }
  }

  componentWillReceiveProps(nextProps){
    // debugger
    if(nextProps.chatroom && (this.props.members.length < nextProps.members.length) ){
      this.props.getMembers(nextProps.chatroom.id);
    }
  }

}



function mapStateToProps(state, ownProps){
  let channel=null;
  let chatroom=null;
  if( ownProps.match && ownProps.match.params ){
    channel = state.entities.channels[ownProps.match.params.channel_id]
    chatroom = state.entities.chatrooms[ownProps.match.params.chatroom_id]
  }
  let members = [];

  if( chatroom ){
    chatroom.members.forEach( (id) =>{
      if(state.entities.users[id]){
        members.push(state.entities.users[id]);
      }
    });
  }

  return {
    errors: state.errors,
    channel,
    chatroom,
    members,
  };
}

function mapDispatchToProps(dispatch, ownProps){
  return {
    getMembers: (chatroomId) => dispatch( getMembers(chatroomId) ),
    updateMember: (member, chatroomId) => dispatch({type: "RECEIVE_NEW_MEMBER", member: member, chatroomId: chatroomId}),
  };
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList));