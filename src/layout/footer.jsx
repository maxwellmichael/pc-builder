import React, {Component} from 'react';



class Footer extends Component{


    render(){

        return(
            <React.Fragment>
                <footer className="footer-distributed">
 
                    <div className="footer-left">

                    <h3>PC-Builder<span>.Tech</span></h3>

                    <p className="footer-links">
                    <a href="#">Home</a>
                    ·
                    <a href="#">Blog</a>
                    ·
                    <a href="#">Pricing</a>
                    ·
                    <a href="#">About</a>
                    ·
                    <a href="#">Faq</a>
                    ·
                    <a href="#">Contact</a>
                    </p>

                    <p className="footer-company-name">pcbuilder &copy; 2021</p>
                    </div>

                    <div className="footer-center">

                    <div className="center-item">
                    <i className="fa fa-map-marker"></i>
                    <p><span>21 Revolution Street</span> Delhi, India</p>
                    </div>

                    <div className="center-item">
                    <i className="fa fa-phone"></i>
                    <p>+91 7356102087</p>
                    </div>

                    <div className="center-item">
                    <i className="fa fa-envelope"></i>
                    <p><a href="mailto:maxwellmichael522@gmail.com">contact@pcbuilder.tech</a></p>
                    </div>

                    </div>

                    <div className="footer-right">

                    <p className="footer-company-about">
                    <span>About the company</span>
                        PC-Builder.tech is a Website that allows you to Build a PC Using Parts That will be Available from other Vendor Websites.
                    </p>

                    <div className="footer-icons">

                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-github"></i></a>

                    </div>

                    </div>

                </footer>
          
            </React.Fragment>
        );
    }
}


export default Footer;