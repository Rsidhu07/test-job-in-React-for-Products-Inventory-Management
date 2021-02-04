export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
export const SET_IS_LOGGED_OUT = 'SET_IS_LOGGED_OUT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS_FROM_LS = 'ADD_PRODUCTS_FROM_LS';
export const LOG_OUT_CLEAR_PRODUCTS = 'LOG_OUT_CLEAR_PRODUCTS';

export const logOutClearProducts = ()=>{
    return {
        type:LOG_OUT_CLEAR_PRODUCTS
    };
};

export const addProductsFromLS = (updatedProducts) =>{
    return {
        type: ADD_PRODUCTS_FROM_LS,
        payload: updatedProducts
    };
};


export const addProducts = (updatedProduct) => {

    return {
        type: ADD_PRODUCT,
        payload: updatedProduct
    };
};

export const setIsLoggedOut = () => {
    return {
        type:SET_IS_LOGGED_OUT
    };
};

export const setIsLoggedIn = ()=>{

    return {
        type: SET_IS_LOGGED_IN,
    };
};

