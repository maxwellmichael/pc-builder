import React, {Component} from 'react';
import {Spring} from 'react-spring/renderprops';
import VisibilitySensor from 'react-visibility-sensor';



export default class Home extends Component{


    render(){
        return(
            <React.Fragment>
                
               <div className="home-main">
                   
                   <div className="row home-banner">

                    
                        <div className="col-sm home-banner-title">
                            <Spring from={{opacity:0, marginTop:-50}} 
                                    to={{opacity:1, marginTop:0}}
                                    config={{delay:200, duration:400}}
                                    >
                                {(props=>(
                                    <div style={props}>
                                        <h1 className="heading">PC-Builder</h1>
                                    </div>
                                    
                                ))}
                            </Spring>

                            <Spring from={{opacity:0, marginLeft:-100}} 
                                    to={{opacity:1, marginLeft:0}}
                                    config={{delay:600, duration:400}}
                                    >
                                {(props=>(
                                    <div style={props}>
                                        <p className="subheading">Select The Right Parts</p>
                                    </div>
                                    
                                ))}
                            </Spring>

                            <Spring from={{opacity:0, marginLeft:-200}} 
                                    to={{opacity:1, marginLeft:0}}
                                    config={{delay:200, duration:700}}
                                    >
                                {(props=>(
                                    <div className="banner-button-container" style={props}>
                                        <button className="banner-button">Go To Builds</button>
                                    </div>
                                    
                                ))}
                            </Spring>

                        </div>

                        <Spring from={{opacity:0, marginLeft:-50}} 
                                    to={{opacity:1, marginLeft:0}}
                                    config={{delay:400, duration:700}}
                                    >
                                {(props=>(
                                    <div style={props}>
                                        <div className="col-sm home-banner-image"></div>
                                    </div>
                                    
                                ))}
                        </Spring>


                   </div>

                   <div className="home-content">

                       <div className="content-title">
                       <Spring from={{opacity:0, marginRight:-1000}} 
                                    to={{opacity:1, marginRight:0}}
                                    config={{delay:100, duration:1000}}
                                    >
                                {(props=>(
                                    <div style={props}>
                                        <h1>What We Do</h1>
                                    </div>
                                    
                                ))}
                            </Spring>
                           
                           <Spring from={{opacity:0, marginLeft:-1000}} 
                                    to={{opacity:1, marginLeft:0}}
                                    config={{delay:100, duration:1000}}
                                    >
                                {(props=>(
                                    <div style={props}>
                                        <div className="title-line"></div>
                                    </div>
                                    
                                ))}
                            </Spring>

                            <div className="title-verdict-container">
                                <div className="title-verdict-overlay">
                                </div>
                                <div className="title-verdict-content-container">
                                <VisibilitySensor>
                                {({ isVisible }) => (
                                    <Spring config={{delay:100, duration:400}} to={{ opacity: isVisible ? 1 : 0}}>
                                        {(props=>(
                                    <div style={props}>
                                        <p>
                                            We provide a list of various components to select from to make your PC as per your need.
                                            Our advanced system will automatically alert you via email whenever the price of the build goes lower than your pre-set amount. 
                                            The price tracker tool will help you to buy the pc parts or components at a reasonable price.
                                        </p>
                                    </div>
                                    
                                ))}
                                   
                                    </Spring>
                                )}
                                </VisibilitySensor>


                                       
                                </div>

                            </div>
                           
                       </div>
                        
                       <div className="card-overline"></div>
                      
                      

                   </div>


               </div>
            </React.Fragment>
        )
    }

}
