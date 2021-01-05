### Method와 This

---

- Method

객체 프로퍼티에 할당된 함수를 Method라고 부릅니다.

```jsx
let user = {
  name: "Jordan",
  age: 29
};

user.sayHi = function() { // sayHi에 function()... 이라는 메소드가 부여됩니다.
  alert("안녕하세요!");
}; 

user.sayHi(); // 안녕하세요!

//혹은 이미 정의된 함수에 대입을 해서 쓸 수도 있습니다.

function sayHi2() {
	alert("안녕하세요!");
}

user.sayHi2 = sayHi2;

user.sayHi2();
```

그런데, 메소드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있습니다.

이 때, 메소드 내부에서 'this'라는 키워드로 접근이 가능합니다.

```jsx
let user = {
  name: "Jordan",
  age: 29,

  sayHi() {
    // 'this'는 '현재 객체'를 나타냅니다.
    alert(this.name);
  }

};

user.sayHi(); // Jordan
```

여기서 <span style = "color : red">'this'</span>는 런타임 값에 결정이 됩니다. 컨텍스트에 따라 달라집니다.

```jsx
let user = { name: "Jordan" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용합니다.
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라지게 됩니다.
user.f(); // Jordan  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작합니다.)
```

그리고, 화살표 함수에는 'this'가 없다는 특징을 가지고 있습니다.

화살표 함수에서 'this'를 참조하면, <span style = "color:red">화살표 함수가 아니라 외부 함수에서 'this'값을 가지고 옵니다.</span>

```jsx
let user = {
  firstName: "보라",
  sayHi() {
    let arrow = (age) => {alert(this.firstName);
      alert(age);
      // alert(this.age); // undefined값
    }
    arrow(10);
  }
};
```