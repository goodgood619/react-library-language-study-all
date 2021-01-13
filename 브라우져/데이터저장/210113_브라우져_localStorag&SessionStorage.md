## localStorage와 SessionStorage

localStorage와 SessionStorage는 브라우져 내에 키-값 쌍을 저장할수 있게 해주는 web storage object 입니다.

물론 cookie를 사용해서 브라우져에 데이터를 저장하는 방법도 있습니다.

그러나, web storage object들을 사용하면 다음과 같은 이점을 얻을 수 있습니다.

1. web storage object들은 네트워크 요청 할때 `서버로 데이터가 전달이 되지 않습니다`. 그러다보니, `cookie보다 더 많은 양을 보관`할 수 있습니다
2. HTTP Header를 통해 web Storage Object들을 조작할 수 없습니다. web Storage Object들은 JavaScript내에서만 조작이 가능합니다.
3. Web Storage Object들은 도메인·프로토콜·포트로 정의되는 `오리진(origin)에 묶여있습니다`. 따라서 프로토콜과 서브 도메인이 다르면 데이터에 접근할 수 없습니다

<br><br>

두 스토리지 객체는 동일한 메서드와 프로퍼티를 제공합니다.

- `setItem(key, value)` – 키-값 쌍을 보관합니다.
- `getItem(key)` – 키에 해당하는 값을 받아옵니다.
- `removeItem(key)` – 키와 해당 값을 삭제합니다.
- `clear()` – 모든 것을 삭제합니다.
- `key(index)` – 인덱스(`index`)에 해당하는 키를 받아옵니다.
- `length` – 저장된 항목의 개수를 얻습니다.

두 스토리지 객체는 `Map`과 유사합니다. `setItem/getItem/removeItem`을 지원하죠. 하지만 인덱스를 사용해 키에 접근할 수 있다는 점(`key(index)`)에서 차이가 있습니다.

<br><br><br>

### 키 순회하기

---

Storage Object들은 iterable 객체가 아니기 때문에,  for..of 문장을 사용할 수 없습니다.

하지만, 배열처럼 사용하면 전체 키값을 얻을 수 있습니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "6lggbh3rmx";

for(let i=0; i<localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
</script>
```

<br><br>

물론, for..in을 써도 되지만 이때는 필요하지 않은 내장 메소드도 출력이 됩니다.

그래서, `hasOwnProperty`를 이용해 프로토타입에서 상속받은 필드를 골라내야 합니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "niniwf0ofx";

for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // setItem, getItem 등의 키를 건너뜁니다.
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
</script>
```

<br><br>

혹은, `Object.keys`를 이용할 수도 있습니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "f8gkh2oa5e";

let keys = Object.keys(localStorage);
for(let key of keys) {
  alert(`${key}: ${localStorage.getItem(key)}`);
}
</script>
```

<br><br><br>

### 문자열만 사용

---

localStorage의 `키와 값은 반드시 문자열`이어야 합니다.

숫자나 객체 등 다른 자료형을 사용하게 되면 문자열로 자동 변환됩니다

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "7y4mtzndvi";

sessionStorage.user = {name: "John"};
alert(sessionStorage.user); // [object Object]
</script>
```

<br><br>

물론, JSON을 쓰면 객체를 사용해서 표현도 가능합니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "1korxr8t3q";

sessionStorage.user = JSON.stringify({name: "Jordan"});

let user = JSON.parse( sessionStorage.user );
alert( user.name ); // Jordan
</script>
```

<br><br><br>

### sessionStorage

---

`sessionStorage` 객체는 `localStorage`에 비해 자주 사용되진 않습니다.

제공하는 프로퍼티와 메서드는 같지만, 훨씬 제한적이기 때문입니다.

- `sessionStorage`는 현재 떠 있는 탭 내에서만 유지됩니다.
    - 같은 페이지라도 다른 탭에 있으면 다른 곳에 저장되기 때문입니다.
    - 그런데 하나의 탭에 여러 개의 iframe이 있는 경우엔 동일한 오리진에서 왔다고 취급되기 때문에 `sessionStorage`가 공유됩니다.
- 페이지를 새로 고침할 때 `sessionStorage`에 저장된 데이터는 사라지지 않습니다. 하지만 탭을 닫고 새로 열 때는 사라집니다.

<br><br><br>

### Storage Event

---

추가적으로, localStorage와 sessionStorage의 데이터가 갱신이 될때, storage 이벤트가 실행이 됩니다. 

여기서 중요한 점은 storage 이벤트가 이벤트를 발생시킨 스토리지를 제외하고 `스토리지에서 접근 가능한 window 객체 전부에서 일어난다는 사실`입니다.

예를 들면, localStorage의 경우 창이 달라도 서로 공유가 됩니다. 

그러므로, 여러개의 창이 동시에 켜져 있다고 가정할 경우 한 브라우져에서 localStorage의 갱신이 일어나면 다른 모든 브라우져로 알림이 가게 되는 것입니다.

<br><br>

아래코드는 현재시간의 값을 넣어서 갱신을 일부러 만들어주는 예시코드입니다.

```html
<!DOCTYPE html>
<script>
"use strict";globalThis.__codeBoxId = "fu0wq54wil";

// 문서는 다르지만, 갱신은 같은 스토리지에 반영됩니다.
window.onstorage = event => { // window.addEventListener('storage', () => {와 같습니다.
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
</script>
```