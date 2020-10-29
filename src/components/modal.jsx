import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

import {MainContext} from '../contexts/MainContexts';
import NewBuildForm from './NewBuildForm';
import DeleteBuildButtons from './DeleteBuildButtons';

import DeleteItemButtons from './DeleteItemButtons';
import ItemEditForm from './ItemEditForm';
import AddItemForm from './AddItemForm';


export default class HomeModal extends Component{

    static contextType = MainContext;

    setModalAsToType = (modal)=>{
        if(modal.type==="NEWBUILD"){
            return(
                <NewBuildForm />
            );
        }
        else if(modal.type==="DELETEBUILD"){
            return(
                <DeleteBuildButtons buildId={modal.buildId} />
            );
        }
        else if(modal.type==="ADDITEM"){
            return(
                <AddItemForm setNewItem={(value)=>this.context.setNewItem(value)} buildId={modal.buildId} />
            );
        }

        else if(modal.type==="DELETEITEM"){
            return(
                <DeleteItemButtons buildId={modal.buildId} itemId={modal.itemId} />
            );
        }
        else if(modal.type==="EDITITEM"){
            return(
                <ItemEditForm defaultValues={this.context.modal.data} editItemValues={(value)=>this.context.editItemValues(value, modal.itemId)} buildId={modal.buildId} />
            );
        }
        else if(modal.type==="LOGINSUCCESS"){
            return <Redirect to="/builds" />
        }
        else{
            return(
                <h1>Nothing</h1>
            );
        }
    }

    render(){
        return(
            <React.Fragment>
                <Modal
                {...this.props}
                className="modal-main"
                dialogClassName="modal-90w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {this.context.modal.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                   {this.setModalAsToType(this.context.modal)}
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }

}