import {Button, Intent} from '@blueprintjs/core';

const SampleButton = (props : {value : any}) => {

    const clickButton = ( e: any) => {
        console.log('button click',e);
    };

    return (
        <button
        onClick={clickButton}>
        </button>
    );
};

export default SampleButton;