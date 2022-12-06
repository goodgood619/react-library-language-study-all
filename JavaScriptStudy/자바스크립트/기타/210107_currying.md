## Currying

---

Currying은 f(a,b,c)처럼 단일 호출로 처리하는 함수를 f(a)(b)(c)처럼 각각의 인수가 호출 가능한 프로세스로 호출된후 병합되도록 변환하는 것입니다.

Currying은 함수를 호출하는 것이 아니라, **변환한다고 이해하는 것이 중요**합니다.

<br><br>


```jsx
function curry(f) { // 커링 변환을 하는 curry(f) 함수
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

동작 방식은 다음과 같습니다.

- `curry(func)`의 반환값은 `function(a)`형태의 래퍼입니다.
- `curriedSum(1)`같은 함수가 호출되었을 때, 그 인수는 렉시컬 환경에 저장이 되고 새로운 래퍼 `function(b)`이 반환됩니다.
- 그리고 반환된 `function(b)`래퍼 함수가 `2`를 인수로 호출됩니다. 그리고 반환값이 원래의 `sum`으로 넘겨져서 호출됩니다.


<br><br>

Currying은 호출해야하는 함수 중에 인자값을 고정시켜야 하는 경우가 있을 때 유용합니다.
prompt 함수를 이용하여 다음과 같이 샘플 코드를 작성해 보았습니다.

```jsx
function curry(f) { // 커링 변환을 하는 curry(f) 함수
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(prompt('숫자 입력',) )(2)); // 숫자 + 2 
// ex) 1 + 2 -> 12
```