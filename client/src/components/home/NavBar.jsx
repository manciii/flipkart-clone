

import { Box, Typography } from '@mui/material';

import { navData } from '../../constants/data';
import { styled } from '@mui/material';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '55px 130px 0 130px',
    justifyContent: 'space-between',
    overflow: 'overlay',
    background: '#fff',
    [theme.breakpoints.down('lg')]: {
        margin: 0
    }
}));

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center;
`

const Text = styled(Typography)`
    font-size: 14px;
    foint-weight: 600;
    font-family: inherit;
`

const NavBar = () => {
    return(
        <Box style={{ background: '#fff'}}>
        <Component>
            {
                navData.map(data => (
                    <Container>
                        <img src={data.url} alt='nav' style={{width: 64}}/>
                        <Text>{data.text}</Text>
                    </Container>
                ))
            }
        </Component>
        </Box>
    )
}

export default NavBar;