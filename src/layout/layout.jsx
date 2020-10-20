import React, {Component} from 'react';
import Navbar from './navigation';
import Footer from './footer';



class Layout extends Component{

    render(){


        return(
            <React.Fragment>
                <Navbar />
                {this.props.children}
            </React.Fragment>

        );
    }
}

export default Layout;