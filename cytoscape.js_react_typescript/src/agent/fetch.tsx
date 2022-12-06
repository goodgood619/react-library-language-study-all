import axios from 'axios'

const fetcher = (url : any) => axios.get(url).then(res => {
    console.log(res.data);
    return res.data});

export default fetcher;