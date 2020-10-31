import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


let MainContext = React.createContext();

class MainContextProvider extends Component{

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
        },
        flashMessage:{
          typeSuccess: true,
          hidden: true,
          message:"",
          buttonText:"",
          func:"",
        },

        loader:{
          isLoading: true,
          message: "Fetching The Data.....",
        },

        tokens:{
          access_token:null,
          csrf_access_token:null,
          csrf_refresh_token:null,

        },

        authForm:{
          RightPanelOverlayActive: true,
        },

        authMobileForm:{
          isLogin:false
        },

        isAuthorized:false,
         
        
    }

  componentDidMount(){
      this.setCSRFTokens()
      if(this.state.tokens.csrf_access_token){
        this.setState({isAuthorized:true})
      }

   }

  /********* Auth Mobile Form Functions *********/

  setAuthMobileLogin = ()=>{
    const newState = {...this.state};
    newState.authMobileForm.isLogin = true;
    this.setState({newState})
  }

  unsetAuthMobileLogin = ()=>{
    const newState = {...this.state};
    newState.authMobileForm.isLogin = false;
    this.setState({newState})
  }



/* ***************Build Title Functions ********************/ 
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
    this.setLoader(`Renaming to ${ref.current.value}`)
    const newName = ref.current.value;
    console.log("new Name", newName);
    axios({
        method: 'patch',
        url: `https://pc-builder-api.herokuapp.com/build/`,
        withCredentials: true,
        data: {
          id: id,
          name: newName
        },
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'csrf_access_token': this.state.tokens.csrf_access_token,
          'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
        }
      }).then(res=>{

          if(res.status===200){
            const newBuild = res.data;
            let buildIndex = this.state.builds.findIndex(build => build.id === newBuild.id );
            let newBuilds = [...this.state.builds];
            newBuilds[buildIndex] = {...newBuilds[buildIndex], name:newBuild.name};
            console.log(newBuilds)
            this.setState({builds: newBuilds});
            this.setNameInput()
            this.setLoader()
            

          }
          else if(res.status===401){
            this.setCSRFTokens();
          }
          })
        .catch(err=>{
            this.setCSRFTokens();
        })
}



/**************** Build Functions ***************/
setNewBuild = (name)=>{
  this.setModal()
  this.setLoader("Creating New Build....")
  axios({
      method: 'put',
      url: `https://pc-builder-api.herokuapp.com/build/`,
      
      data: {
        name: name
      },
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'csrf_access_token': Cookies.get('csrf_access_token'),
        'csrf_refresh_token': Cookies.get('csrf_refresh_token'),
      }

    }).then(
        res=>{
          console.log("Put", res)
          const newBuild = res.data;
          let newBuilds = [...this.state.builds];
          newBuilds.push(newBuild)
          this.setState({builds: newBuilds});
          this.setLoader()
        })
      .catch(err=>{
        console.log(err)
      })

}


deleteBuild = (id)=>{
    this.setModal()
    this.setLoaderTrue()
    axios({
        method: 'delete',
        url: `https://pc-builder-api.herokuapp.com/build/`,
        withCredentials: true,
        data: {
          id: id
        },
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'csrf_access_token': this.state.tokens.csrf_access_token,
          'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
        }
      }).then(
          res=>{
           this.updateBuilds()
           this.setLoaderFalse()
          });

} 

updateBuilds = ()=>{
    const csrf_access_token = Cookies.get('csrf_access_token');
    if(csrf_access_token){
      this.setLoaderTrue()
      axios({
        method: 'get',
        url: `https://pc-builder-api.herokuapp.com/build/`, 
        withCredentials: true,
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'csrf_access_token': this.state.tokens.csrf_access_token,
          'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
        }
      })
        .then(res=>{
          console.log(res.status)
            if(res.status===200){
                this.setState({builds:res.data})
                this.setLoaderFalse()
                this.setCSRFTokens() 
              }
                  
            else if(res.status===401){
              this.RefreshAccessToken();
              this.setCSRFTokens() 
              this.updateBuilds();
            }


              })
        .catch(err=>{
              console.log(err);
              this.RefreshAccessToken()
              this.setCSRFTokens() 
              })
        
      }

    
}




//******************** Items Functions ***********************
editItemValues = (values, itemId)=>{
  this.setModal();
  this.setLoader("Changing Values....");
  axios({
      method: 'patch',
      url: `https://pc-builder-api.herokuapp.com/item/${values.buildId}`,
      withCredentials: true,
      data: {
        id: itemId,
        name: values.partname,
        category: values.category,
        price: parseFloat(values.price),
        description: values.description,
        imageUrl: values.imageUrl,
        buildId: values.buildId
      },
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'csrf_access_token': this.state.tokens.csrf_access_token,
        'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
      }
      
    }).then(
        res=>{
          this.updateBuilds();
          this.setLoader();
        });

}

setNewItem = (values)=>{
  this.setModal();
  this.setLoader(`Adding ${values.partname}...`)
  axios({
      method: 'put',
      url: `https://pc-builder-api.herokuapp.com/item/${values.buildId}`,
      withCredentials: true,
      data: {
        name: values.partname,
        category: values.category,
        price: parseFloat(values.price),
        description: values.description,
        imageUrl: values.imageUrl
      },
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'csrf_access_token': this.state.tokens.csrf_access_token,
        'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
      }
    }).then(
        res=>{
          this.updateBuilds();
          this.setLoader()
        });

}

deleteItem = (buildId, itemId)=>{
this.setModal()
this.setLoader('Deleting Component....')
  axios({
      method: 'delete',
      url: `https://pc-builder-api.herokuapp.com/item/${buildId}`,
      withCredentials: true,
      data: {
        id: itemId
      },
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'csrf_access_token': this.state.tokens.csrf_access_token,
        'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
      }
    }).then(
        res=>{
         this.updateBuilds()
         this.setLoader()
        })
        .catch(err=>console.log(err));

}

  




  /********************** Token Functions ****************/
  setCSRFTokens=()=>{
      const csrf_access_token = Cookies.get('csrf_access_token');
      const csrf_refresh_token = Cookies.get('csrf_refresh_token');
      let newTokens = this.state.tokens
      newTokens.csrf_refresh_token = csrf_refresh_token;
      newTokens.csrf_access_token = csrf_access_token
      this.setState({tokens:newTokens})
  }

  RefreshAccessToken=()=>{
    axios({
        method: 'get',
        url: 'https://pc-builder-api.herokuapp.com/refreshaccesstoken',
        withCredentials: true,
        headers:{
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': '*',
            'csrf_access_token': this.state.tokens.csrf_access_token,
            'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
          }
        }).then(res=>{
          if(res.status==200){
            this.setCSRFTokens()
            this.updateBuilds()
          }
          
          else if(res.status==401){
            this.setState({isAuthorized:false})
            const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
            this.setFlashType(loginRetryFlash)
            this.setFlash()
          }
          
        })
        .catch(err=>{
          console.log(err)
          this.setState({isAuthorized:false})
          const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
          this.setFlashType(loginRetryFlash)
          this.setFlash()
        })
  }





  





  /******************* Auth Form Functions ****************/
  setRightPanelOverlayActive=()=>{
      let newState = {...this.state}
      newState.authForm.RightPanelOverlayActive = !newState.authForm.RightPanelOverlayActive
      this.setState(newState);
  }


  setLogout = ()=>{
    axios({
      method: 'delete',
      url: `https://pc-builder-api.herokuapp.com/userlogout`,
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'csrf_access_token': this.state.tokens.csrf_access_token,
        'csrf_refresh_token': this.state.tokens.csrf_refresh_token,
      }
    })
    .then(resp=>{
      if(resp.status===200){
        Cookies.set('isAuthenticated', false, { expires: 1 });
        const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
          this.setFlashType(loginRetryFlash)
          this.setFlash()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }



  handleLoginSubmit = async (event, email, password)=>{
    event.preventDefault();
    
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    axios({
        method: 'post',
        url: 'https://pc-builder-api.herokuapp.com/userlogin',
        data: bodyFormData,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
        },
        })
    .then(res=>{
        
        console.log("RESPONSE", res)

        if(res.status==200){
          Cookies.set('isAuthenticated', true, { expires: 1 });
          const loginSuccessFlash = {title:"Login", func:"LOGIN_SUCCESS", typeSuccess:true, message: "Successfully Logged In!..", buttonText: "Continue"}
          this.setFlashType(loginSuccessFlash)
          this.setFlash()
        }
    })
    .catch(err=>{
      console.log("LOGIN_ERROR", err)
        if(err.response.status===401){
          this.RefreshAccessToken()
        }
        else if(err.response.status===404){
          const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
          this.setFlashType(loginRetryFlash)
          this.setFlash()
        }
        
    })
  }





    /* Loader Functions */
    setLoader = (message)=>{
        const newState = {...this.state};
        newState.loader.isLoading = !newState.loader.isLoading;
        newState.loader.message = message;
        this.setState({newState})
    }
    setLoaderTrue = ()=>{
      const newState = {...this.state};
      newState.loader.isLoading = true
      this.setState({newState})
    }
    setLoaderFalse = ()=>{
      const newState = {...this.state};
      newState.loader.isLoading = false
      this.setState({newState})
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

   

   /* Flash Messages Function */

   setFlash=()=>{
    const newState = {...this.state};
    newState.flashMessage.hidden = !newState.flashMessage.hidden;
    this.setState({newState})
   }

   setFlashType=(flash)=>{
      const newState = {...this.state};
      newState.flashMessage.typeSuccess = flash.typeSuccess;
      newState.flashMessage.title = flash.title;
      newState.flashMessage.message = flash.message;
      newState.flashMessage.buttonText = flash.buttonText;
      newState.flashMessage.func = flash.func;

      this.setState({newState})
   }


    


    

    

    render(){
        const {authMobileForm, isAuthorized, flashMessage, builds, buildTitle, modal, loader, authForm} = this.state;
        const {unsetAuthMobileLogin, setAuthMobileLogin, setLogout, setFlash, setFlashType, updateBuilds, setAccessToken, RefreshAccessToken, handleLoginSubmit, setRightPanelOverlayActive, setLoaderFalse, setLoaderTrue, setLoader, editItemValues, deleteItem, setNewItem, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild} = this;

        return( 
            <MainContext.Provider value={{unsetAuthMobileLogin, setAuthMobileLogin, authMobileForm, isAuthorized, setLogout, setFlash, setFlashType, flashMessage, updateBuilds, setAccessToken, RefreshAccessToken, handleLoginSubmit, setRightPanelOverlayActive, authForm, setLoaderFalse, setLoaderTrue, setLoader, loader, editItemValues, deleteItem,setNewItem, builds, buildTitle, modal, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild}}>
                {this.props.children}
            </MainContext.Provider>
        );
    }

}



export {MainContext, MainContextProvider};