## Generator

일반 함수의 경우, 리턴값은 일반적으로 0개 혹은 1개를 반환합니다.

그러나, Generator를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환할 수 있습니다.

<br><br>

### Generator 함수

---

Generator는 Generator 함수라 불리는, **function***이 필요합니다.

형태는 다음과 같습니다.

```jsx
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// '제너레이터 함수'는 '제너레이터 객체'를 생성합니다.
let generator = generateSequence();
alert(generator); // [object Generator]
```

<br><br>

- 주요 메소드는 `next()`입니다.

동작 방식 : `next()`를 호출하면 가장 가까운 yield <value>문을 만날 때까지 실행이 지속됩니다(value를 생략할 수도 있는데, 이 경우엔 undefined가 됩니다). 이후, yield <value>문을 만나면 실행이 멈추고 산출하고자 하는 값인 value가 바깥 코드에 반환됩니다.

`next()`는 항상 아래 두 프로퍼티를 가진 객체를 반환합니다.

- `value`: 산출 값
- `done`: 함수 코드 실행이 끝났으면 `true`, 아니라면 `false`

<br><br>

하지만, 이렇게 리턴해야 하는 갯수가 많아지면 loop를 사용하는 것이 좋습니다.

next() 메소드를 통해 알 수 있는것은 iterator의 형태입니다.

이런 경우, `for..of`를 사용하여 값을 알아 낼수 있습니다.

```jsx
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2가 출력됨
}
```

그러나, 위의 경우를 출력하면 마지막 값인 리턴값 3이 출력이 안된다는 점입니다.

`for..of 에서는 done이 true이기 때문에, 출력이 안됩니다.`

<br><br>

그러므로, `마지막 값도 출력을 시키려면 yield 값을 사용`하면 됩니다.

```jsx
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2, 3
}
```

<br><br><br>

### yield*

---

추가적으로, yield*을 사용하면 제너레이터를 다른 제너레이터에 끼워넣을 수 있습니다.

```jsx
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);
	// for(let i = 48; i <= 57; i++) yield i;

  // A..Z
  yield* generateSequence(65, 90);
	// for(let i = 65 ; i <= 90 ; i++) yield i;

  // a..z
  yield* generateSequence(97, 122);
	// for(let i = 97 ; i<= 122 ;i++) yield i;

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

물론 yield* 대신, for loop를 사용해도 됩니다.

<br><br><br>

일반적으로, generator를 쓰는 경우는 데이터를 가져 오는데 시간이 많이 걸리지 않을 때 적합합니다.