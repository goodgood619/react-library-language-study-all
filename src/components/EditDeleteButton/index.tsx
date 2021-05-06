import {useState} from 'react';
import {Button, ButtonGroup,Intent} from '@blueprintjs/core';

const SampleEditDeleteButton = ((props : {method : any,method2 : any}) => {


    const handleTest = () => {
        props.method();
    };

    const deleteHandleTest = () => {
        props.method2();
    }

    return (
        <ButtonGroup>
           <Button small={true} className="edit" intent={Intent.SUCCESS} text="Edit" onClick={handleTest}/>
           <Button small={true} className="delete"intent={Intent.DANGER} text="Delete" onClick = {deleteHandleTest}/>
        </ButtonGroup>
    );
});

export default SampleEditDeleteButton;