import React, {Component} from 'react';
import Modal from '../components/modal';
import FlashMessage from '../components/FlashMessage';
import {Row, Container} from 'react-bootstrap';
import Card from '../components/card';
import {MainContext} from '../contexts/MainContexts';
import BuildTitle from '../components/BuildTitle';
import {Transition} from 'react-spring/renderprops';
import Loader from '../components/loader';



class Builds extends Component{

    static contextType = MainContext;


    componentDidMount(){
        this.context.updateBuilds()
        this.context.setLoaderFalse()
        
    }
    componentWillUnmount(){
        this.context.setLoaderTrue()
    }

    render(){
        const newBuildModal = {title:"Create a New Build", type:"NEWBUILD", buildId:null}
        return(
            <React.Fragment>
            <FlashMessage />
            {this.context.loader.isLoading ? <Loader /> : null}
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
            </React.Fragment>
        );
    }


}

export default Builds;