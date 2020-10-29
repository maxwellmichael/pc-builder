import React, {Component} from 'react';
import {MainContext} from '../contexts/MainContexts';
import {Spring, config} from 'react-spring/renderprops';
import axios from 'axios';



export default class MobileForm extends Component{

    static contextType = MainContext;

    state = {
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
        console.log(this.state)
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
                console.log("jiida")
                this.context.setAuthMobileLogin()
            }
            else{
                console.log(res)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    LoginForm =()=>{
        return(
            <React.Fragment>
                <Spring
                    from={{ marginTop: -100 }}
                    to={{ marginTop: 0 }}
                    config={config.wobbly}
                    delay={200}
                    >
                    {props => 
                    <div style={props}>
                        <form onSubmit={(event)=>this.context.handleLoginSubmit(event, this.state.email, this.state.password)} className="register-form">
                            <h1>Login</h1>
                            <div className="form-input-material">
                                <label htmlFor="username">Email</label>
                                <input onChange={this.setName} type="email" name="email" id="username" placeholder=" " autoComplete="false" className="form-control-material" required />
                            </div>
                            <div className="form-input-material">
                                <label htmlFor="password">Password</label>
                                <input onChange={this.setPassword} type="password" name="password" id="password" placeholder=" " autoComplete="false" className="form-control-material" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-ghost">Login</button>
                            <p style={{textAlign:'center'}}>or</p>
                            <button onClick={()=>this.context.unsetAuthMobileLogin()} className="btn btn-primary btn-ghost">Register</button>
                        </form>
                        
                    </div>
                    }
                </Spring>
            </React.Fragment>
        )
    }


    RegisterForm =()=>{
        return(
            <React.Fragment>
                <Spring
                    from={{ marginTop: -100 }}
                    to={{ marginTop: 0 }}
                    config={config.wobbly}
                    delay={200}
                    >
                    {props => 
                    <div style={props}>
                        <form onSubmit={this.handleSignupSubmit} className="login-form" >
                            <h1>Register</h1>
                            <div className="form-input-material">
                                <label htmlFor="username">Username</label>
                                <input onChange={this.setName} type="text" name="username" id="username" placeholder=" " autoComplete="false" className="form-control-material" required />
                            </div>
                            <div className="form-input-material">
                                <label htmlFor="email">Email</label>
                                <input onChange={this.setEmail} type="email" name="email" id="username" placeholder=" " autoComplete="false" className="form-control-material" required />
                            </div>
                            <div className="form-input-material">
                                <label htmlFor="password">Password</label>
                                <input onChange={this.setPassword} type="password" name="password" id="password" placeholder=" " autoComplete="false" className="form-control-material" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-ghost">Register</button>
                            <p style={{textAlign:'center'}}>or</p>
                            <button onClick={()=>this.context.setAuthMobileLogin()}  className="btn btn-primary btn-ghost">Login</button>
                        </form>
                    </div>
                    }
                </Spring>
                
            </React.Fragment>
        )
    }


    render(){
        return(
            <React.Fragment>
                <div className="mobile-form-main">
                    {this.context.authMobileForm.isLogin ? this.LoginForm() : this.RegisterForm()}
                </div>
            </React.Fragment>
        )
    }
}