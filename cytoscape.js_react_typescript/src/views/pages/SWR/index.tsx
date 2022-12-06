import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../../../agent/fetch";
import { API_URL } from "../../../agent/sampleURL";
import { useSWRArticle,SWRArticleEdit } from "../../../agent/index";
import Modal from "react-modal";

export function SWRSample() {
  const { data, mutate, error } = useSWRArticle();
  const [item, setItem] = useState<any>();
  const [index, setIndex] = useState<number>();
  const [updateResult, setUpdateResult] = useState<boolean>(false);
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
//   const newArray = handling(data);
  const handleEdit = async (e: any) => {
    const Editvalue = item;
    const Editindex = index;
    let newData = data;
    newData = newData.map((value: any, index: number) => {
      return index !== Editindex
        ? value
        : {
            ...value,
            result: 'fads',
          };
    });
    mutate(newData,false); //mutate시 값이 바뀌면, 자동으로 REST API CALL한다. false옵션을 주면, revalidation을 하지않음
    await SWRArticleEdit();
    // 근데 페이지에서 rerendering을 하지는 않는다.(즉 변수의 state 관리가 전혀 안됨)
    // key가 다르지 않아서 그랬던거였다 ㅇㅇ..(react 기본)
    mutate(); // revalidate
    setUpdateResult(!updateResult);
  };
  const handleValue = (e: any) => {
    setItem(e.target.value);
  };

  const handleIndex = (e: any) => {
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
        {data.map((item: any, index: number) => (
          <div>
            <input
              key={JSON.stringify(item)}
              type="text"
              defaultValue={item.result}
              onChange={handleValue}
            />
            <input type="hidden" defaultValue={index} onChange={handleIndex} />
            <button onClick={handleEdit}>edit</button>
          </div>
        ))}
        {updateResult === true ? (
          <Modal isOpen={updateResult} onRequestClose={handleDialogClose}>
            업데이트 성공입니다.
            <button onClick={handleDialogClose}>close</button>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function handling(data: any) {
  return data.comments.filter((value: any, index: number) => {
    return value && value.id >= 5000;
  });
}
