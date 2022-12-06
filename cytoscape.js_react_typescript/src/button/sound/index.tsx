import {Button} from '@blueprintjs/core';

export interface Props {
    text?: string;
    handleSound?: any;
    index?: number;
}

const SoundButtonSample : React.FC<Props> = props => {
    
    return (
        <>
            <Button
                onClick={() => props.handleSound(props.index)}
            >
                {props.text}
            </Button>
        </>
    );
};

export default SoundButtonSample;
