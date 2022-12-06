## axios와 fetch의 유사 및 차이점

<br><br>

axios와 fetch는 `http통신을 하는데 있어 필요한 라이브러리의 측면을 가지고 있다`는 점에서 아주 유사합니다.

그러나, 다음과 같은 차이점들도 존재합니다. 

<br><br><br>

우선 제일 먼저 호환성의 측면으로 보면, `axios가 좀 더 호환이 잘됩니다.`

`fetch의 경우는 IE 11에서 호환이 되지 않습니다.`

차이점은 예시코드를 보면서 설명하겠습니다

<br><br><br>

먼저, fetch로 된 형태의 코드입니다.

```jsx
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                property_one: value_one,
                property_two: value_two
            })
        };
let response = await fetch(url, options);
let responseOK = response && response.ok;
if (responseOK) {
    let data = await response.json();
    // do something with data
}
```

<br><br><br>

다음은, axios로 쓰여진 코드입니다.

```jsx
let url = 'https://someurl.com';
let options = {
            method: 'POST',
            url: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                property_one: value_one,
                property_two: value_two
            }
        };
let response = await axios(options);
let responseOK = response && response.status === 200 && response.statusText === 'OK';
if (responseOK) {
    let data = await response.data;
    // do something with data
}
```

<br><br><br>

차이점으로는 다음과 같습니다.

- Fetch의 body = Axios의 data
- Fetch의 body는 stringify된 형태여야 하고, Axios의 data는 object를 포함하고 있습니다.
- Fetch는 request object에는 url이 없는데, Axios에는 url이 있습니다. (위의 경우는 options 변수에 있습니다)
- Fetch는 request parameter에 `url을 포함`하는데, Axios는 반면에 그렇지 않습니다.
- Fetch의 응답 property는 `ok`라고 표현하는데, Axios는 `status 혹은 statusText가 'OK'`인 형태입니다.
- json타입으로 객체를 얻을때, fetch는 `.json()`으로 받아야 하지만, axios는 `data` 라는 property라는 상태로 받을 수 있습니다.

출처 :  [https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch](https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch)