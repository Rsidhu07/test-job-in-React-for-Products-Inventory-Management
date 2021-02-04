import React, { useEffect, useState } from 'react';
import './Products.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedIn, addProductsFromLS } from '../../store/actions';

const Products = (props) => {

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

    const [isSearching, setIsSearching] = useState(false);

    const [searchedProduct,setSearchedProduct] = useState([]);

    const [isFiltered,setIsFiltered] = useState(false);

    const [filteredProducts, setFilteredProducts] = useState([]);

    const inputSearchHandler =(e)=>{
        setIsSearching(true);

        const input = e.target.value.toLowerCase();
        const updatedSearchedPrducts = [...props.products];

        const productsFound = updatedSearchedPrducts.filter((product)=>{
            return product.name.toLowerCase() === input;
        });

        if(productsFound.length>0){
            setSearchedProduct(productsFound);
        }
        if(input.length < 1){

         setIsSearching(false);
        }
    };

    const cardDisplayAllProducts = props.products.map((product,index)=>{
        return (<div key= {index} className='card'>
                    <h3 className='h3-name'>Name: {product.name}</h3>
                    <p className ='p-description'>Description: {product.description}</p>
                    <h3 className='h3-price'>Price: {product.price}</h3>
                    <h3 className='h3-quantity'>Quantity: {product.quantity}</h3>
                    {product.imageUrl ? <img src={product.image} alt='loading Image'></img> : 
                    <h3>No Image specified</h3>}
                </div> );
    });

    const cardSearchedProduct = searchedProduct.map((product,index)=>{
        return (<div key= {index} className='card'>
                    <h3 className='h3-name'>Name: {product.name}</h3>
                    <p className ='p-description'>Description: {product.description}</p>
                    <h3 className='h3-price'>Price: {product.price}</h3>
                    <h3 className='h3-quantity'>Quantity: {product.quantity}</h3>
                    {product.imageUrl ? <img src={product.image} alt='loading Image'></img> : 
                    <h3>No Image specified</h3>}
                </div> );
                });

    const cardFilteredProducts = filteredProducts.map((product,index)=>{
        return (<div key= {index} className='card'>
                    <h3 className='h3-name'>Name: {product.name}</h3>
                    <p className ='p-description'>Description: {product.description}</p>
                    <h3 className='h3-price'>Price: {product.price}</h3>
                    <h3 className='h3-quantity'>Quantity: {product.quantity}</h3>
                    {product.imageUrl ? <img src={product.image} alt='loading Image'></img> : 
                    <h3>No Image specified</h3>}
                </div> );
    });

    const filterOptionSelectedHandler = (e)=>{
        setIsFiltered(true);
        const selectedOption = e.target.value;
        let selectedFilter;
        if(selectedOption==='by-price'){
            selectedFilter = 'price';
        } else {
            selectedFilter ='quantity'
        }

        console.log('selected option and selected filtered are===>>', selectedOption,selectedFilter);

        const sortedProductsBySelectedOption = [...props.products];
        sortedProductsBySelectedOption.sort((a,b)=>{
            return a[selectedFilter]-b[selectedFilter];
        })
        setFilteredProducts(sortedProductsBySelectedOption);

    };

    return (
        <div className='Products'>
            <h3>Products</h3>
            <div className='search-filter-div'>
                <input type='text' onChange={inputSearchHandler} placeholder='Search for users here'></input>
                <select className='filter-select' onChange={filterOptionSelectedHandler}>
                    <option value='by-price' >by price</option>
                    <option value='by-quantity'>by quantity</option>
                </select>
            </div>
            {props.products.length>0 ? 
            <div className='card-wrapper'>{ 

                isSearching ? cardSearchedProduct: 
                (isFiltered ? cardFilteredProducts : cardDisplayAllProducts)
            }
                
                </div>  : <h3>No products to show here!</h3>
            }
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
        onSetIsLoggedIn: ()=>{ dispatch(setIsLoggedIn())},
        onAddProductsFromLS: (updatedProducts)=>{dispatch(addProductsFromLS(updatedProducts))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Products));
