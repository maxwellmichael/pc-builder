import React from 'react';
import PartsBackground from '../images/backgrounds/parts-background.jpg';
import Case from '../images/icons/case.png';
import Cooler from '../images/icons/cooler.png';
import Cpu from '../images/icons/cpu.png';
import Gpu from '../images/icons/gpu.png';
import Hdd from '../images/icons/hdd.png';
import Keyboard from '../images/icons/keyboard.png';
import Motherboard from '../images/icons/motherboard.png';
import Os from '../images/icons/os.png';
import Psu from '../images/icons/psu.png';
import Ram from '../images/icons/ram.png';
import Ssd from '../images/icons/ssd.png';

const setCategoryIcon = (category)=>{
    if(category==="Case"){
        return Case;
    }
    else if(category==="Cooler"){
        return Cooler;
    }
    else if(category==="Cpu"){
        return Cpu;
    }
    else if(category==="Gpu"){
        return Gpu;
    }
    else if(category==="Hdd"){
        return Hdd;
    }
    else if(category==="Keyboard"){
        return Keyboard;
    }
    else if(category==="Motherboard"){
        return Motherboard;
    }
    else if(category==="Os"){
        return Os;
    }
    else if(category==="Psu"){
        return Psu;
    }
    else if(category==="Ram"){
        return Ram;
    }
    else if(category==="Ssd"){
        return Ssd;
    }
    else{
        return Case
    }
}


export default (props)=>{



    return(        
           
                <div className="card_container">
                    <div className="card" style={{backgroundImage:`url(${PartsBackground})`}}>
                        <div className="card_layer"></div>

                        <div className="card_manage_icons">
                            <button onClick={()=>props.deleteItem()} className="icon"><i className="fas fa-trash-alt"></i></button>
                            <button onClick={()=>props.editItem(props.item)} className="icon"><i className="far fa-edit"></i></button>
                            <button className="icon"><i className="fas fa-info"></i></button>
                        </div>

                        <div style={{backgroundImage:`url(${setCategoryIcon(props.item.category)})`}} className="card_category_icon"></div>
                        
                        <div className="imgBx">
                            <img alt={props.item.name} className="image" src={props.item.imageUrl} />
                        </div>
                    
                    <div className="contentBx">
                        <h2>{props.item.name}</h2>
                        <div className="line"></div>
                        
                        <div className="category">
                            <h3>Category :</h3>
                            <p>{props.item.category}</p>
                        </div>

                        <div className="price">
                            <h3>Price :</h3>
                            <p>₹ {props.item.price}</p>
                        </div>
                        <div className="ratings">
                            <h3>Ratings :</h3>
                            <p><span className="badge">3.5</span>(1.3k)</p>
                        </div>
                        <div className="sites">
                            <a href="/builds">Amazon</a>
                            <a href="/builds">Kharidiye</a>
                        </div>
                        
                    </div>
                    </div>
                </div>
            
    );
}