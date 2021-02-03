import React, { useState } from 'react';
import './AddProducts.css';
import convertFormDataToArray from '../../common/convertFormDataToArray';
import Input from '../UI/Input/Input';
import updateFormDataInLocalState from '../../common/updateFormDataInLocalState';

const AddProducts = () => {

    const initialState = {
        formData:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Description'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
    
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Price '
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            quantity: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product Quantity '
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Product image url here '
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false
            },
        },
        isValidForm: false
    };

    const [formValues, setFormValues] = useState(initialState);

    const inputChangeHandler = (event, id, formData)=>{
        const {updatedFormData,formIsValid}= updateFormDataInLocalState(event,id,formData);

        setFormValues({
            ...formValues,
            formData:updatedFormData,
            isValidForm: formIsValid
        });
    };

    return (
        <div className='AddProducts'>
            <form className='add-products-form'>
                {
                convertFormDataToArray(formValues.formData).map(formElement=>{
                    const {id} = formElement;
                    const { elementType,
                            elementConfig,
                            value,
                            validation,
                            valid,
                            touched
                        } = formElement.config;

                    return (
                        <Input
                        key={id}
                        elementType={elementType}
                        elementConfig={elementConfig}
                        value={value}
                        validation={validation}
                        valid={valid}
                        invalid={!valid}
                        touched={touched}
                        name={id}
                        changed={e => inputChangeHandler(e,id,formValues.formData)}
                        />
                    );
                })
                }
                <button>Save Product</button>
            </form>
        </div>
    );
}

export default AddProducts;
