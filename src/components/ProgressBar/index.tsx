import {useEffect, useState} from 'react';

const SampleProgressBar = (props: {value : any}) => {
   const [BackGroundColor,setBackGroundColor]= useState<string>('green');

    useEffect(() => {
        if(props.value <=20) {
            setBackGroundColor('red');
        }
        else if(props.value <= 50) {
            setBackGroundColor('orange');
        }
        else if(props.value <= 80) {
            setBackGroundColor('lightskyblue');
        }
        else {
            setBackGroundColor('limegreen');
        }
    },[BackGroundColor]);


    return (
            <div className="div-percent-bar" style={{width: props.value + '%', backgroundColor: BackGroundColor}}>
                <div className="div-percent-value">{props.value}%</div>
            </div>
    );
}

export default SampleProgressBar;