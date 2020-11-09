import React from 'react';
import {MainContext} from '../contexts/MainContexts';
import {useForm} from 'react-hook-form';



export default function EditItemForm(props){

    const { handleSubmit, register, errors } = useForm({
        defaultValues:{
            partname:props.defaultValues.name,
            price:props.defaultValues.price,
            description:props.defaultValues.description,
            category:props.defaultValues.category,
            imageUrl:props.defaultValues.imageUrl,
        }
    });
    const onSubmit = (formValues) => {

        let newValues = {...formValues}
        newValues.buildId=props.buildId
        props.editItemValues(newValues);
        
    };

    return(
        <React.Fragment>

            <MainContext.Consumer>
                {context=>(
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-container">
                            <label className="label">Name</label>
                            <input className="input" placeholder="Part Name"
                                name="partname"
                                ref={register({
                                required: "Required",
                                pattern: {
                                    message: "Invalid Name"
                                }
                                })}
                            />
                        </div>
                        {errors.name && errors.name.message}

                        <div className="input-container">
                        <label className="label">Price</label>
                        <input
                            className="input"                           
                            name="price"
                            ref={register({
                            required: "Required",
                            pattern: {
                                value: /\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\.[0-9]{2})?$/,
                                message: "Invalid Price",
                            }
                            })}
                        />
                        </div>
                        {errors.price && errors.price.message}
                        
                        <div className="input-container">
                        <label className="label">Description</label>
                        <input
                            className="input"
                            name="description"
                            ref={register}
                        />
                        </div>
                        {errors.description && errors.description.message}
                        
                        <div className="input-container">
                        <label className="label">Image URL</label>
                        <input
                            className="input"
                            placeholder="The Link of The Product Image"
                            name="imageUrl"
                            ref={register}
                        />
                        </div>
                        {errors.imageUrl && errors.imageUrl.message}

                        <div className="input-container">
                        <label className="label">Category </label>
                        <select className="input" name="category" ref={register({
                            required: "Required",
                            })}>
                            <option name="Motherboard">Motherboard</option>
                            <option name="Cpu">CPU</option>
                            <option name="Gpu">Graphics Card</option>
                            <option name="Ssd">SSD</option>
                            <option name="Hdd">HDD</option>
                            <option name="Psu">PSU</option>
                            <option name="RAM">RAM</option>
                            <option name="Os">OS</option>
                            <option name="Cooler">Cooler</option>
                            <option name="Monitor">Monitor</option>
                            <option name="Keyboard">Keyboard</option>
                            <option name="Mouse">Mouse</option>
                            <option name="Earphone">Earphone</option>
                            <option name="Case">Case</option>
                        </select>
                        </div>
                        {errors.description && errors.description.message}
                        
        
                        <button className="submit" type="submit">Submit</button>
                    </form>
                )}
            </MainContext.Consumer>

        </React.Fragment>
    );
}