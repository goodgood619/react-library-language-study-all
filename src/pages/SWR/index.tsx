import {useState} from 'react';
import useSWR from 'swr';
import fetcher from '../../agent/fetch';
import { API_URL } from '../../agent/sampleURL';

import Modal from 'react-modal';

export function SWRSample() {
    const { data, error,isValidating,mutate } = useSWR(`${API_URL}/tags`, fetcher);
    const [item,setItem] = useState<any>();
    const [index,setIndex] = useState<number>();
    const [updateResult,setUpdateResult] = useState<boolean>(false);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const handleEdit = (e : any) => {
        const Editvalue = item;
        const Editindex = index;
        const newData : Array<any> = data.tags.map((value : any, index : number)=> {
            return index !== Editindex ? value : Editvalue
        })
        mutate({...data, tags : newData},false);

       setUpdateResult(!updateResult);
    };

    const handleValue = (e : any) => {
        setItem(e.target.value);
    };

    const handleIndex = (e : any) => {
        setIndex(Number(e.target.value));
    };

    // render data and use Component here
    return (
        <>
            <h1>Hello SWR!</h1>
            <div>
                {data.tags.map((item: any,index : number) => (
                    <>
                        <input type="text" defaultValue={item} onChange={handleValue}/>
                        <input type="hidden" defaultValue={index} onChange={handleIndex}/>
                        <button onClick={handleEdit}>
                            edit button
                        </button>
                    </>
                ))}
                {updateResult === true ? 
                <Modal
                isOpen={true}>
                    성공입니다.
                </Modal> : <></>}
            </div>
        </>
    );
}