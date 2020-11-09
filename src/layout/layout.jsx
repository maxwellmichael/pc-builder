import React, {Component} from 'react';
import Navbar from './navigation';
import Footer from './footer';



class Layout extends Component{

    state = {
        showFooter: false,
    }

    componentWillUnmount(){
        this.setState({showFooter:false})
    }

    componentDidMount(){
        this.setState({showFooter:true})
    }

    render(){


        return(
            <React.Fragment>
                <Navbar />
                {this.props.children}
                {this.state.showFooter ? <Footer/> : null}
            </React.Fragment>

        );
    }
}

export default Layout;