import axios from 'axios';

import * as actionType from '../constants/cartConstants';

const URL = '';



export const addToCart = (id,quantity) => async(dispatch) => {
    try{
        const { data } = await axios.get(`${URL}/product/${id}`);
        dispatch({type: actionType.ADD_TO_CART, payload: {...data, quantity }});
    }catch(error){
        dispatch({type: actionType.ADD_TO_CART_ERROR, payload: error.message});
    }
}

export const RemoveFromCart = (id) => (dispatch) => {
   dispatch({type: actionType.REMOVE_FROM_CART, payload: id });
}

export const incrementQuantity = (id) => ({
    type: actionType.INCREMENT_QUANTITY,
    payload: id
});

export const decrementQuantity = (id) => ({
    type: actionType.DECREMENT_QUANTITY,
    payload: id
});
