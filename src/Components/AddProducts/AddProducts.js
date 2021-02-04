import React, { useState, useEffect } from 'react';
import './AddProducts.css';
import convertFormDataToArray from '../../common/convertFormDataToArray';
import Input from '../UI/Input/Input';
import updateFormDataInLocalState from '../../common/updateFormDataInLocalState';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProducts, setIsLoggedIn, addProductsFromLS } from '../../store/actions';

const AddProducts = (props) => {

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
                    required: false,
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
                    isNumber: true
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
                    isNumber: true
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
                    required: false,
                },
                valid: false,
                touched: false
            },
        },
        isValidForm: false
    };

    const [formValues, setFormValues] = useState(initialState);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(
        JSON.parse(localStorage.getItem('isUserLoggedIn'))|| false);


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

    const addProductsHandler =(e) => {   
        e.preventDefault();
        const {formData} = formValues;
        const name = formData.name.value;
        const description =formData.description.value;
        const price = formData.price.value;
        const quantity = formData.quantity.value;
        const imageUrl = formData.image.value;

        const updatedProduct = {
            name,
            description,
            price: JSON.parse(price),
            quantity:JSON.parse(quantity),
            imageUrl
        };
        const productsInLS = JSON.parse(localStorage.getItem('products'));
        if(productsInLS){
            productsInLS.push(updatedProduct);
            localStorage.setItem('products', JSON.stringify(productsInLS));
            props.onAddProductsFromLS(productsInLS);

        } else{
            const newProducts = [...props.products];
            newProducts.push(updatedProduct);
            localStorage.setItem('products', JSON.stringify(newProducts));
            props.onAddProducts(updatedProduct);

        }
        
        props.history.push('/products');
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
                        shouldValidate={validation}
                        valid={valid}
                        invalid={!valid}
                        touched={touched}
                        name={id}
                        changed={e => inputChangeHandler(e,id,formValues.formData)}
                        />
                    );
                })
                }
                <button disabled={!formValues.isValidForm} onClick={addProductsHandler}>Save Product</button>
            </form>
        </div>
    );
};

const mapStateToProps =(state)=> {
    return {
        loggedIn: state.loggedIn,
        products: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddProducts: (updatedProduct)=>{ dispatch(addProducts(updatedProduct))},
        onSetIsLoggedIn: ()=>{ dispatch( setIsLoggedIn())},
        onAddProductsFromLS: (updatedProducts)=>{dispatch(addProductsFromLS(updatedProducts))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddProducts));
