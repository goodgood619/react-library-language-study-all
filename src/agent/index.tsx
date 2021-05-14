import axios from 'axios';
import useSWR from 'swr';
import fetcher from './fetch';
import { API_URL } from './sampleURL';
function Profile() {
    const {data,error} = useSWR(`${API_URL}/tags`,fetcher);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    // // render data
    // return <div>hello {data.tags}!</div>
    return {
        data : data
    }
}

// SWRArticle -> useSWRArticle
export const useSWRArticle = () => {
    return useSWR(`${API_URL}`,fetcher,{initialData : undefined,revalidateOnMount : true});
}

export const SWRArticleEdit = () => {
    axios.post(`${API_URL}`).then((res : any)=> {
        console.log(res);
    });
};
