import React from 'react';
import {MainContext} from '../contexts/MainContexts';



export default function DeleteBuildButtons(props){

    return(
        <MainContext.Consumer>
            {context=>(
                <React.Fragment>
                    <div className="delete-build-button-container">
                        <button className="delete-build-button-success" onClick={()=>context.deleteBuild(props.buildId)}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </button>

                        <button className="delete-build-button-danger" onClick={()=>context.setModal()}>
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </button>
                    </div>
                </React.Fragment>
            )}
        </MainContext.Consumer>
    );
}