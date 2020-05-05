import React, { Component } from 'react';
import GameInfo from './gameInfo';
import styles from '../styles.css';

class Stream extends Component {
    render() { 
        return (
            <React.Fragment>
                <DisplayName name = {this.props.displayName}/>
                <div className="streamWrap">
                    <div className="streamTableRow">
                        <div id="gameCell">
                            <PreviewThumbnail className="gameThumbnail" imgURL = {this.props.image}/>
                        </div>
                        <ul id="descAndInfo">
                            <li><GameInfo className="streamInfo" id="gameInfo" gId={this.props.gameId} count={this.props.viewers}/></li>
                            <li><Description className="streamInfo"  user={this.props.streamer} start={this.props.start}/></li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const DisplayName = (props) =>{
    return( 
        <h2 className="displayName">  {props.name} </h2>
    );
}

const PreviewThumbnail = (props) =>{
    const source = props.imgURL.replace("{width}", 267).replace("{height}", 150);
    // console.log(props.imgURL);
    return( 
        <img src={source} className="gameThumbnail" alt="Preview Thumbnail"/>
    );
}

const Description = (props) =>{
    const streamer = props.user;
    const rawStart = new Date(props.start);
    const prettyStart = formatStreamDate(rawStart);

    return(
        <p id = "gameDesc" >{streamer}'s stream, started at {prettyStart} </p>
    );
}

//Should this go somewhere else? combine with description to make it a full class, maybe?
const formatStreamDate = (start) => {
    //build time componenets
    let hours = start.getHours();                      //hours
    const amOrPm = hours >= 12 ? ' PM' : ' am';
    hours = hours % 12;
    hours = hours ? hours : 12;
   
    let minutes = start.getMinutes();                  //minutes
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    
    //build time and date: combine
    let time = hours + ':' + minutes + amOrPm;
    return (start.getMonth()+1) + "." + (start.getDate()) + "." + start.getFullYear() + " at " + time;
  }


export default Stream;


