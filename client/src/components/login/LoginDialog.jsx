import { useState, useContext } from 'react';

import { Dialog, Box, TextField, Button, Typography, styled } from '@mui/material';

import { authenticatesSignup ,authenticateLogin } from '../../service/api'
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    height: 69vh;
    width: 90vh;
`;

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height: 82%;
    width: 28%;
    padding: 45px 25px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600;
    }
`

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div, & > button, & > p{
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%)
`;

const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`

const CreateAcc = styled(Typography)`
    font-size: 14px;
    color: #2874f0;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-tp: 10px;
    font-weight: 600;
`

const accountInitialValues = {
    login: {
        view: 'login',
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: "Sign up with your mobile number to get started"
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const LoginDialog = ( { open, setOpen }) => {

    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError]= useState(false)

    const { setAccount } = useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const toggleSignp = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        let response = await authenticatesSignup(signup);
        console.log(response);
        if(!response) return;
        handleClose();
        setAccount(signup.firstname);

    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value});
    } 

    const loginUser = async () => {
    let response = await authenticateLogin(login);
    console.log(response);

    if (response && response.status === 200) {
        handleClose();
        setAccount(response.data.data.firstname);
    } else {
        setError(true);
    }
};

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset'}}}>
            <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                </Image>
                {
                    account.view === 'login' ?
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name="username"  label='Enter username'/>
                        { error && <Error>Please enter valid usename or password</Error>}
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name="password"  label='Enter Password'/>
                        <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                        <LoginButton onClick ={() => loginUser()}>Login</LoginButton>
                        <Typography style = {{ textAlign: 'center'}}>OR</Typography>
                        <RequestButton>Request OTP</RequestButton>
                        <CreateAcc onClick={ () => toggleSignp()}>New to Flipkart? Create an account</CreateAcc>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="firstname" label='Enter Firstname'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="lastname" label='Enter Lastname'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="username" label='Enter Username'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="email" label='Enter Email'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="password" label='Enter Password'/>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name="phone" label='Enter Phone'/>
                        <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                    </Wrapper>
                }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;