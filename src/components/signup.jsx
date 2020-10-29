import React,{Component} from 'react';
import axios from "axios";


export default class Signup extends Component{

    state={
        name:"",
        email:"",
        password:"",
    }

    setName=(event)=>{
        this.setState({name:event.target.value});
    }

    setEmail=(event)=>{
        this.setState({email:event.target.value});
    }

    setPassword=(event)=>{
        this.setState({password:event.target.value});
    }

    handleSignupSubmit =(event)=>{
        event.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('email', this.state.email);
        bodyFormData.append('password', this.state.password);

        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/userregister',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
        .then(res=>{
            if(res.status===200){
                this.props.setRightPanelOverlayActive()
            }
            else{
                console.log(res)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
                <div className="form-container sign-up-container">
                            <form onSubmit={this.handleSignupSubmit} >
                                <h1>Create Account</h1>
                                <div className="social-container">
                                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                                <span>or use your email for registration</span>
                                <input onChange={this.setName} type="text" placeholder="Name" />
                                <input onChange={this.setEmail} type="email" placeholder="Email" />
                                <input onChange={this.setPassword} type="password" placeholder="Password" />
                                <button type="submit">Sign Up</button>
                            </form>
                </div>
        )
    }
}