## XMLHttpRequest


`XMLHttpRequest`는 JavaScript에서 `HTTP 요청을 할 수 있게 해주는 브라우져에 내장된 객체`입니다.

요즘은 fetch로 많이 쓰이고는 하지만, 여전히 XMLHttpRequest를 무시할 수는 없습니다.

1. XMLHttpRequest로 작성된 script들이 이미 존재하기 때문입니다.
2. old 브라우져에도 쓰일 수 있기 때문에 고려해야 합니다.
3. fetch가 아직 하지 못하는 기능들이 필요할 수도 있습니다. 예를 들면, 업로드 및 다운로드의 진행상황 표현들이 있습니다.

<br><br><br>

### 기본순서

---

우선 가장 먼저 XMLHttpRequest 객체를 만들어야 합니다.

```jsx
let xhr = new XMLHttpRequest();
```

<br><br>

그 이후에, 어떤 방법으로 보내야 할지 명세를 작성해야 합니다.

open 메소드를 이용해 작성합니다.

```jsx
xhr.open(method, URL, [async, user, password])
```

- method : HTTP-method입니다. 보통 'GET' 이나 'POST'가 있습니다.
- URL : 요청할 URL을 의미합니다. URL 객체타입도 가능합니다.
- async : 명시적으로 false라고 설정하게되면, 그때는 synchronous하게 동작합니다.
- user, password : HTTP auth를 위한 user와 password입니다(필요하게 되면 명시합니다)

<br><br>

다 되었으면 send 메소드를 이용해 보냅니다

```jsx
xhr.send([body])
```

body가 있는 경우는 GET이 아닌 POST의 방법을 사용하게 되면, 그 때 필요한 내용들을 의미합니다. 

<br><br>

보낸 후에, 반응할 event들 중에서는 대표적으로 3가지가 쓰입니다.

- load : 요구가 끝났을때 실행됩니다. 물론 요구가 실패된 경우도 속합니다. 이 경우는 application 계층에서 발생했을때를 의미합니다.
- error : 요구가 성공적이지 못한 경우입니다. 예를 들면, 네트워크 다운이나 유효하지 않은 URL들이 예가 있을 수 있습니다. network 계층에서 발생했을때 호출이 됩니다.
- progress : 응답의 현재 진행 상황을 주기적으로 이벤트를 호출합니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "x5at5b179g";

// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. 명시를 해줘야 합니다: GET-request for the URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Send the request over the network
xhr.send();

// 4. response가 온전히 모두 receive되면 작동합니다.
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    alert(`Done, got ${xhr.response.length} bytes`); // response is the server
  }
};

// 현재 진행상황을 나타냅니다
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // no Content-Length
  }

};

// 에러가 발생했을 경우 동작합니다
xhr.onerror = function() {
  alert("Request failed");
};
</script>
```

<br><br>

추가적으로, GET을 이용하고 parameter를 붙여서 전달할 경우가 빈번합니다. 이 때는, JavaScript에 있는 `URL Object`를 사용해서 해결할 수 있습니다.

```jsx
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// the parameter 'q' is encoded
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

<br><br><br>

### ResponseType

---

그리고, ResponseType을 정해서 response 받을때, 원하는 format Type을 정할 수 있습니다.

- `""` - 기본 형태입니다, string 형태로 얻습니다.
- `"text"` – string 형태로 얻습니다.
- `"arraybuffer"` – `ArrayBuffer` 형태로 얻습니다.
- `"blob"` – `Blob` 형태로 얻습니다
- `"document"` – XML document 형태로 얻습니다 (can use XPath and other XML methods),
- `"json"` – JSON 타입으로 얻습니다 (parsed automatically).

<br><br><br>

추가적으로, 요청했던 것을 취소하고 싶을 때는 abort event를 쓰면 됩니다.

```jsx
xhr.abort(); // terminate the request
```

그리고, cookie나 HTTP 인증 관련한 정보 보내는 것을 허용하고 싶다면 다음과 같이 쓰면 됩니다.

```jsx
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open('POST', 'http://anywhere.com/request');
```