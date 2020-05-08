import React, { Component } from 'react';
import styles from './game-info.css';
import stylesGlobal from '../../styles.css';
// CURRENT ISSUE: this often throws errors

class GameInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: "Bearer wtrxqfvjwna1pzfqz744fq0fqacsli",
            info: null, 
            gameURL: "https://api.twitch.tv/helix/games?id="+this.props.gId,
            load: false
        };
    }

    componentDidMount(){      
        const fetchGameName = () => {
            const token = this.state.token;
            fetch(this.state.gameURL, {
              headers: {
                "Client-ID": "w2zhwrpvp17utnoy98je9xe95nfxul",
                "Authorization": token,
              }
            })
            .then(res => res.json())
            .then(response => {
                this.setState({            
                    info: response.data,
                    load:true,
                });
            });
          } 
          fetchGameName()
    }

    render() { 
        if(!this.state.load)    return <p>Loading...</p>
        const info = this.state.info;               // too many instance variables? perhaps?
        const name = info.map(gameInfo=>
            gameInfo.name
            );

        return ( 
            <div id="gInfo">
                <div className="gInfoContents" id="viewers">  {this.props.count}   Viewers</div>
                <div className="gInfoContents"id="gameName"> Streaming {name}</div>
            </div>

         );
    }
}

export default GameInfo;