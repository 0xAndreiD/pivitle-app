export const LOGIN = 'AUTH/LOGIN';
export const ADD_TO_CART = 'AUTH/ADD_TO_CART';
export const SET_SUBSCRIPTION = 'AUTH/SET_SUBSCRIPTION';
export const REMOVE_FROM_CART = 'AUTH/REMOVE_FROM_CART';
export const REDIRECT_PAYMENT = 'AUTH/REDIRECT_PAYMENT';


export const setUser = payload => ({
    type: LOGIN,
    payload
});

export const addToCart = payload => ({
    type: ADD_TO_CART,
    payload
});

export const removeFromCart = payload => ({
    type: REMOVE_FROM_CART,
    payload
});

export const getClientSecret = payload => ({
    type: REDIRECT_PAYMENT,
    payload
});

export const setSubscriptions = payload => ({
    type: SET_SUBSCRIPTION,
    payload
});


export default function reducer(state = {
    user: {},
    Authorization: null,
    cartItems: [],
    cart: {
        subTotal: 0,
        tax: 0,
        total: 0
    },
    addedToCart: null,
    paymentRedirect: null,
    subscriptions: null
}, action) {
    switch (action.type) {

        case LOGIN:

            localStorage.setItem('user', JSON.stringify(action.payload.data));
            localStorage.setItem('Authorization', action.payload.Authorization);
            
            console.log(action.payload.data);
            
            return {
                ...state,
                user: action.payload.data,
                Authorization: action.payload.Authorization
            };

        case ADD_TO_CART:

            var cart = {};
            cart = { 
                ...state.cart,
                subTotal: state.cart.subTotal + action.payload.price,
                // tax: state.cart.tax + ((action.payload.price * 18)/ 100)
                tax: 0
            };
            cart = { ...cart, total: cart.tax + cart.subTotal };

            console.log({ cart });

            return {
                ...state,
                cartItems: [ ...state.cartItems, action.payload ],
                cart,
                addedToCart: action.payload.label + ' has been added to your cart.'
            };

        case REMOVE_FROM_CART:
            var cart = { 
                ...state.cart,
                subTotal: state.cart.subTotal - action.payload.price,
                tax: state.cart.tax - ((action.payload.price * 18)/ 100)
            };
            cart = { ...cart, total: cart.tax + cart.subTotal };

            return {
                ...state,
                cartItems: state.cartItems.filter(el => el.title !== action.payload.title),
                cart,
                addedToCart: action.payload.label + ' has been removed from your cart.'
            };

        case SET_SUBSCRIPTION:
            return {
                ...state,
                subscriptions: action.payload.data
            };

        case REDIRECT_PAYMENT:
            return {
                ...state,
                paymentRedirect: action.payload.data
            };

        default:
            return state;
    }
};