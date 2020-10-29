import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {MainContext} from '../contexts/MainContexts'

export default function Form(){

    const [value, setValue] = useState("");

    return(
        <MainContext.Consumer>
            {context=>(
                 <div className="new-build-container">
                    <input placeholder="Name of the Build" onChange={(e)=>setValue(e.target.value)} className="new-build-form-input" />
                    <Button onClick={()=>context.setNewBuild(value)} className="new-build-button">
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </Button>
                </div>
            )}
        </MainContext.Consumer>
       
    );
}