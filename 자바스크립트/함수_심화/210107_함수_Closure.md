## Closure

---

Closure는 함수와 함수가 선언된 어휘적 환경의 조합이다.

Closure를 먼저 이해하기 위해서는 변수의 유효 범위를 어떻게 지정하는지(Lexical scoping)을 먼저 이해해야 합니다.

<br><br>

### 어휘적 범위 지정(Lexical scoping)

---

```jsx
function init() {
  var name = "Mozilla"; // name은 init에 의해 생성된 지역 변수이다.
  function displayName() { // displayName() 은 내부 함수이며, 클로저다.
    alert(name); // 부모 함수에서 선언된 변수를 사용한다.
  }
  displayName();
}
init();
```

name이란 변수는 init()함수에 있는데, displayName()이라는 함수에서 사용을 하고 있다.

Lexical scoping은 변수가 어디에서 사용이 가능한지 알기 위해,

그 변수가 소스코드 내 어디에 선언이 되었는지 고려한다는 것을 의미한다.


<br><br><br>

### Closure

---

Closure는 함수와 함수가 선언된 어휘적 환경의 조합이라고 정의를 했다.

이 의미를 Lexical Scoping과 연관지어서 설명하려 한다.

<br><br>

```jsx
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
//myFunc변수에 displayName을 리턴함
//유효범위의 어휘적 환경을 유지
myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)
```

위의 코드와 유사하지만, 다른 점이 있다.

1. 중첩된 함수(displayName)을 리턴한다
2. 이미 리턴된 함수는 내부의 중첩 함수(displayName)인데, 그 밖에 있는 변수인 name의 값에 접근을 한다

<br><br>

내부의 중첩된 함수가 리턴이 되었는데, 그 리턴되는 함수가 클로져를 형성한다는 의미이다.

부연하면, myFunc이라는 변수에 makeFunc 함수가 실행 될 때, 생성된 displayName 함수의 인스턴스에 대한 참조값이 들어가게 됩니다.

이 때, displayName의 인스턴스는 name이 displayName() 내부가 아니라, makeFunc()에 있기 때문에 어휘적 환경에 대한 참조를 유지하게 된다는 의미입니다.


<br><br>

또 다른 예제코드는 다음과 같습니다.

```jsx
function makeAdder(x) {
  var y = 1;
  return function(z) {
    y = 100;
    return x + y + z;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨

console.log(add5(2));  // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산
```

익명함수인 x+y+z 부분에서 x와 y의 변수의 범위가 외부에 있기 때문에, add5와 add10에  값이 리턴이 되어 할당이 된 이후에도 x값이 사라지지 않는다는 것이 Closure의 특징입니다.

<br><br><br>

### private method 흉내내기

---

이 특징을 이용하여 대표적으로 private-method를 흉내내볼 수 있습니다.

```jsx
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };
})(); //즉시 실행 함수 형태입니다.

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

위의 코드는 increment, decrement, value라는 익명함수를 통해 privateCounter라는 변수를 증감하는 코드입니다. 

3개의 익명함수 내부에는, changeBy라는 함수 그리고 privateCoutner라는 변수가 포함이 되어 있기 때문에 이 어휘적 환경이 공유가 되어 올바르게 증감을 할 수 있는 코드가 도출되게 된다.


<br><br><br>

### 실수(for loop)

---

흔히 저지르는 실수중 하나가 for loop에 관한 문장입니다.

```jsx
for(var i=0;i<10;i++) {
        setTimeout(function() {
            console.log(i);
        },0);
    }
```

이 코드는 0부터 9까지 출력되기를 기대하지만, 실제로는 10이 10개 출력이 되는 코드입니다.

왜냐하면, 익명함수가 호출되기 이전에 이미 i값이 for loop가 끝나서 10이 만들어 졌기 때문입니다.

<br><br>

그래서, 즉시 실행 함수 표현으로 만들면 다음과 같습니다.

```jsx
for (var i = 0; i < 10; i++) {
        (function (j) {
            setTimeout(function () {
                console.log(j);
            }, 0);
        })(i);
    }
```

setTimeout에 걸린 익명함수를 즉시 실행 함수로 만들어서, setTimeout이 j라는 변수 즉 i라는 변수를 기억하게 만들어 10개의 서로 다른 환경에서 i값을 출력하게 됩니다.