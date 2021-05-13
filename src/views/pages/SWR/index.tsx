import {useState} from 'react';
import useSWR from 'swr';
import fetcher from '../../../agent/fetch';
import { API_URL } from '../../../agent/sampleURL';
import {SWRArticle} from '../../../agent/index';
import Modal from 'react-modal';


export function SWRSample() {
    const {data, mutate,error} : any = SWRArticle();
    const [item,setItem] = useState<any>();
    const [index,setIndex] = useState<number>();
    const [updateResult,setUpdateResult] = useState<boolean>(false);
    if(!data) return <div>loading...</div>
    const newArray = handling(data); 
    const handleEdit = (e : any) => {
        const Editvalue = item;
        const Editindex = index;
        let newData = data;
        newData = newData.comments.map((value : any, index : number)=> {
            return index !== Editindex ? value : {...value, 
            author : {
                username : Editvalue
            }}
        })
        // mutate({comments : undefined},false);
        mutate(undefined,false); //mutate시 값이 바뀌면, 자동으로 REST API CALL한다.,

       setUpdateResult(!updateResult);
    };
    const handleValue = (e : any) => {
        setItem(e.target.value);
    };

    const handleIndex = (e : any) => {
        setIndex(Number(e.target.value));
    };

    const handleDialogClose = () => {
        setUpdateResult(!updateResult);
    };

    // render data and use Component here
    return (
        <>
            <h1>Hello SWR!</h1>
            <div>
                {newArray.map((item: any,index : number) => (
                    <div>
                        <input type="text" defaultValue={item.author.username} onChange={handleValue}/>
                        <input type="hidden" defaultValue={index} onChange={handleIndex}/>
                        <button onClick={handleEdit}>
                            edit button
                        </button>
                    </div>
                ))}
                {updateResult === true ? 
                <Modal
                isOpen={updateResult}
                onRequestClose={handleDialogClose}>
                    업데이트 성공입니다.

                    <button onClick={handleDialogClose}>close</button>
                </Modal> : <></>}
            </div>
        </>
    );
}

function handling(data : any) {
    return data.comments.filter((value : any, index : number)=> {
        return (value && value.id >= 5000);
    })
}