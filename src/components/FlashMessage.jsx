import React, {Component} from 'react';
import {MainContext} from '../contexts/MainContexts';
import {Redirect} from 'react-router-dom';
import {Spring} from 'react-spring/renderprops'


export default class FlashMessage extends Component{

    static contextType = MainContext;


    handleFlashFunc =()=>{
        console.log(this.context.flashMessage.func)
        const {func} = this.context.flashMessage;
        if(func==="LOGIN_RETRY"){
            return <Redirect to="/userauthenticate" />
        }
        else if(func==="LOGIN_SUCCESS"){
            return <Redirect to="/builds" />
        }
        else{
            return null
        }
    }


    successMessage=()=>{

        return(
            <div className="msg-success">
                    <div className="letter"></div>
            </div>
        )
    }

    errorMessage=()=>{

        return(
            <div className="msg-error">
                <div className="letter"></div>
            </div>
        )
    }

    render(){

        return(
            <React.Fragment>
                {this.context.flashMessage.hidden ? null :
                    <Spring
                        from={{ opacity: 0, marginTop: -100 }}
                        to={{ opacity: 1, marginTop:0 }}>
                        {props => 
                        <div style={props} className="flash_container">
                            <button onClick={()=>this.context.setFlash()}><i className="fas fa-times"></i></button>
                            <div className="content">                        
                                <h1 className="title">{this.context.flashMessage.title}</h1>
                                <p className="message">{this.context.flashMessage.message}</p>
                                {this.handleFlashFunc()}
                            </div> 
                        
                        </div>}
                    </Spring> 
                }   
            </React.Fragment>
        )
    }
}