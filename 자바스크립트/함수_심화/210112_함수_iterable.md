## iterable 객체


`반복 가능한(iterable) 객체는 배열을 일반화한 객체`입니다. iterable 객체는 어떤 객체든지 간에, for...of 문장을 적용시킬수 있습니다.

<br><br><br>

### Symbol.iterator

---

직접 iterable 객체를 만들어 iterable 이라는 개념을 적용해 보겠습니다.

다음처럼 iterable 하지 않은 객체가 있습니다.

```jsx
let range = {
	from : 1,
	to : 5
};
```

<br><br>

range라는 변수를 iterable하게 만들기 위해서는, Symbol.iterator라는 메소드를 추가해 만들어야 합니다.

1. `for..of`가 시작되자마자 `for..of`는 `Symbol.iterator`를 호출합니다(`Symbol.iterator`가 없으면 에러가 발생합니다). `Symbol.iterator`는 반드시 *이터레이터(iterator, 메서드 `next`가 있는 객체)* 를 반환해야 합니다.
2. 이후 `for..of`는 *반환된 객체(이터레이터)만*을 대상으로 동작합니다.
3. `for..of`에 다음 값이 필요하면, `for..of`는 이터레이터의 `next()`메서드를 호출합니다.
4. `next()`의 반환 값은 `{done: Boolean, value: any}`와 같은 형태이어야 합니다. `done=true`는 반복이 종료되었음을 의미합니다. `done=false`일땐 `value`에 다음 값이 저장됩니다.

<br><br>

Symbol.iterator를 적용하면 다음과 같은 코드로 변경됩니다.

```jsx
let range = {
  from: 1,
  to: 5
};

// 1. for..of 최초 호출 시, Symbol.iterator가 호출됩니다.
range[Symbol.iterator] = function() {

  // Symbol.iterator는 이터레이터 객체를 반환합니다.
  // 2. 이후 for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해집니다.
  return {
    current: this.from,
    last: this.to,

    // 3. for..of 반복문에 의해 반복마다 next()가 호출됩니다.
    next() {
      // 4. next()는 값을 객체 {done:.., value :...}형태로 반환해야 합니다.
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 이제 의도한 대로 동작합니다!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

<br><br>

다음의 코드처럼 이터레이터 객체(Symbol.iterator)부분과 반복 대상 객체(next()) 부분을 객체 내부에 합쳐서 만들 수도 있습니다.

```jsx
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

주의 사항으로는, `두 개의 for..of 반복문을 하나의 객체에 동시에 사용 할 수 없다`는 것입니다.

또한, iterable과 유사 배열은 다른 용어 입니다.

<br><br><br>

### iterable과 유사 배열

---

- *이터러블(iterable)* 은 위에서 설명한 바와 같이 메서드 `Symbol.iterator`가 구현된 객체입니다.
- *유사 배열(array-like)* 은 인덱스와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체입니다.

<br><br>

아래의 코드는 유사 배열의 형태처럼 보이지만, iterable하진 않습니다.

```jsx
let arrayLike = { // 인덱스와 length프로퍼티가 있음 => 유사 배열
  0: "Hello",
  1: "World",
  length: 2
};

// Symbol.iterator가 없으므로 에러 발생
for (let item of arrayLike) {}
```

iterable객체나 유사 배열의 경우 배열이 아니기 때문에, 배열과 관련한 메소드를 따로 지원해 주지는 않습니다. 

<br><br><br>

### Array.from

---

Array.from을 사용하게 되면, iterable 객체나 유사 배열을 배열로 만들수 있습니다.

```jsx
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); // World (메서드가 제대로 동작합니다.)

// 혹은

// range는 챕터 위쪽 예시에서 그대로 가져왔다고 가정합시다.
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (배열-문자열 형 변환이 제대로 동작합니다.)
```

문법적인 형태는 다음과 같습니다.

```jsx
Array.from(obj[, mapFn, thisArg])
```

mapFn을 두 번째 인수로 넘겨주면 새로운 배열에 obj의 요소를 추가하기 전에 각 요소를 대상으로 mapFn을 적용할 수 있습니다. 새로운 배열엔 mapFn을 적용하고 반환된 값이 추가됩니다. 세 번째 인수 thisArg는 각 요소의 this를 지정할 수 있도록 해줍니다.

<br><br>

예시 코드로는 다음과 같습니다.

```jsx
// range는 챕터 위쪽 예시에서 그대로 가져왔다고 가정합시다.

// 각 숫자를 제곱
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```