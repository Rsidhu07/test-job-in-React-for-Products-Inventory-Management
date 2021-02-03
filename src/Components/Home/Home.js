import React, { useState } from 'react';
import './Home.css';
import convertFormDataToArray from '../../common/convertFormDataToArray';
import Input from '../UI/Input/Input';
import updateFormDataInLocalState from '../../common/updateFormDataInLocalState';

const Home = () => {

    const initialState = {
        formData:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
    
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Registered Email '
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
        <div className='Home'>
            <h3>Login to add or view products!</h3>
            <form className='login-form'>
                {convertFormDataToArray(formValues.formData).map(formElement => {
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
                })}
                <button>Login</button>
            </form>

        </div>
    );
}

export default Home;
