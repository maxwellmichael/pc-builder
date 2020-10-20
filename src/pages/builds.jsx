import React, {Component} from 'react';
import Modal from '../components/modal';
import {Row, Container} from 'react-bootstrap';
import Card from '../components/card';
import {BuildContext} from '../contexts/BuildContexts';
import BuildTitle from '../components/BuildTitle';
import {Transition} from 'react-spring/renderprops'



class Builds extends Component{

    static contextType = BuildContext;

    render(){
        const newBuildModal = {title:"Create a New Build", type:"NEWBUILD", buildId:null}
        
        
        return(
            <div className="builds_main">
                <div className="builds-content-marquee">
                    <div className="marquee-contents">
                        <h1>How to Build a Gaming PC</h1>
                        <p>
                            Assembling your own PC will supercharge your gaming experience and allow you to upgrade components at any time.
                           Click on New Build to create a new build Structure and Easily Add Components to your Build with our Advanced Crawler.
                        </p>
                    </div>
                    <div className="marquee-image"></div>

                </div>

                {/*The Main Modal */}
                <Modal show={!this.context.modal.hidden} onHide={()=>this.context.setModal()} />
            <Container fluid>
                

                <div className="builds-nav-button-container">
                    <button onClick={()=>this.context.setModalType(newBuildModal)} className="build-nav-button" >
                        <svg className="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M19.08 1l-12-1H7a.62.62 0 0 0-.19 0h-.14l-.09.1-.13.07-.13.09L.45 4.17A1 1 0 0 0 0 5v17a1 1 0 0 0 .84 1l6 1H19a1 1 0 0 0 1-1V2a1 1 0 0 0-.92-1zM6 21.82l-4-.67V5.54l4-2.67zM18 22H8V2.09l10 .83z"></path><circle cx="13" cy="18" r="1"></circle><path d="M17 4.6L9 4v2l8 .6v-2zM17 7.6L9 7v2l8 .6v-2z"></path></g></g></svg>
                        <span>New Build</span>
                    </button>
                </div>
                
               {
                   this.context.builds.map(build=>{
                    const deleteBuildModal = {title:"Are you sure to delete this Build?", type:"DELETEBUILD", buildId:build.id};
                    const addBuildItemModal = {title:"Add a New Part to Your Build", type:"ADDITEM", buildId:build.id}


                    return(
                    <div key={build.id}  className="build-container">
                        
                        <BuildTitle inputHidden={true} build={build} />
                       
                        <Row>
                        <div className="build-button-group">
                            <button className="build-button" onClick={()=>this.context.setNameInput(build.id)}>Rename</button>
                            <button className="build-button" onClick={()=>this.context.setModalType(deleteBuildModal)}>Delete</button>
                            <button className="build-button" onClick={()=>this.context.setModalType(addBuildItemModal)}>Add Item</button>
                        </div>
                        </Row>
                        <div className="row build-category-dashboard"></div>
                        <Row className="build-item-row">

                            {
                                build.items.map(item=>{
                                    const deleteItemModal= {title:"Are you sure to delete this Item?", type:"DELETEITEM", buildId:build.id, itemId:item.id};
                                    return(<Card key={item.id} 
                                        editItem={(defaultValues)=>{
                                            const editItemModal= {title:"Change as to Your Desired Values", type:"EDITITEM", buildId:build.id, itemId:item.id, data:defaultValues};
                                            this.context.setModalType(editItemModal);
                                        }} 
                                        deleteItem={(itemId)=>this.context.setModalType(deleteItemModal)} 
                                        item={item}/>)
                                })
                                
                            }

                        {/*<Transition
                            items={build.items} keys={item => item.id}
                            from={{ position: 'absolute',opacity:0, width:0}} 
                            enter={{ opacity: 1, width:300 }}
                            leave={{ opacity: 0, width:0 }}
                            config={{delay:100, duration:400}}
                        >
                            {item => props => {
                                const deleteItemModal= {title:"Are you sure to delete this Item?", type:"DELETEITEM", buildId:build.id, itemId:item.id};
                                return(<Card style={props} editItem={(id)=>this.context.editItem(id)} deleteItem={(itemId)=>this.context.setModalType(deleteItemModal)} item={item}/>)
                            }}

                        </Transition>*/}

                          
                            
                        </Row>
                      
                    </div>
                      
                   )})
               } 
            </Container>
            </div>
        );
    }


}

export default Builds;