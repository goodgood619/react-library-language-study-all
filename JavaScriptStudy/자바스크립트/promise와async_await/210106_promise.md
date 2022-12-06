## Promise

---

Promise는 JavaScript 비동기 처리에 사용되는 객체입니다.

promise 객체는 아래와 같이 만들어 질 수 있습니다.

```jsx
let promise = new Promise(function(resolve, reject) {
  // executor 
});
```

<br><br>

executor 부분에 원하는 코드를 작성하고, 반드시 성공 혹은 실패 유무를 반환해야 합니다.

- `resolve(value)` — 일이 성공적으로 끝난 경우, 그 결과를 나타내는 `value`와 함께 호출
- `reject(error)` — 에러 발생 시 에러 객체를 나타내는 `error`와 함께 호출

위의 조건을 이용하여 다음과 같은 간단한 코드가 만들어 질 수 있습니다.

```jsx
let promise = new Promise(function(resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result가 'done'이 됩니다.
  setTimeout(() => resolve("done"), 1000);
});
```

<br><br>

1초가 지난 후에 done이라는 성공적으로 done이라는 결과값이 전달이 됩니다.

이 코드가 동작을 제대로 하는지 알기 위해 좀 더 추가적인 코드를 작성 해 볼수 있습니다.

```jsx
let promise = new Promise(function(resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result가 'done'이 됩니다.
  setTimeout(() => resolve("done"), 1000);
});
let result = promise;
alert(result); // done?이 아닌 object promise라는 값이 도출이 됩니다.
```

done이라는 결과값이 출력 되기를 기대 했는데, 그렇지 않은 결과가 도출이 됩니다.

왜냐하면, 1초 뒤에 일이 끝나기 전에 alert문장이 먼저 실행 되었기 때문입니다.

<br><br><br>

### then

---

이처럼, 코드가 비동기적이 아닌 동기적으로 동작을 하게 하기 위해서

then이라는 키워드를 사용해야 합니다.

```jsx
let promise = new Promise(function(resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result가 'done'이 됩니다.
  setTimeout(() => resolve("done"), 1000);
});
let result = promise;
 // alert(result); 
result.then((res)=>{
    alert(res); // done 출력이 됩니다
});
```

then은 promise로 전달된 결과값을 받아, 추가적인 코드를 진행 할수 있다는 것을 알 수 있습니다.

<br><br>

then의 문법적인 부분을 좀 더 살펴 보겠습니다.

```jsx
promise.then(
  function(result) { /* 결과(result)를 다룹니다 */ },
  function(error) { /* 에러(error)를 다룹니다 */ }
);
```

then은 성공적인 결과와 실패한 에러값을 다룰 수 있다는 것을 알 수 있습니다.

<br><br>


```jsx
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  result => alert(result), // 1초 후 "done!"을 출력
  error => alert(error) // 실행되지 않습니다
);

let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// reject 함수는 .then의 두 번째 함수를 실행합니다.
promise.then(
  result => alert(result), // 실행되지 않습니다
  error => alert(error) // 1초 후 "Error: 에러 발생!"를 출력
);

// 성공적인 부분만 다룰수도 있습니다.
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // 1초 뒤 "done!" 출력
```

요약을 하면,  then함수는 성공과 실패 둘 중의 하나의 결과를 반드시 실행한다는 것을 알 수 있습니다.

<br><br>

### catch

---

하지만, 항상 실패한 결과만 다뤄야 한다면 catch라는 키워드를 활용 할 수 있습니다.

```jsx
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력
```

then을 활용해도 되지만, 좀 더 문법적으로 간결할 수 있다는 특징이 있습니다.

<br><br>

### finally

---

`try {...} catch {...}`에 finally 절이 있는 것처럼, 프라미스에도 `finally`가 있습니다.

프라미스가 처리되면(이행이나 거부) `f`가 항상 실행된다는 점에서 `.finally(f)` 호출은 `.then(f, f)`과 유사합니다.

결과가 어떻든 마무리가 필요하면 finally가 유용합니다.

<br><br>


다음은 샘플 코드입니다.

```jsx
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000)
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음

new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음
```

샘플 코드를 통해 알 수 있는 점은 다음과 같습니다.

- finally는 인수가 필요하지 않습니다.
- promise의 결과값이 finally를 통과해서 전달이 됩니다.

<br><br>


출처 : [promise 기본](https://ko.javascript.info/promise-basics)