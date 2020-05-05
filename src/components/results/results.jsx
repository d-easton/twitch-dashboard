import React, { Component } from 'react';
// import StreamLister from "./streamLister";
import Stream from "./stream";
class Results extends Component {
//     constructor(props){
//         super(props);
//    }

    // render helper method; takes in details, creates a Stream componenet with those params as attributes/props
    renderStream = (dN, gId, v, imgURL, user, s) => {
        return  (<Stream 
            className = "stream"
            displayName = {dN} 
            gameId = {gId}
            viewers = {v}
            image = {imgURL}
            //these taken in to generate the description
            streamer = {user}
            start = {s}
            />);
    }

    render() {
        // boolean load switch
        if(!this.props.load)                return <p>Loading...</p> 
        const streams = this.props.streams;
        const streamsList = streams.map(stream=>
<           li key = {stream.id}> {
                this.renderStream(
                    stream.title, 
                    stream.game_id,
                    stream.viewer_count,
                    stream.thumbnail_url,
                    stream.user_name,
                    stream.started_at,
                )
            }</li>
        );
        return (<ul id="streamList">{streamsList}</ul>);
    }
}
 
export default Results;