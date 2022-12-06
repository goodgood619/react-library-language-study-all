import { useState } from 'react';
import Modal from 'react-modal';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


const Dialog = (props : any) => {
    return (
        <Modal
            isOpen={props.isOpen}
            style={customStyles}
            onRequestClose={props.onClose}
        >
            <h2>{props.data}</h2>
            <div>
                test
            </div>
            <button>
                
            </button>
        </Modal>
    );
};

export default Dialog;