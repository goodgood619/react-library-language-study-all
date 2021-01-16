## Form 프로퍼티와 메소드

<br>

input 태그와 같이 form을 만드는데 사용되는 관련 프로퍼티와 메소드들을 설명하도록 하겠습니다.

<br><br><br>

### Form 요소 탐색

---

Form은 `document.forms`.* 로 접근할수 있습니다.

```html
document.forms.my - 이름이 'my'인 폼
document.forms[0] - 문서 내의 첫 번째 폼
```

<br>

위 예시코드를 이용해 다음과 같이 이용할 수 있습니다.

```html
<!doctype html>
<body>
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // 폼 얻기
  let form = document.forms.my; // <form name="my"> 요소

  // 요소 얻기
  let elem = form.elements.one; // <input name="one"> 요소

  alert(elem.value); // 1
</script>
</body>
```

<br><br>

그러나, name이 같은 요소를 여러개 다뤄야 할 경우가 생깁니다.

```html
<!doctype html>

<body>
    <form>
        <input type="radio" name="age" value="10">
        <input type="radio" name="age" value="20">
        <form>
            <input type="radio" name="age2" value="30">
            <input type="radio" name="age2" value="40">
        </form>
    </form>

    <script>
        let form = document.forms[0];

        let ageElems = form.elements.age;
        alert(ageElems[0]); // [object HTMLInputElement]
        alert(ageElems[0].value); // 10
        alert(ageElems[1].value); // 20
        let form2 = document.forms[0].elements;
        let ageElems2 = form.elements.age2;
        alert(ageElems2[0].value); // 30
        alert(ageElems2[1].value); // 40
    </script>
</body>
```

form.elements.name 으로 접근해 해결할 수 있습니다. 

<br><br><br>

### element.form으로 역참조하기

---

위에서는 form으로 시작되어 자식의 요소들을 파악하는 형태로 코드를 작성할 수 있었습니다.

<br><br>

그러나, 반대로 자식노드로부터 부모노드로 올라가며 요소를 파악할수 있습니다.

```html
<!doctype html>
<body>
<form id="form">
  <input type="text" name="login">
</form>

<script>
  // 폼 -> 요소
  let login = form.login;

  // 요소 -> 폼
  alert(login.form); // HTMLFormElement
</script>
</body>
```

<br><br><br>

### input과 textaraea

---

input과 textarea 요소의 값은 `input.value`  또는 `input.checked`을 사용해 얻을 수 있습니다

```html
input.value = "New value";
textarea.value = "New text";

input.checked = true; // 체크박스나 라디오 버튼에서 쓸 수 있습니다.
```

<br><br><br>

### select와 option

---

select 요소에는 여러개의 option들 중, 초기에 미리 선택된 형태를 보여주는 3가지 방법이 있습니다.

1. 조건에 맞는 `<option>` 하위 요소를 찾아 `option.selected`속성을 `true`로 설정합니다.
2. `select.value`를 원하는 값으로 설정합니다.
3. `select.selectedIndex`를 원하는 option 번호로 설정합니다.

```html
<!doctype html>
<body>
<select id="select">
  <option value="apple">Apple</option>
  <option value="pear">Pear</option>
  <option value="banana">Banana</option>
</select>

<script>
  // 세 가지 코드의 실행 결과는 모두 같습니다.
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
</body>
```

위 코드를 실행하면, 다음처럼 초기의 형태인 banana가 선택이 됩니다.

![banana](image/banana.png)

<br><br>

만약, 여러개가 미리 선택된 경우를 보여주고 싶은 경우는 `multiple`과 `selected`를 이용해 표현할 수 있습니다.

 

```html
<!doctype html>
<body>
<select id="select" multiple>
  <option value="blues" selected>Blues</option>
  <option value="rock" selected>Rock</option>
  <option value="classic">Classic</option>
</select>

<script>
  // 선택한 값 전체
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
</body>
```