import React from 'react';
import {BuildContext} from '../contexts/BuildContexts';



export default function DeleteItemButtons(props){

    return(
        <BuildContext.Consumer>
            {context=>(
                <React.Fragment>
                    <div className="delete-build-button-container">
                        <button className="delete-build-button-success" onClick={()=>context.deleteItem(props.buildId, props.itemId)}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </button>

                        <button className="delete-build-button-danger" onClick={()=>context.setModal()}>
                            <i className="fa fa-close" aria-hidden="true"></i>
                        </button>
                    </div>
                </React.Fragment>
            )}
        </BuildContext.Consumer>
    );
}