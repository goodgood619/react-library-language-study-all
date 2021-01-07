## WeakMap과 WeakSet

---

우선 WeakMap 혹은 WeakSet을 쓰는 이유는 메모리 누수를 방지하기 위함입니다.

그래서, 실질적으로 쓰이는 용도는 캐싱을 하거나 추가해줄 데이터가 존재하는 상황입니다.

추가해줄 데이터가 반드시 객체여야 하는 경우에 유용할 수 있습니다.

그러다보니, **WeakMap과 WeakSet은 공통적으로 키 값을 무조건 객체로 가져야 한다**는 특징이 있습니다.

그리고, Map이나 Set에 비해 지원되는 메소드들은 제한적이라는 특징입니다.

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

<br><br>

### 추가하는 데이터가 객체인 경우

---

위에서 먼저 언급을 했듯이 추가하는 데이터가 객체인 경우에 유용하게 쓰일 수 있습니다.

```jsx
let visitsCountMap = new WeakMap(); // 위크맵에 사용자의 방문 횟수를 저장합니다.

// 사용자가 방문하면 방문 횟수를 늘려줍니다.
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

위의 코드를 Map으로 저장한다면, 특정 사용자인 user가 나타나지 않는 경우는 계속 값이 살아 있게 됩니다. 그러므로 이런 경우는 WeakMap을 쓰는것이 유용할 수 있습니다.


<br><br><br>

### 캐싱

---

두 번째의 경우는 캐싱입니다. 

```jsx
let cache = new WeakMap();

// 연산을 수행하고 그 결과를 위크맵에 저장합니다.
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* 연산 수행 */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* ... 객체 ... */};

let result1 = process(obj);
let result2 = process(obj);

// 객체가 쓸모없어지면 아래와 같이 null로 덮어씁니다.
obj = null;
```