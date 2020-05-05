import React, { Component } from 'react';

class LogIn extends Component {
    constructor(props){
        this.state({
            first: true,
        });
    }
    render() { 
        const authorize = "https://id.twitch.tv/oauth2/authorize?client_id=w2zhwrpvp17utnoy98je9xe95nfxul&redirect_uri=localhost:3000&response_type=token&scope=analytics:read:games";
        
        return ( 
            <button href={authorize}> Activate App </button>
        )
}
}
 
export default LogIn;