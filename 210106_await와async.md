## async와 await

---

<br>

### async

---

async 키워드는 함수 function 앞에 위치 합니다.

다음처럼 사용이 가능합니다.

```jsx
async function f() {
  return 1;
}
```

<br><br>

그리고, function 앞에 **async 키워드를 붙이면 결과값이 항상 promise 값**의 형태입니다.

promise값이 아니더라도, 이행 상태의 promise(resolve)값으로 감싸서 반환을 시켜줍니다.

```jsx
async function f() {
  return 1;
}

f().then(alert); // 1

async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

<br><br><br>

### await

---

await 키워드는 항상 async 함수안에서만 동작을 합니다.

```jsx
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다립니다

  alert(result); // "완료!"
}

f();
```

<br><br>

위의 코드는 1초를 기다렸다가 promise로부터 받은 결과값을 보여주고 있습니다.

다음은, await가 중첩된 코드를 보겠습니다.

```jsx
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(2), 1000);
  });
  let promise2 = (result) => new Promise((resolve,reject)=>{
      result *= 100;
      if(result == 100) resolve('100점');
      else reject('100점이 아닙니다.');
  });
  try {
    let result = await promise; // 프라미스가 이행될 때까지 기다립니다.
    let result2 = await promise2(result); // result 값을 promise의 인자로 넘깁니다.
    alert(result2); // '100점'
  }
  catch(err) {
    alert(err); // '100점이 아닙니다'
  }
}

f(); // 실행
```

<br><br>

추가적으로, async는 function 앞에서 붙을 수 있기 때문에

class 내부의 function 앞에도 붙을 수 있습니다.

```jsx
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```

await와 async 키워드를 쓰는데 주의사항이 있습니다.

- await는 최상위 레벨코드에서는 동작하지 않습니다

```jsx
// 최상위 레벨 코드에선 문법 에러가 발생함
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

왜냐하면, async 키워드가 붙은 함수 내에서만 동작하기 때문입니다.