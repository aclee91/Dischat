
import React from 'react';
import { connect } from 'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email_address: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type){
    return (event) => this.setState( { [type] : event.target.value  } );
  }

  componentWillReceiveProps(newProps){
    //compare new vs old, if different,

  }


  handleSubmit(event){
    event.preventDefault();
    this.props.formAction({ username: this.state.username,
      email_address: this.state.email_address,
      password: this.state.password,
    });

    this.setState({
      username: '',
      email_address: '',
      password: ''
    });

  }
  navLink() {
    if (this.props.formType === 'signup') {
      return <div>
                <label className="auth-form-label-sm">Already have an account? </label>
                <Link className="session-other-form" to="/login">Login</Link>
              </div>
    } else {
      return <div>
                <label className="auth-form-label-sm">Need an account? </label>
                <Link className="session-other-form" to="/signup">Register</Link>
              </div>
    }
  }

  userInputLabel(){
    return(
        <label className="auth-form-label">Username</label>
      );
  }

  userInput(){
    return(
        <input type="text" onChange={this.handleChange('username')} />
      );
  }

  render(){
    const signupPage = (this.props.formType === 'signup');
    const errors = this.props.errors.map( (error, idx) =>{
      return <li key={idx}>{error}</li>;
    });
    return (
      <div className="session-flex-container">
        <div className="auth-form-container">
          <div className="auth-form-inner-left">
            <div className="icon-lg"></div>
          </div>
          <section className="auth-form-inner-right">
            <h3>{ signupPage ? "Create an Account" : "Welcome Back"}</h3>
            <ul className={`auth-form-errors ${errors.length ? 'auth-form-on' : ''}`}>
              {errors}
            </ul>
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <label className="auth-form-label">Email</label> <input type="text" onChange={this.handleChange('email_address')} />
                { signupPage ? this.userInputLabel(): ''}
                { signupPage ? this.userInput(): ''}
                <label className="auth-form-label">Password</label> <input type="password" onChange={this.handleChange('password')} />
              <button>{ signupPage ? "Sign Up" : "Login"}</button>
            </form>
            {this.navLink()}
          </section>

        </div>

      </div>
    );
  }


  componentWillUnmount(){
    if( this.props.errors.length > 0 ){
      // dispatch clearError
      this.props.clearErrors();
    }
  }

}// end SessionForm



function mapStateToProps(state, ownProps){
  let errors = [];
  if( state.errors.length > 0 ){
    errors = state.errors;
  }
  return {errors};
}

function mapDispatchToProps(dispatch, ownProps){
  const formType = ownProps.location.pathname === '/login' ? 'login' : 'signup';

  let formAction;

  if( formType === 'login'){
    formAction = (user) => dispatch( login(user) );
  }else{
    formAction = (user) => {
      dispatch( signup(user) )
    };
  }

  return {
    formType: formType,
    formAction: formAction,
    clearErrors: () => dispatch( clearErrors() )
  };
}


const SessionFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));

export default SessionFormContainer;
