import React from 'react';
import { connect } from 'react-redux';
import { getChatrooms } from '../../actions/chatroom_actions';
import { Link, Redirect } from 'react-router-dom';

class EditUserForm extends React.Component{
  constructor(props){
    super(props);

    this.state={
      email_address: this.props.currentUser.email_address,
      username: this.props.currentUser.username,
      password: '',
      imageFile: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handlePropagation = this.handlePropagation.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange(type){
    return (event) => (
      this.setState( { [type] : event.target.value  } )
    );
  }

  handleFile(event){
    this.setState( { imageFile :  event.currentTarget.files[0] } );
  }

  handlePropagation(event){
    event.stopPropagation()
  }


  handleEdit(event){
    event.preventDefault();
    this.refs['btn-disable-update-user'].setAttribute("disabled", "disabled");

    let formData = new FormData();

    // let updatedUser = {};

    if( this.state.email_address.length > 0 ){
      // updatedUser['email_address'] = this.state.email_address;
      formData.append("user[email_address]", this.state.email_address );
    }
    if( this.state.username.length > 0 ){
      // updatedUser['username'] = this.state.username;
      formData.append("user[username]", this.state.username );
    }
    if( this.state.password.length > 0 ){
      // updatedUser['password'] = this.state.password;
      formData.append("user[password]", this.state.password );
    }
    if( this.state.imageFile ){
      formData.append("user[avatar]", this.state.imageFile );
    }

    this.props.updateUser(formData);
    this.props.closeModal();

  }

  handleLogout(event){
    event.preventDefault();
    this.refs['btn-disable-logout'].setAttribute("disabled", "disabled");
    this.props.logout();
  }

  handleModalClose(event){
    event.preventDefault();
    this.props.closeModal();
  }


  render(){
    let regularUserForm = (<form className="chat-form" onSubmit={this.handleEdit}>

        <label className="update-current-user-form-label">Email: <br/>
          <input type="text" onChange={this.handleChange('email_address')} value={this.state.email_address}/>
        </label>
        <label className="update-current-user-form-label">Username: <br/>
          <input type="text" onChange={this.handleChange('username')} value={this.state.username}/>
        </label>
        <label className="update-current-user-form-label">Password: <br/>
          <input type="password" onChange={this.handleChange('password')} value={this.state.password}/>
        </label>

        <label className="update-current-user-form-label">Profile Picture: <br/>
          <input type="file" onChange={this.handleFile} />
        </label>

        <button ref="btn-disable-update-user">Update</button>
      </form>);


    if(this.props.currentUser.email_address === "GuestUser" || this.props.currentUser.username === "GuestUser"){
      regularUserForm = (<form className="chat-form" onSubmit={this.handleEdit}>

          <label className="update-current-user-form-label">Profile Picture: <br/>
            <input type="file" onChange={this.handleFile} />
          </label>

          <button ref="btn-disable-update-user">Update</button>
        </form>);
    }

    const forms = (
      <div className="chatroom-modal-form-container" onClick={this.handlePropagation}>
        <button className="close-modal-button" onClick={this.handleModalClose}>x</button>

        <h2 style={ {color: 'black' }}>Update User Settings</h2>
          {regularUserForm}
        <hr/>
        <form className="chat-form" onSubmit={this.handleLogout}>
          <button ref="btn-disable-logout" style={ {width: '295px' }}>Logout</button>
        </form>

      </div>
    );
    return forms;
  }

}


export default EditUserForm;
