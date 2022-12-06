import { H5, Intent, ProgressBar, Slider, Switch } from "@blueprintjs/core";
import { Example, handleBooleanChange, handleValueChange, IExampleProps } from "@blueprintjs/docs-theme";
import React,{useState} from 'react';

const ProgressBarExample = () => {

    const [hasValue,sethasValue] = useState(false);
    const [value,setValue] = useState(0.7);
    
    const renderLabel = (value)=> {
        value.toFixed(1);
    };

    const handleValueChange = (value) => {
        setValue(value);
    };

    const options = (
        <>
            <H5>Props</H5>
                <Switch checked={hasValue} label="Known value"/>
                <Slider
                    disabled={!hasValue}
                    labelStepSize={1}
                    min={0}
                    max={1}
                    onChange={handleValueChange}
                    labelRenderer={renderLabel}
                    stepSize={0.1}
                    showTrackFill={false}
                    value={value}
                />
        </>
    )
    return (
        <Example options={options}>
            <ProgressBar value={hasValue? value : null}/>
        </Example>
    );
};

export default ProgressBarExample;