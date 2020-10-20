import React from 'react';
import {BuildContext} from '../contexts/BuildContexts';
import {useForm} from 'react-hook-form';



export default function AddItemForm(props){

    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (formValues) => {

        let newValues = {...formValues}
        newValues.buildId=props.buildId
        props.setNewItem(newValues);
        
    };

    return(
        <React.Fragment>

            <BuildContext.Consumer>
                {context=>(
                    <form className="add-item-form" onSubmit={handleSubmit(onSubmit)}>
                        <input className="add-item-form-input" placeholder="Part Name"
                            name="partname"
                            ref={register({
                            required: "Required",
                            pattern: {
                                message: "Invalid Name"
                            }
                            })}
                        />
                        {errors.name && errors.name.message}
        
                        <input
                            className="add-item-form-input"
                            placeholder="Price"
                            name="price"
                            ref={register({
                            required: "Required",
                            pattern: {
                                value: /\$?(?!0.00)(([0-9]{1,3},([0-9]{3},)*)[0-9]{3}|[0-9]{1,3})(\.[0-9]{2})?$/,
                                message: "Invalid Price",
                            }
                            })}
                        />
                        {errors.price && errors.price.message}
        
                        <input
                            className="add-item-form-input"
                            placeholder="Any Specific Information...."
                            name="description"
                            ref={register}
                        />
                        {errors.description && errors.description.message}
        
                        <input
                            className="add-item-form-input"
                            placeholder="The Link of The Product Image"
                            name="imageUrl"
                            ref={register}
                        />
                        {errors.imageUrl && errors.imageUrl.message}
        
                        <select className="add-item-form-input" name="category" ref={register({
                            required: "Required",
                            })}>
                            <option name="Motherboard">Motherboard</option>
                            <option name="Cpu">CPU</option>
                            <option name="Gpu">Graphics Card</option>
                            <option name="Ssd">SSD</option>
                            <option name="Hdd">HDD</option>
                            <option name="Psu">PSU</option>
                            <option name="Os">OS</option>
                            <option name="Cooler">Cooler</option>
                            <option name="Monitor">Monitor</option>
                            <option name="Keyboard">Keyboard</option>
                            <option name="Mouse">Mouse</option>
                            <option name="Earphone">Earphone</option>
                            <option name="Case">Case</option>
                        </select>
                        {errors.description && errors.description.message}
                        
        
                        <button className="add-item-form-submit" type="submit">Submit</button>
                    </form>
                )}
            </BuildContext.Consumer>

        </React.Fragment>
    );
}