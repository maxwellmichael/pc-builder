import React,{Component} from 'react';
import Login from '../components/login';
import Signup from '../components/signup';
import Overlay from '../components/form_overlay';
import {MainContext} from '../contexts/MainContexts';
import FlashMessage from '../components/FlashMessage';
import MobileForm from '../components/MobileAuthForm';
import MediaQuery from 'react-responsive'




export default class UserAuthForm extends Component{

    static contextType = MainContext;

   
   

    render(){
        
        return(
            <React.Fragment>
                <FlashMessage />
                <MediaQuery query="(min-device-width: 1224px)">
                    
                    <div className={ this.context.authForm.RightPanelOverlayActive ? "user-auth-form-container right-panel-active" : "user-auth-form-container"}  id="container">
                        <Login handleLoginSubmit={this.context.handleLoginSubmit} />
                        <Signup setRightPanelOverlayActive={()=>this.context.setRightPanelOverlayActive()}/>
                        <Overlay handleSignUp={()=>{this.context.setRightPanelOverlayActive()}} />
                    </div>
                </MediaQuery>

                <MediaQuery query="(max-device-width: 1224px)">
                    <MobileForm />
                </MediaQuery>
                
                
            </React.Fragment>
        )
    }
}