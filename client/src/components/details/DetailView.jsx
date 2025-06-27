
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductDetails } from '../../redux/actions/productActions';

import { Box, Typography, Grid, styled } from '@mui/material';

import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';


const Component = styled(Box)`
    background: #f2f2f2
    margin-top: 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: "flex",
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        margin: 0
    }
}));

const RightContainer = styled(Grid)`
    margin-top: 50px;
    margin-left: 25px;
`


const DetailView = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    useEffect(() => {
    if (!product || product.id !== id) {
        dispatch(getProductDetails(id));
    }
    }, [dispatch, id, product]);


    console.log(product);

    return (
        <Component>
            {
                loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    product && Object.keys(product).length > 0 && (
                        <Container>
                            <ActionItem product={product} />
                            <RightContainer item lg={8} md={8} sm={8} xs={12}>
                                <ProductDetail product={product} />
                            </RightContainer>
                        </Container>
                    )
                )
            }
        </Component>
    )
}

export default DetailView;