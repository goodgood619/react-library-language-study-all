## private, protected 프로퍼티와 메소드

---

### private 프로퍼티

---

(주의 : 스펙에 추가된지 얼마 안 된 문법입니다)

private 프로퍼티와 메소드는 #으로 시작합니다.

또한 private 필드는 클래스 외부나 자손 클래스에서는 접근 할 수 없습니다.

```jsx
class CoffeeMachine {
  #waterLimit = 200;

  #checkWater(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    if (value > this.#waterLimit) throw new Error("물이 용량을 초과합니다.");
  }

}

let coffeeMachine = new CoffeeMachine();

// 클래스 외부에서 private에 접근할 수 없음
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
```

<br><br>

위의 문제는 get이나 set을 이용하거나 메소드를 통해 해결할 수 있습니다.

```jsx
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.waterAmount);// 100
alert(machine.#waterAmount); // Error
```

<br><br>

또한, 자손 클래스에서 부모 클래스의 private 필드값에 직접 접근을 할 수 없기 때문에 

부모 클래스의 set이나 get 메소드를 이용해서 해결을 해야 한다.

```jsx
class CoffeeMachine {

  #waterAmount = 500;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this.#waterAmount = value;
  }
}

class MegaCoffeeMachine extends CoffeeMachine {
  #waterAmount = 0;
  constructor(waterAmount) {
    super();
    this.#waterAmount = waterAmount;
  }
  method() {
    alert(this.#waterAmount);
  }
} 

let machine = new CoffeeMachine();
let mega =new MegaCoffeeMachine(50);
machine.waterAmount = 100;
alert(machine.waterAmount);// 100
mega.method(); // 50
```

<br><br><br>

### protected 프로퍼티

---

protected 프로퍼티는 private과 비슷하지만, 자손 클래스에서도 접근이 가능하다는 점이 다릅니다.

또한, protected 표기는 _을 이용해 사용합니다.

```jsx
class CoffeeMachine {
  _waterAmount = 0; // _을 사용해 protected 프로퍼티라는 것을 알 수 있습니다.

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);

// 물 추가
coffeeMachine.waterAmount = -10; // Error: 물의 양은 음수가 될 수 없습니다.
```

<br><br>

또한, protected 필드는 상속이 됩니다.

아래의 코드는 자식 class에서 부모 class의 protected 필드의 값을 변경하는 예제이다.

```jsx
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("물의 양은 음수가 될 수 없습니다.");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}
class Mega extends CoffeeMachine {

  addWaterAmount(coffeeMachine,addWater) {
    coffeeMachine.waterAmount += addWater; 
    this._waterAmount = coffeeMachine.waterAmount; 
		// this._waterAmount는 초기값은 0이다
		// 왜냐하면, protected 필드로 상속된 초기화 값이 0이기 때문이다
  }
}

// 커피 머신 생성
let coffeeMachine = new CoffeeMachine(100);
let mega = new Mega(100);
// 물 추가
coffeeMachine.waterAmount = 10; // Error: 물의 양은 음수가 될 수 없습니다.
mega.addWaterAmount(coffeeMachine,10000);
alert(mega.waterAmount);
alert(coffeeMachine.waterAmount);
alert(mega.waterAmount);
```