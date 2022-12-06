import {Button,Collapse} from "@blueprintjs/core";
import React,{useState} from 'react';

const CollapseExample = () => {
    const [isOpen,setisOpen] = useState(false);
    const handleClick = () => {
        setisOpen(!isOpen);
    }
    return (
        <div>
            <Button onClick = {handleClick}>
                {isOpen ? "Hide":"Show"} build logs
            </Button> 
            <Collapse isOpen={isOpen}>
                <pre>
                    Collapse text
                </pre>
            </Collapse>
        </div>
    );
};

export default CollapseExample;