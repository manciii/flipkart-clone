import { createStore, combineReducers, applyMiddleware } from 'redux';

import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getProductsReducer, getProductDetailsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { paymentReducer } from './reducers/paymentReducer';

const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer,
    payment: paymentReducer 
});

const middleware = [thunk];


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;