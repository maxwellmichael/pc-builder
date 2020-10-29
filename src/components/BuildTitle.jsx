import React, {Component} from 'react';
import {Row, Button, ButtonGroup} from 'react-bootstrap';
import {MainContext} from '../contexts/MainContexts';





export default class Rename extends Component{

    static contextType = MainContext;
    
   

    build_rename_inputRef =  React.createRef();


    showRenameInput = ()=>{
        this.props.setNameInput()
        this.build_rename_inputRef.current.focus();
    }

    setTitleClass = ()=>{
        if(this.props.build.id===this.context.buildTitle.UnhideElementId){
            return("build-title-row-shown");
        }
        else{
            return("build-title-row-hidden");
        }
    }



    render(){
        return(
            <Row className={this.setTitleClass()}>
                <h1 className="build-title">{this.props.build.name}</h1>

                <input placeholder={this.props.build.name} value={this.context.buildTitle.BuildTitleInputValue} onChange={e=>this.context.changeTitleInputValue(e)} ref={this.build_rename_inputRef} type="text" className="build-rename-input"/>
                
                <ButtonGroup aria-label="build-button-group">
                    <Button className="build-row-button" variant="success" onClick={()=>this.context.renameBuildTitle(this.props.build.id, this.build_rename_inputRef)}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                    </Button>
                    <Button className="build-row-button" variant="danger" onClick={()=>this.context.setNameInput(null)}>
                        <i className="fa fa-close" aria-hidden="true"></i>
                    </Button>
                </ButtonGroup>
            </Row>

        )
    }

}