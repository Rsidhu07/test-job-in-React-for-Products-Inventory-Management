import * as actions from './actions';

const initialState = {
    userDetails:{
        name: 'rajan',
        password: 'sidhu',
        email: 'raj@gmail.com'
    },
    products: [],
    loggedIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_IS_LOGGED_IN:
            return {
                ...state,
                loggedIn: true
            };

        case actions.SET_IS_LOGGED_OUT:
            return {
                ...state,
                loggedIn: false
            };

        case actions.ADD_PRODUCT:
            const newProducts = [...state.products];
            newProducts.push(action.payload);
            return {
                ...state,
                products:[...newProducts]
            };

        case actions.ADD_PRODUCTS_FROM_LS: 
            return {
                ...state,
                products:action.payload
            };

        case actions.LOG_OUT_CLEAR_PRODUCTS:
            return {
                ...state,
                products: []
            };

        default:
            return state;
    }
};

export default reducer;