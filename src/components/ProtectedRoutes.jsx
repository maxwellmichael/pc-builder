import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {MainContext} from '../contexts/MainContexts'
import Cookies from 'js-cookie';



export const ProtectedRoute =({component:Component, ...rest})=>{

    const context = React.useContext(MainContext);

    const isAuthenticated = Cookies.get('isAuthenticated');
    

    return(
        <Route 
            {...rest} 
            render={props=>{
                if(isAuthenticated){
                    return <Component {...props} />
                }
                else{
                    {/* If The User is Not Authenticated The User is Sent to the Login Page */}
                    return <Redirect to={{
                        pathname: "/userauthenticate",
                        state: {
                            from: props.location
                        }
                    }} 
                    />
                }
                
            }}
        />
    )

}
