import useSWR from 'swr';
import fetcher from './fetch';
import { API_URL } from './sampleURL';
export function Profile() {
    const {data,error} = useSWR(`${API_URL}/tags`,fetcher);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
  
    // // render data
    // return <div>hello {data.tags}!</div>
    return {
        data : data.tags
    }
}