import {SWRArticle} from '../../../agent/index';
export function Test() {
    const {data,mutate,error} : any = SWRArticle();
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data);
    return (
        <div>
            test
            </div>
    );
}