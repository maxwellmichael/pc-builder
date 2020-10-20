import React, {Component} from 'react';
import axios from 'axios';

let BuildContext = React.createContext();

class BuildContextProvider extends Component{

    state = {
        builds:[],
        buildTitle:{
            nameInputHidden:true,
            BuildTitleInputValue:"",
            UnhideElementId: null,
        },

        modal:{
            title:"",
            hidden: true,
            type:"",
            buildId:"",
            itemId:null,
        }

    
    }

    /* Modal Functions */
    setModal = ()=>{
        const newState = {...this.state};
        newState.modal.hidden = !newState.modal.hidden
        this.setState({newState})
    }

    setModalType = (modal)=>{
        const newState = {...this.state};
        newState.modal.type = modal.type;
        newState.modal.title = modal.title;
        newState.modal.buildId = modal.buildId;
        newState.modal.itemId = modal.itemId ? modal.itemId : null;
        newState.modal.data = modal.data ? modal.data : null;
        newState.modal.hidden = !newState.modal.hidden;
        this.setState({newState})
    }

   


    /* New Build */
    setNewBuild = (name)=>{
        axios({
            method: 'put',
            url: `http://127.0.0.1:5000/build/`,
            data: {
              name: name
            }
          }).then(
              res=>{
                const newBuild = res.data;
                let newBuilds = [...this.state.builds];
                newBuilds.push(newBuild)
                this.setState({builds: newBuilds});
                this.setModal()
              });

    }


    /* Build Title Functions */ 
    setNameInput = (id)=>{
        const newState = {...this.state};
        newState.buildTitle.UnhideElementId = id;
        this.setState({newState})
    }

    changeTitleInputValue = (e)=>{
        const newState = {...this.state};
        newState.buildTitle.BuildTitleInputValue = e.target.value;
        this.setState({newState})
    }

    renameBuildTitle = (id, ref)=>{
        const newName = ref.current.value;
        axios({
            method: 'patch',
            url: `http://127.0.0.1:5000/build/`,
            data: {
              id: id,
              name: newName
            }
          }).then(
              res=>{
                const newBuild = res.data;
                let buildIndex = this.state.builds.findIndex(build => build.id === newBuild.id );
                let newBuilds = [...this.state.builds];
                newBuilds[buildIndex] = {...newBuilds[buildIndex], name:newBuild.name};
                this.setState({builds: newBuilds});
                this.setNameInput()
              });
    }

    deleteBuild = (id)=>{
        axios({
            method: 'delete',
            url: `http://127.0.0.1:5000/build/`,
            data: {
              id: id
            }
          }).then(
              res=>{
               this.updateBuilds()
               this.setModal()
              });

    }

    updateBuilds = ()=>{
        axios.get("http://127.0.0.1:5000/build/")
                .then(res=>{
                    this.setState((prevState, props)=>(
                        {builds:res.data}
                    ))
                }).catch(err=>{
                    console.log(err);
                })
    }

    //Items Functions

    editItemValues = (values, itemId)=>{
        
        axios({
            method: 'patch',
            url: `http://127.0.0.1:5000/item/${values.buildId}`,
            data: {
              id: itemId,
              name: values.partname,
              category: values.category,
              price: parseFloat(values.price),
              description: values.description,
              imageUrl: values.imageUrl,
              buildId: values.buildId
            },
            
          }).then(
              res=>{
                this.updateBuilds();
                this.setModal();
              });

    }

    setNewItem = (values)=>{
        axios({
            method: 'put',
            url: `http://127.0.0.1:5000/item/${values.buildId}`,
            data: {
              name: values.partname,
              category: values.category,
              price: parseFloat(values.price),
              description: values.description,
              imageUrl: values.imageUrl
            }
          }).then(
              res=>{
                this.updateBuilds();
                this.setModal();
              });

    }

    deleteItem = (buildId, itemId)=>{
        axios({
            method: 'delete',
            url: `http://127.0.0.1:5000/item/${buildId}`,
            data: {
              id: itemId
            }
          }).then(
              res=>{
               this.updateBuilds()
               this.setModal()
              })
              .catch(err=>console.log(err));

    }


    

   
    componentDidMount(){
       this.updateBuilds()
    }


    render(){
        const {builds, buildTitle, modal} = this.state;
        const { editItemValues, deleteItem, setNewItem, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild} = this;

        return( 
            <BuildContext.Provider value={{ editItemValues, deleteItem,setNewItem, builds, buildTitle, modal, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild}}>
                {this.props.children}
            </BuildContext.Provider>
        );
    }

}



export {BuildContext, BuildContextProvider};