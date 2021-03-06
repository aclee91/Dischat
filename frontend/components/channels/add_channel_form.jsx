import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';

class AddChannelForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      name: '',
      description: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }


  handlePropagation(event){
    event.stopPropagation()
  }


  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }



  handleCreate(event){
    event.preventDefault();
    this.refs['btn-disable'].setAttribute("disabled", "disabled");
    let newChannel = { chatroom_id: this.props.chatroom.id,
      name: this.state.name,
      description: this.state.description }
    this.props.addChannel(newChannel);
    this.setState({
      name: '',
      description: '',
    });
  }


  render(){
    // joinChatroom chatroomId
    // createChatroom chatroom


    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>
        <div className="chat-form-errors">
          {this.props.errors}
        </div>
        <div className="chatroom-forms-container">
          <div className="chat-form" >
            <h2 style={ {color: 'black' }}>Create a Channel</h2>
            <form className="chat-form" onSubmit={this.handleCreate}>
              <label className="auth-form-label">Name: <br/>
              <input type="text" onChange={this.handleChange('name')} value={this.state.name}/>
            </label>
              <label className="auth-form-label">Description: <br/>
              <input type="text" onChange={this.handleChange('description')} value={this.state.description}/>
            </label>
            <button ref="btn-disable">Create</button>
          </form>
        </div>
      </div>
      </div>
    );
    return forms;
  }

}


export default AddChannelForm;
