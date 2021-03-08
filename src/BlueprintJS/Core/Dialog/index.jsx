import {Classes,Dialog,Intent,Button} from '@blueprintjs/core';
import React,{useEffect, useState} from 'react';
const DialogExample = () => {
    const [open, setOpen] = useState(true);
    const [close,setClose] = useState(false);

    useEffect(()=>{

    },[open,close]);

    const handleOut = () => {
        console.log('close ',close);
        console.log('open ',open);
        setClose(!close);
        setOpen(!open);
    };

    return (
        <Dialog
         icon="warning-sign"
         title="로그아웃 확인"
         autoFocus={true}
         onClose={close}
         isOpen={open}
         isCloseButtonShown={false}
         usePortal={true}
         canEscapeKeyClose={true}
         style={{width:'400px'}}
         >
            <div className={Classes.DIALOG_BODY}>
                DialogBody
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button intent={Intent.SUCCESS}>
                        성공
                    </Button>
                    <Button intent={Intent.DANGER} onClick={handleOut}>
                        취소
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

export default DialogExample;