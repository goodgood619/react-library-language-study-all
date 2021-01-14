## getElement*, querySelector*로 요소 검색

---

요소들이 가까이 붙어 있지않고, 좀 더 자유자재로 원하는 것을 하기 위해서는

**getElement***, **querySelector*** 키워드를 이용하면 됩니다.


<br><br><br>

### document.getElementById

---

**요소에 id 속성이 있으면 document.getElementById(id)를 이용해 접근 가능**합니다

```html
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
  // 요소 얻기
  let elem = document.getElementById('elem');

  // 배경색 변경하기
  elem.style.background = 'red';
</script>
```

<br><br><br>

### querySelector

---

또 다른 방법으로는 **querySelector** 방법입니다.

elem.querySelector(css)는 css 선택자에 해당하는 요소를 찾으면 검색을 멈춥니다.

그래서 **elem.querySelectorAll(css) 방법보다 더 빠르다**는 장점이 있습니다.

<br><br><br>

### getElementsBy*

---

태그나 클래스 등을 이용해 원하는 요소를 찾아주는 메소드도 있습니다.

다만, **getElementsBy***는 지금은 잘 쓰이지 않습니다.

```html
<form name="my-form">
  <div class="article">글</div>
  <div class="long article">내용이 긴 글</div>
</form>

<script>
  // name 속성을 이용해 검색
  let form = document.getElementsByName('my-form')[0];

  // fomr 내에서 클래스 이름을 이용해 검색
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2. 클래스 속성값이 'article'인 요소는 2개입니다.
</script>
```

<br><br><br>


### 살아있는 컬렉션

---

**querySelectorAll** 방법과 **getElementsBy***의 방법을 비교해보면,

컬렉션의 자동 갱신 유무라고 볼 수 있습니다.

먼저, **getElementsBy*는 컬렉션이 자동 갱신되어 최신 상태를 유지**합니다.

```html
<div>첫 번째 div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>두 번째 div</div>

<script>
  alert(divs.length); // 2
</script>
```

그러나, **querySelectorAll은 정적인 컬렉션을 반환**합니다.

```html
<div>첫 번째 div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>두 번째 div</div>

<script>
  alert(divs.length); // 1
</script>
```

두 번째 div가 생겼지만, 여전히 값은 1로 고정이 되어있습니다