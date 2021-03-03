import React from 'react';
import styled,{css} from 'styled-components';

const Circle = styled.div`
    width: 5rem;
    height : 5rem;
    background : ${props => props.testColor || 'black'};
    border-radius: 50%;
    ${props => props.huge &&
    css`
    width : 20rem;
    height: 20rem; 
    `}
`;

const PracticeStyled = () => {

    return (
        <Circle testColor="blue" huge/>
    );
};

export default PracticeStyled;