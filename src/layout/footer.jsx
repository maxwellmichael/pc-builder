import React, {Component} from 'react';



class Footer extends Component{


    render(){

        return(
            <React.Fragment>
            <div className="footer-container">
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="footer-col first">
                                <h4>About Tivo</h4>
                                <p className="p-small">We're passionate about designing and developing one of the best marketing apps in the market</p>
                            </div>
                        </div> 
                        <div className="col-md-4">
                            <div className="footer-col middle">
                                <h4>Important Links</h4>
                                <ul className="list-unstyled li-space-lg p-small">

                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Our business partners <a className="white" href="#your-link">startupguide.com</a></div>
                                    </li>

                                    <li className="media">
                                        <i className="fas fa-square"></i>
                                        <div className="media-body">Read our <a className="white" href="terms-conditions.html">Terms & Conditions</a>, <a className="white" href="privacy-policy.html">Privacy Policy</a></div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-col last">
                                <h4>Contact</h4>
                                <ul className="list-unstyled li-space-lg p-small">
                                    <li className="media">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <div className="media-body">22 Innovative, San Francisco, CA 94043, US</div>
                                    </li>
                                    <li className="media">
                                        <i className="fas fa-envelope"></i>
                                        <div className="media-body"><a className="white" href="mailto:contact@tivo.com">contact@tivo.com</a> <i className="fas fa-globe"></i><a className="white" href="#your-link">www.tivo.com</a></div>
                                    </li>
                                </ul>
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
           
        
        
            
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="p-small">Copyright © 2020 <a href="https://inovatik.com">Template by Inovatik</a></p>
                        </div>
                    </div> 
                </div> 
            </div> 

            </div>
          
        </React.Fragment>
        );
    }
}


export default Footer;