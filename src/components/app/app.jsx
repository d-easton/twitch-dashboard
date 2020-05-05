import React, { Component } from 'react';
import DisplayFrame from "./displayFrame";
import styles from '../styles.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: "Bearer wtrxqfvjwna1pzfqz744fq0fqacsli",
            searchedGameName: "",
            gameInfo: null,
           
           //FETCH STATE ELEMENTS
            streams: null,              // stores the data array fetched from API
            load: false,                // boolean to test if fetch complete, because Javascript is asynchronous
            nextCursor: null,           // stored pagination curosr
            currentPage:1,             // current page of streams
            currentCursor: null,
        };
    }

     // get initial data (first 20)
     componentDidMount(){     
        let url = "https://api.twitch.tv/helix/streams";
        this.fetchStreams(url);
    }

    // fetch streams helper method
    fetchStreams = (url) => {
        console.log("FETCH STREAMS");
        const token = this.state.token;             // are things like this needed? putting them bc i read something about asynchronicity
        return fetch(url, {
          headers: {
            "Client-ID": "w2zhwrpvp17utnoy98je9xe95nfxul",
            "Authorization": token,
          }
        })
        .then(res => res.json())
        .then(response => {
        // Store streams in state, flip loaded boolean
            this.setState({            
                streams: response.data,
                load:true,
                currentCursor: this.state.nextCursor,
                nextCursor: response.pagination.cursor,
            }); 
        });
    }

    // fetch game ID
    fetchGameInfo = async (url) => {
        const token = this.state.token;
        fetch(url, {
          headers: {
            "Client-ID": "w2zhwrpvp17utnoy98je9xe95nfxul",
            "Authorization": token,
          }
        })
        .then(res => res.json())
        .then(response => {
        // Store streams in state, flip loaded boolean
            this.setState({            
                gameInfo: response.data[0].id,
                continue: true,
            }); 
        })
        .then(log => {
            const gameId = this.state.gameInfo
            const searchUrl = "https://api.twitch.tv/helix/streams?game_id="+gameId;
            this.fetchStreams(searchUrl);
        });
    }

    // helper method for pagination
    handleClick = (nav) => {
        const current = this.state.currentPage;
        let newPage = nav ? current+1 : current;
        if(nav===false&&current>1) newPage = current-1;
        this.setState({
            currentPage: newPage,
        });

        let newUrl = "https://api.twitch.tv/helix/streams"
        if(newPage!==1){
            if(newPage>current)         newUrl = "https://api.twitch.tv/helix/streams?first=20&after="+this.state.nextCursor;
            else if(newPage<current)    newUrl = "https://api.twitch.tv/helix/streams?first=20&before="+this.state.nextCursor;
        }
        this.fetchStreams(newUrl);
    }
    handleRefresh = () =>{
        let temp = this.state.currentCursor;
        let refreshUrl = "https://api.twitch.tv/helix/streams"
        if(this.state.currentPage!==1){
            refreshUrl = "https://api.twitch.tv/helix/streams?first=20&after="+this.state.currentCursor;
        }
        this.fetchStreams(refreshUrl)     
        .then( done => {this.setState({currentCursor: temp});});
    }

    // handle return 
    handleReturn = () => {
        this.fetchStreams("https://api.twitch.tv/helix/streams");
        this.setState({currentPage: 1});
    }

    // helper method for searching for game
    handleSubmit = () => {
        const gameName= this.state.searchedGameName;
        if(gameName==="") this.fetchStreams("https://api.twitch.tv/helix/streams");
        else{
            const getGameIdUrl = "https://api.twitch.tv/helix/games?name="+gameName;
            this.fetchGameInfo(getGameIdUrl); 
        }
    }

    // helper method for updating search field in state
    updateQuery = (event) => {
        this.setState({
            searchedGameName: event.target.value,
        });
    }

    render() { 
        return (
            <div id ="frame">
                <div id="title">
                    <div id = "entireLogo">
                        <div id="logoContainer"> 
                            <span id="twitchDashboardName" >
                                <h1 className="right" id="twitchName">Twitch</h1>
                                <h1 className="left" id="dashName">Dashboard</h1>
                            </span> 
                            <span id ="logoWrap"> 
                                <img src ="http://www.newdesignfile.com/postpic/2014/02/twitch-logo-black-and-white_99117.png" id="logo"/>
                            </span>
                        </div>
                    </div>
                    <div id="searchWrap">
                        <div id="searchTable">
                            <input  type="text" name="searchQuery" id="searchQuery" placeholder = " Search Twitch for a game..." onChange = {event => this.updateQuery(event)}></input>    
                            <div type="submit" name="searchSubmit" id="searchButton" onClick={this.handleSubmit}>Search</div>
                        </div>
                    </div>
                    <div id="buttonWrap">
                        <div id="returnTable">
                            <div id="returnButton" onClick={this.handleReturn}>Home</div>
                        </div>
                    </div>
                </div>
                <DisplayFrame id = "display" 
                    searchedGame = {this.state.searchedGameName} 
                    streams = {this.state.streams}
                    load = {this.state.load}
                    currentPage = {this.state.currentPage}
                    onClickNext = {next=>   this.handleClick(true)}
                    onClickRefresh ={ref => this.handleRefresh(false)}
                    onClickPrev = {prev=>   this.handleClick(false)}
                 />
            </div>
        );
    }
}
 
export default App;