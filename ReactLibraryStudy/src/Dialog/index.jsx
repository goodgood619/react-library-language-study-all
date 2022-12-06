import Button from '../Button/index';
import { DarkBackground,DialogBlock,ButtonGroup } from './styled';

const Dialog = ({title, children, confirmText, cancelText}) => {
    return (
        <DarkBackground>
            <DialogBlock>
                <h3>{title}</h3>
                <p>{children}</p>
                <ButtonGroup>
                    <Button color="gray">{cancelText}</Button>
                    <Button color="pink">{confirmText}</Button>
                </ButtonGroup>
            </DialogBlock>
        </DarkBackground>
    );
};

Dialog.defaultProps = {
    confirmText : '확인',
    cancelText : '취소',
}

export default Dialog;