import { useState } from 'react';
import { Box, Button, formGroupClasses, styled } from '@mui/material';

import {ShoppingCart as Cart, FlashOn as Flash} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { createRazorpayOrder } from '../../service/api';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '32%' ,
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px',
        minWidth: '30%'
    }
}));

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 'auto',
    maxWidth: '300px',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%',
    },
}));


const StyledButton = styled(Button)(({ theme }) => ({
    width: '46% ',
    height: '50px' , 
    borderRadius: '2px',
    [theme.breakpoints.down('lg')]: {
        width: '46% '
    },
    [theme.breakpoints.down('sm')]: {
        width: '48% '
    }
}));


const ActionItem = ({ product}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[quantity, setQuantity] = useState(1);

    const { id } = product;


    const addItemToCart = () => {
        dispatch(addToCart(id,quantity))
        navigate('/cart');
    }

    const buyNow = async () => {
    const orderData = await createRazorpayOrder(product.price.cost);
    if (!orderData) {
        alert("Could not initiate payment.");
        return;
    }

    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxx",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Flipkart Clone",
        description: "Order Payment",
        order_id: orderData.id,
        handler: function (response) {
            const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            };
            // optional: dispatch verifyPayment here too
        },
        prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999",
        },
        theme: {
            color: "#3399cc"
        }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    };


    return(
        <LeftContainer>
            <Box style={{padding: '15px 20px', border: '1px solid #f0f0f0',width: '90%'}}>
            <Image src={ product.detailUrl} />
            </Box>
            <StyledButton variant='contained' onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}}><Cart/>Add to Cart</StyledButton>
            <StyledButton variant='contained' onClick={() => buyNow()} style={{ background: '#fb541b'}}><Flash/>Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;