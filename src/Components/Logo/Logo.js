import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
	return(
		<div>
			<Tilt className="Tilt br3 shadow-3" options={{ max:45, speed:300, transition:true,}} style={{ height: 100, width: 100, marginTop:-55}} >
			 <div className="Tilt-inner pa3"><img src={brain} alt="logo" style={{paddingTop:5}} /> </div>
			</Tilt>
			<h1 className="magic">Magic Brain</h1>
		</div>
	);
}

export default Logo;
