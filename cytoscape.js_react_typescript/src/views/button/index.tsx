import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import SoundButtonSample from '../../button/sound/index';
import RowDataFactory from '../../utils/RowDataFactory';

const CRSound = new Audio('./sounds/ALARM_CR.WAV');
const MJSound = new Audio('./sounds/ALARM_MJ.WAV');
const MNSound = new Audio('./sounds/ALARM_MN.WAV');
const notiSound = new Audio('./sounds/notify.wav');

CRSound.loop = true;
MJSound.loop = true;
MNSound.loop = true;
notiSound.loop = true;

const SoundButton : React.FC = props => {
    const [soundArray,setSoundArray] = useState<Array<any>>(new RowDataFactory().createSoundData);

    const handleSound = (selectedIndex : any) => {
        const newSoundArray = soundArray.map((value : any, index : number)=> {
            return index !== selectedIndex ? value : !value
        });

        const soundResult : Boolean = soundArray[selectedIndex];
        if(!soundResult) {
            switch(selectedIndex) {
                case 0:
                    CRSound.play();
                    break;
                case 1:
                    MJSound.play();
                    break;
                case 2:
                    MNSound.play();
                    break;
                case 3:
                    notiSound.play();
                    break;
            }
        }
        else {
            switch(selectedIndex) {
                case 0:
                    CRSound.pause();
                    break;
                case 1:
                    MJSound.pause();
                    break;
                case 2:
                    MNSound.pause();
                    break;
                case 3:
                    notiSound.pause();
                    break;
            }
        }
        setSoundArray(newSoundArray);
    };

    return (
        <div className="w-auto h-auto inline-block">
            <SoundButtonSample
            text="CR"
            handleSound={handleSound}
            index={0}/>
            <SoundButtonSample
            text="MJ"
            handleSound={handleSound}
            index = {1}/>
            <SoundButtonSample
            text="MN"
            handleSound={handleSound}
            index = {2}
            />
            <SoundButtonSample
            text="Notify"
            handleSound={handleSound}
            index = {3}
            />
        </div>
    );
};

export default SoundButton;