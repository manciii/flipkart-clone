import { Box, Typography, styled } from "@mui/material";


import { useState, useEffect } from "react"; 

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Heading =styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
    margin-bottom: 20px;
    font-size: 14px;
    }
    & > h6 {
        margin-bottom: 20px;
    }
`;

const Price = styled(Box)`
    float: right;
`;



const TotalView = ({ cartItems, price, discount }) => {

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    };
    

    const total = (price || 0) - (discount || 0) + 40;
    const totalItems = getTotalItems();
    const itemLabel  = totalItems === 1 ? 'item' : 'items';


    return(
        <Box>
            <Header>
                <Heading> PRICE DETAILS </Heading>
            </Header>
            <Container>
                <Typography> Price ({totalItems} {itemLabel})
                    <Price component='span'>₹{ price } </Price>
                </Typography>
                <Typography> Discount
                    <Price component='span'>-₹{ discount } </Price>
                </Typography>
                <Typography> Delivery Charges 
                    <Price component='span'>₹40 </Price>
                </Typography>
                <Typography variant="h6" style={{ width: "400" }}> Total Amount
                    <Price component='span'>₹{ total } </Price>
                </Typography>
                <Typography style={{ color: 'green', marginTop: 10, fontWeight: 500 }}> You will save ₹{ discount - 40 } on this item 
                </Typography>

            </Container>
        </Box>
    );
};

export default TotalView;