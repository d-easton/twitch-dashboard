import React, { Component } from 'react';
import Results from '../results/index';
import styles from './display-frame.css';
import stylesGlobal from '../../styles.css';

class DisplayFrame extends Component {

    render() { 
        const page = this.props.currentPage;
        return (    
            <div id = "display">
                <NavBar 
                    currentPage={page}
                    onClickRefresh={this.props.onClickRefresh}
                    onClickPrev={this.props.onClickPrev}
                    onClickNext={this.props.onClickNext}
                />
                <Results page = {page} streams={this.props.streams} load = {this.props.load} />
            </div>
            );
    }
}
 
const NavBar = (props) =>{
    return ( 
        <div id = "navBar">
            <div className = "pageBar">
                <PrevButton  className="paginate" id="left" onClick={props.onClickPrev}/>
                <div className="refreshButton" id="center" onClick={props.onClickRefresh} >{props.currentPage}</div>
                <NextButton className="paginate" id="right" onClick={props.onClickNext}/>
            </div>
        </div >
     );
}

const PrevButton = (props) => {
    return( <div className="navButton" onClick={props.onClick}>  
        {"<"}  
    </div> );
}
const NextButton = (props) =>{
    return( <div className="navButton" onClick={props.onClick}>  
        {">"}   
    </div> );
}

export default DisplayFrame;