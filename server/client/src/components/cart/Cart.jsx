import { Grid, Typography, Box, styled, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

//components
import CartItem from './CartItem';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';

import { createRazorpayOrder, getRazorpayKey } from '../../service/api';
import { verifyPayment } from '../../redux/actions/paymentActions';
import { RemoveFromCart } from '../../redux/actions/cartActions';

const Container = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    marginTop: '30px',
    [theme.breakpoints.down('md')]:{
        padding: '15px 0'
    }
}));

const Header = styled(Grid)`
    padding: 15px 24px;
    background: #fff;
`

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff ;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10% );
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    width: 250;
    height: 51px;
    border-radius: 2px;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: '15px',
    width: '70%',
    [theme.breakpoints.down('md')]:{
        marginBottom: 15
    }
}));



const Cart = () => {
    
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const { loading, success, error } = useSelector(state => state.payment);

    useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
    }, []);


    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        let price = 0, discount = 0;
        cartItems.forEach(item => {
            const qty = item.quantity || 1;
            price += item.price.mrp * qty;
            discount += (item.price.mrp - item.price.cost) * qty;
        });
        setPrice(price);
        setDiscount(discount);
    }, [cartItems]);

    const totalAmount = price - discount + 40;

    useEffect(() => {
        if (success) {
            cartItems.forEach(item => {
                dispatch(RemoveFromCart(item.id));
            });
        }
    }, [success, cartItems, dispatch]);

    const buyNow = async () => {
    console.log("buyNow triggered");

    const key = await getRazorpayKey();
    const orderData = await createRazorpayOrder(totalAmount);

    console.log(" Order Data:", orderData); 
    if (!orderData || !key) {
        alert("Could not initiate payment.");
        return;
    }

    const options = {
        key: key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Flipkart Clone",
        description: "Order Payment",
        order_id: orderData.id,

        handler: function (response) {
            console.log(" Payment success:", response);
            const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
            };

            dispatch(verifyPayment(paymentData));
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
    console.log(" Creating Razorpay instance...");
    const rzp = new window.Razorpay(options);
    rzp.open();
    };


    return(
        <>
            {loading && <Typography style={{ textAlign: 'center', color: 'blue' }}>Verifying payment...</Typography>}
            {success && <Typography style={{ textAlign: 'center', color: 'green' }}>Payment successful! Thank you 🎉</Typography>}
            {error && <Typography style={{ textAlign: 'center', color: 'red' }}>Payment failed: {error}</Typography>}
            
            
            {
                cartItems.length ? 
                <Container container>
                    <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                        <Header>
                            <Typography>My Cart ({cartItems.length}) </Typography>
                        </Header>
                        {
                            cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))
                        }
                        <ButtonWrapper>
                            <StyledButton onClick={() => buyNow()}> Place Order</StyledButton>
                        </ButtonWrapper>
                    </LeftComponent>
                    <Grid item lg={3} md={3} sm={12} xs={12} style={{ width: '25%'}}>
                        <TotalView cartItems={cartItems} price={price} discount={discount} />
                    </Grid>

                </Container>
                : <EmptyCart />
            }
        </>
    );
};

export default Cart;