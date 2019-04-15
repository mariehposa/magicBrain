import React from 'react';

class SignIn extends React.Component{
	constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
   }

   onEmailChange = (event) =>{
    this.setState({signInEmail: event.target.value});
   }

   onPasswordChange = (event) =>{
    this.setState({signInPassword: event.target.value});
   }

   onSubmitSignin = () =>{
	   	fetch('http://localhost:2000/signin', {
	   		method: 'post',
	   		headers: {'Content-Type': 'application/json'},
	   		body: JSON.stringify({ //converts what is inside the body(javascript objectsi.e email and password) to json before transferring to the backend
	   			email:this.state.signInEmail,
	   			password:this.state.signInPassword
	   		})
	   	})
   	  //this.props.onRoute('home');
   	  .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRoute('home');
        }
      })
   }

	render(){
		const {onRoute} = this.props;
		return(
			<article className="br3 b--black-10 mv4 w-120 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				   <form className="measure">
					   <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="email" 
						        name="email-address"  
						        id="email-address" 
						        onChange={this.onEmailChange}
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
						        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        onChange={this.onPasswordChange} 
					        />
					      </div>
					      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me </label>
					   </fieldset>
					      <div className="">
					         <button 
						         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br-pill" 
						         type="submit" value="Sign In" 
						         onClick={this.onSubmitSignin} >Sign in
					         </button>
					      </div>
					      <div className="lh-copy mt4">
						      <label className="f6 fw6 dim black db pointer" onClick={ ()=>onRoute('register') } >Create an account</label>
					      </div>
				   </form>
				</main>
			</article>
	);
	}
}

export default SignIn;
