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
    else if(category==="CPU"){
        return Cpu;
    }
    else if(category==="Graphics Card"){
        return Gpu;
    }
    else if(category==="HDD"){
        return Hdd;
    }
    else if(category==="Keyboard"){
        return Keyboard;
    }
    else if(category==="Motherboard"){
        return Motherboard;
    }
    else if(category==="OS"){
        return Os;
    }
    else if(category==="PSU"){
        return Psu;
    }
    else if(category==="RAM"){
        return Ram;
    }
    else if(category==="SSD"){
        return Ssd;
    }
    else{
        return Case
    }
}


export default (props)=>{

    const Img = "https://images-na.ssl-images-amazon.com/images/I/A1IbPGy732L._SY450_.jpg";

    return(     
        <div className="item">
            <div style={{backgroundImage:`url(${setCategoryIcon(props.item.category)})`}} className="category-icon"></div>
            <div className="photo" style={{backgroundImage:`url("${props.item.imageUrl}")`}}></div>
            <div className="content">
                <h2 className="title">{props.item.name}</h2>
                <h4 className="category">{props.item.category}</h4>
                <h1 className="price">₹{props.item.price}</h1>
                <div className="ratings">
                    <p><span className="badge">3.5</span>(1.3k)</p>
                </div>
                <p className="description">{props.item.description}</p>
                <div className="icons">
                    <button onClick={()=>props.deleteItem()} className="icon"><i className="fas fa-trash-alt"></i></button>
                    <button onClick={()=>props.editItem(props.item)} className="icon"><i className="far fa-edit"></i></button>
                    <button className="icon"><i className="fas fa-expand"></i></button>
                </div>
            </div>
        </div>     
    );
}