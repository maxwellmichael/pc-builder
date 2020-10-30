import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {MainContext} from '../contexts/MainContexts'
import Cookies from 'js-cookie';



export const ProtectedRoute =({component:Component, ...rest})=>{

    const context = React.useContext(MainContext);

    const csrf_access_token = Cookies.get('csrf_access_token');
    console.log("CSRF-TOKEN", csrf_access_token)

    return(
        <Route 
            {...rest} 
            render={props=>{
                if(csrf_access_token){
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
