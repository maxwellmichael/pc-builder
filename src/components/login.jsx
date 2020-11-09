import React,{Component} from 'react';
import axios from 'axios';
import {MainContext} from '../contexts/MainContexts';



export default class Signup extends Component{

    static contextType=MainContext

    state={
        email:"",
        password:"",
    }

    setEmail=(event)=>{
        this.setState({email:event.target.value});
    }

    setPassword=(event)=>{
        this.setState({password:event.target.value});
    }

    

    render(){
        return(
                <div className="form-container sign-in-container">
                            <form onSubmit={(event)=>{this.context.setLoaderTrue(); this.props.handleLoginSubmit(event, this.state.email, this.state.password);}}>
                                <h1>Sign in</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                                <span>or use your account</span>
                                <input onChange={this.setEmail} type="email" placeholder="Email" />
                                <input onChange={this.setPassword} type="password" placeholder="Password" />
                                <a href="#">Forgot your password?</a>
                                <button>Sign In</button>
                            </form>
                </div>
        )
    }
}