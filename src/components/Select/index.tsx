import Select from 'react-select';
const SelectBox = (props : {handle : any}) => {
    
    const options = [
        {value : 'WDM-PON-P2P',label : 'WDM-PON-P2P'},
        {value : 'WDM-PON-Cascade',label : 'WDM-PON-Cascade'},
        {value : 'WDM-PON-P2P_Protection',label : 'WDM-PON-P2P_Protection'},
        {value : 'WDM-PON-P2P_RingProtection',label : 'WDM-PON-P2P_RingProtection'},
      ];
      const selected = (e : any)=> {
        props.handle(e.value);
      };

    return (
        <>
            <Select options={options} defaultValue={options[0]} onChange = {selected}/>
        </>
    );
};

export default SelectBox;