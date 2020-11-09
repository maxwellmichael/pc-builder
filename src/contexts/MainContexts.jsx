import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


let MainContext = React.createContext();

class MainContextProvider extends Component{

   
    state = {
        apiUrl:"http://pcbuilder.com:5000",
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
        },

        authForm:{
          RightPanelOverlayActive: true,
        },

        authMobileForm:{
          isLogin:false
        },

        isAuthorized:false,
         
        
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
    this.setLoaderTrue()
    const newName = ref.current.value;
    axios({
        method: 'patch',
        url: this.state.apiUrl+`/build/`,
        withCredentials: true,
        data: {
          id: id,
          name: newName
        },
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
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
        }})
        .catch(err=>{
          this.setLoaderFalse()
         
        })
}



/**************** Build Functions ***************/
setNewBuild = (name)=>{
  this.setModal()
  this.setLoaderTrue()
  axios({
      method: 'put',
      url: this.state.apiUrl+`/build/`,
      data: {
        name: name
      },
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        //This Header is used to Protect the request from CSRF Attacks
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
       
      }

    }).then(
        res=>{
          const newBuild = res.data;
          let newBuilds = [...this.state.builds];
          newBuilds.push(newBuild)
          this.setState({builds: newBuilds});
          this.setLoaderFalse()
        })
      .catch(err=>{
        console.log("err", err)
        this.setLoaderFalse()
        
      })

}


deleteBuild = (id)=>{
   
    this.setModal()
    this.setLoaderTrue()
    axios({
        method: 'delete',
        url: this.state.apiUrl+`/build/`,
        withCredentials: true,
        data: {
          id: id
        },
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
        }
      }).then(
          res=>{
            //Removes the Build from state
            if(res.status===200){
              let Builds = [...this.state.builds];
              let newBuilds = Builds.filter(build=>build.id != id)
              this.setState({builds:newBuilds})
              this.setLoaderFalse()
            }
           
          })
        .catch(err=>{
          this.setLoaderFalse()
        })

} 

updateBuilds = ()=>{
    
    if(Cookies.get('csrf_access_token')){
      this.setLoaderTrue()
      axios({
        method: 'get',
        url: this.state.apiUrl+`/build/`, 
        withCredentials: true,
        headers:{
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': '*',
          'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
        }
      })
        .then(res=>{
          this.setLoaderFalse()
            if(res.status===200){
                this.setState({builds:res.data})
              }
        })
        .catch(err=>{
              this.setLoaderFalse()
        })
        
      }
      else{
        const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Missing CSRF Tokens", buttonText: "Okay"}
        this.setFlashType(loginRetryFlash)
        this.setFlash()
      }

    
}




//******************** Items Functions ***********************
editItemValues = (values, itemId)=>{
  this.setModal();
  this.setLoaderTrue();
  axios({
      method: 'patch',
      url: this.state.apiUrl+`/item/${values.buildId}`,
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
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
      }
      
    }).then(
        res=>{
          const newItem = res.data
          let newBuilds = [...this.state.builds];
          let BuildIndex = newBuilds.findIndex(build=>build.id===values.buildId);
          let itemIndex = newBuilds[BuildIndex].items.findIndex(item=>item.id===itemId)
          newBuilds[BuildIndex].items[itemIndex].buildId=newItem.buildId;
          newBuilds[BuildIndex].items[itemIndex].category=newItem.category;
          newBuilds[BuildIndex].items[itemIndex].description=newItem.description;
          newBuilds[BuildIndex].items[itemIndex].imageUrl=newItem.imageUrl;
          newBuilds[BuildIndex].items[itemIndex].name=newItem.name;
          newBuilds[BuildIndex].items[itemIndex].price=newItem.price;
          newBuilds[BuildIndex].items[itemIndex].starRating=newItem.starRating;
          newBuilds[BuildIndex].items[itemIndex].totalRating=newItem.totalRating;
          this.setState({builds: newBuilds});
          this.setLoaderFalse();
        })
      .catch(err=>{
          this.setLoaderFalse()
      })

}

setNewItem = (values)=>{
  this.setModal();
  this.setLoaderTrue()
  axios({
      method: 'put',
      url: this.state.apiUrl+`/item/${values.buildId}`,
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
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
      }
    }).then(
        res=>{  
          let newBuilds = [...this.state.builds];
          let BuildIndex = newBuilds.findIndex(build=>build.id===values.buildId);
          newBuilds[BuildIndex].items.push(res.data);
          this.setState({builds: newBuilds});
          this.setLoaderFalse()
        })
      .catch(err=>{
        this.setLoaderFalse()
      })

}

deleteItem = (buildId, itemId)=>{
this.setModal()
this.setLoaderTrue()
  axios({
      method: 'delete',
      url: this.state.apiUrl+`/item/${buildId}`,
      withCredentials: true,
      data: {
        id: itemId
      },
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
      }
    }).then(
        res=>{
          // Removes the Item From the Build
          let newBuilds = [...this.state.builds];
          let BuildIndex = newBuilds.findIndex(build=>build.id===buildId);
          const newItems = newBuilds[BuildIndex].items.filter(item=>item.id != itemId)
          newBuilds[BuildIndex].items = newItems;
          this.setState({builds: newBuilds})

          this.setLoaderFalse()
        })
        .catch(err=>{
          this.setLoaderFalse()
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
      url: this.state.apiUrl+`/userlogout`,
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Methods': '*',
        'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
      }
    })
    .then(resp=>{
      if(resp.status===200){
        Cookies.set('isAuthenticated', false)
        const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
          this.setFlashType(loginRetryFlash)
          this.setFlash()
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }



  handleLoginSubmit = (event, email, password)=>{
    event.preventDefault();  
    this.setLoaderTrue()
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    //Default Flash Messages
    const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue", buttonText: "Login"}
    const loginSuccessFlash = {title:"Login", func:"LOGIN_SUCCESS", typeSuccess:true, message: "Successfully Logged In!..", buttonText: "Continue"}


    axios({
        method: 'post',
        url: this.state.apiUrl+'/userlogin',
        data: bodyFormData,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
        },
        })
    .then(res=>{
        const csrf_access_token = Cookies.get('csrf_access_token');
        if(res.status==200 && csrf_access_token){
          Cookies.set('isAuthenticated', true, { expires: 7 })
          this.setFlashShown(loginSuccessFlash)
        }
        // If Response is 200 but didnt receive CSRF Tokens Retry Login
        else{
          const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "You Have Logged in From a Different Domain", buttonText: "Okay"}
          this.setFlashShown(loginRetryFlash)
        }
    })
    .catch(err=>{
      /* If The Error contains a Response*/
      if(err.response){
        this.setFlashType(loginRetryFlash)
        this.setFlash()
      }
      /* If the Error Does not Contain a Response(Mainly Network Error) */
      else{
        const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Cant Connect To Network", buttonText: "Okay"}
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

   setFlashHidden=()=>{
    const newState = {...this.state};
    newState.flashMessage.hidden = true;
    this.setState({newState})
   }

   setFlashShown=(flash)=>{
    const newState = {...this.state};
    newState.flashMessage.typeSuccess = flash.typeSuccess;
    newState.flashMessage.title = flash.title;
    newState.flashMessage.message = flash.message;
    newState.flashMessage.buttonText = flash.buttonText;
    newState.flashMessage.func = flash.func;
    newState.flashMessage.hidden = false;
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

      

        axios.interceptors.response.use(null ,
            err => {
              const originalRequest = err.config;
              //IF The Response is Unauthorized
              // Refresh Token Has Expired
              // User Must Login
              if(err.response.status === 401 && originalRequest.url === this.state.apiUrl+'/refreshaccesstoken'){
                  const loginRetryFlash = {title:"Login", func:"LOGIN_RETRY", typeSuccess:false, message: "Please Login to Continue Refresh", buttonText: "Okay"}
                  this.setFlashType(loginRetryFlash)
                  this.setFlash()
              }

              // Access Token Has Expired 
              //Refreshes the Access Token
              else if(err.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true;
                return axios({
                    method: 'get',
                    url: this.state.apiUrl+'/refreshaccesstoken',
                    withCredentials: true,
                    headers:{
                      'Access-Control-Allow-Credentials': true,
                      'Access-Control-Allow-Methods': '*',
                      'X-CSRF-TOKEN': Cookies.get('csrf_access_token'),
                    }
                })
                .then(res=>{
                  if(res.status===200){
                    originalRequest.headers['X-CSRF-TOKEN'] = Cookies.get('csrf_access_token');
                    return axios(originalRequest);
                  }
                })
              }
              return Promise.reject(err)
            }
            
        );

        const {authMobileForm, isAuthorized, flashMessage, builds, buildTitle, modal, loader, authForm} = this.state;
        const {unsetAuthMobileLogin, setAuthMobileLogin, setLogout, setFlash, setFlashHidden, setFlashShown, setFlashType, updateBuilds, setAccessToken, RefreshAccessToken, handleLoginSubmit, setRightPanelOverlayActive, setLoaderFalse, setLoaderTrue, setLoader, editItemValues, deleteItem, setNewItem, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild} = this;

        return( 
            <MainContext.Provider value={{unsetAuthMobileLogin, setAuthMobileLogin, authMobileForm, isAuthorized, setLogout, setFlashHidden, setFlashShown, setFlash, setFlashType, flashMessage, updateBuilds, setAccessToken, RefreshAccessToken, handleLoginSubmit, setRightPanelOverlayActive, authForm, setLoaderFalse, setLoaderTrue, setLoader, loader, editItemValues, deleteItem,setNewItem, builds, buildTitle, modal, setNameInput, changeTitleInputValue, renameBuildTitle, setModal, setModalType, setNewBuild, deleteBuild}}>
                {this.props.children}
            </MainContext.Provider>
        );
    }

}



export {MainContext, MainContextProvider};