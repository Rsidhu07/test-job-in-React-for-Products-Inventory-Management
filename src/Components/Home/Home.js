import React, { useState, useEffect } from 'react';
import './Home.css';
import convertFormDataToArray from '../../common/convertFormDataToArray';
import Input from '../UI/Input/Input';
import updateFormDataInLocalState from '../../common/updateFormDataInLocalState';
import { connect } from 'react-redux';
import { setIsLoggedIn, addProductsFromLS } from '../../store/actions';
import { withRouter } from 'react-router-dom';

const Home = (props) => {

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

    useEffect(() => {

        const isUserLogged = JSON.parse(localStorage.getItem('isUserLoggedIn'));
        const productsInLS = JSON.parse(localStorage.getItem('products'));

        if(!isUserLogged){
            props.history.push('/');
        } else {
            props.onSetIsLoggedIn();
            if(productsInLS){
                props.onAddProductsFromLS(productsInLS);
            }
        }
    }, []);

    const inputChangeHandler = (event, id, formData)=>{
        const {updatedFormData,formIsValid}= updateFormDataInLocalState(event,id,formData);

        setFormValues({
            ...formValues,
            formData:updatedFormData,
            isValidForm: formIsValid
        });
    };

    const onUserLogin = (e) =>{ 
        e.preventDefault();
        console.log('props while clicking the button are ==>>', props);
        const {name,password,email} = props.userDetails;

        if(name === formValues.formData.name.value && password === formValues.formData.password.value && 
            email === formValues.formData.email.value){
                props.onSetIsLoggedIn();
                localStorage.setItem('isUserLoggedIn', true);
                props.history.push('/products');
            } else {
                alert('Incorrect details entered');
            }
    };


    const form = (
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
                valid={valid}
                invalid={!valid}
                touched={touched}
                shouldValidate={validation}
                name={id}
                changed={e => inputChangeHandler(e,id,formValues.formData)}
                />
            );
        })}
        <button onClick={onUserLogin}>Login</button>
    </form>
    )


    return (
        <div className='Home'>
            {props.loggedIn ? <h3>You are logged In!</h3> : form }
        </div>
    );
}

const mapStateToProps =(state)=> {
    return {
        userDetails: state.userDetails,
        loggedIn: state.loggedIn
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetIsLoggedIn: ()=>{ dispatch( setIsLoggedIn())},
        onAddProductsFromLS: (updatedProducts)=>{dispatch(addProductsFromLS(updatedProducts))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
