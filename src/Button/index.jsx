import { StyledButton } from "./styled";


const Button = ({children,color, ...rest}) => {
    return (
        <StyledButton color = {color} {...rest}>{children}</StyledButton>
    );
};

Button.defaultProps = {
    color : 'blue'
}

export default Button;