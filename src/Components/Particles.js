import React from 'react';
import Particles from 'react-particles-js';

const Particle = () => {
	return(
		<Particles className="Particles" 
        params={{
      		particles: {
      			number: {
      				value: 100,
      				density: {
		   				enable: true,
		   				value_area: 800
		   			}
      			},
      		}
      	}}
      />
	);
}

export default Particle;