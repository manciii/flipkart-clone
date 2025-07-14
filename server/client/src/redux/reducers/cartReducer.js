
import * as actiontype from '../constants/cartConstants';


export const cartReducer =  ( state = { cartItems: [] }, action ) => {
    switch(action.type){
        case actiontype.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(product => product.id === item.id);

            if(exist){
                return{ ...state, cartItems: state.cartItems.map(data => data.id === exist.id ? item: data)};
            }else{
                return{ ...state, cartItems: [...state.cartItems, item]};
            }
        case actiontype.REMOVE_FROM_CART :
            return { ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload )};

        case actiontype.INCREMENT_QUANTITY:
            return {...state, cartItems: state.cartItems.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)};

        case actiontype.DECREMENT_QUANTITY:
            return {...state, cartItems: state.cartItems.map(item => item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)};

        default: 
        return state;
    }
};