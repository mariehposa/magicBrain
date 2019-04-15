import React from 'react';

const Navigation = ({onRoute, isSignedIn}) => {
	if (isSignedIn === true){
		return(
			<nav style={{display:'flex' ,justifyContent:'flex-end'}}>
				<p onClick={ ()=>onRoute('register') } className= 'f4 link dim white underline pa1 pointer'> Sign Out </p>
			</nav>
	    );
	}else if (isSignedIn === false){
		return(
			<nav style={{display:'flex' ,justifyContent:'flex-end'}}>
				<p onClick={ ()=>onRoute('signin') } className= 'f4 link dim white underline pa1 pointer'> Sign In </p>
				<p onClick={ ()=>onRoute('register') } className= 'f4 link dim white underline pa1 pointer'> Register </p>
			</nav>
	    );
	}
}

export default Navigation;