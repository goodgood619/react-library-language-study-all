import {Button,AnchorButton,Intent} from '@blueprintjs/core';

const BlueprintButton = () => {
    const onClick = (e) => {
        alert('refsh Button '+e);
    };
    return (
        <>
            <Button intent={Intent.SUCCESS}>BlueprintjsButton</Button>
            <AnchorButton text="disabled" disabled={true} alignText="center"/> 
            <Button icon="refresh" intent={Intent.DANGER} text="BlueprintRefresh" onClick={onClick}/>
        </>
    );
};

export default BlueprintButton;