
import { Button, ButtonGroup, Box, styled  } from "@mui/material";

import { useDispatch } from "react-redux";

import { incrementQuantity, decrementQuantity } from "../../redux/actions/cartActions";

const Component = styled(ButtonGroup)`
    margin-top: 30px;

`

const StyledButton = styled(Button)`
    border-radius: 50%;
`

const GroupedButton = ( { item }) => {
  const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementQuantity(item.id));
    };

    const handleDecrement = () => {
        dispatch(decrementQuantity(item.id));
    };


    return(
        <Component>
            <StyledButton onClick={handleDecrement} >-</StyledButton>
            <Button disabled>{item.quantity}</Button>
            <StyledButton onClick={handleIncrement} >+</StyledButton>
        </Component>
    );
};

export default GroupedButton;