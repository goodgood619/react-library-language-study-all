## HTML Head


이번에는 HTML Head의 구조를 살펴 보겠습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My test page</title>
  </head>
  <body>
    <p>This is my page</p>
  </body>
</html>
```

title element와 meta element로 기본 구성이 이루어진것을 알수 있습니다.

<br><br><br>

### title element

---

우선, title element는 웹 페이지의 전체 제목을 의미 하는것 뿐만 아니라 내용물을 추천하는 북마크 이름으로 사용되기도 하며, 검색결과로도 사용이 될 수 있습니다.

주의 사항은, `head 내부의 title element와 body 내부의 h1 element가 같지 않다는 점`입니다.

title element는 웹 페이지의 전체 제목을 의미하는 것이고, h1 element는 웹 페이지 내부의 최상단에 위치한 제목의 요소를 가리킵니다.

<br><br><br>

### meta element

---

meta element의 첫 번째 기능은 `문서의 character encoding을 정하는 것`입니다.

```html
<meta charset="utf-8">
```

<br><br>

두 번째 기능은 `저자와 설명`을 추가할수 있습니다.

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

저자를 지정하는 것은 콘텐츠 작성자에 대한 정보를 볼 수 있게 해준다.

또한, 저 기능들을 이용하면 검색엔진에도 노출이 될 수 있다.

<br><br><br>

### Other Types of metadata

---

웹 사이트 내부에는 다른 종류의 메타데이터 형태들도 종종 발견 되곤 합니다.

예를 들면, Open Graph Data 는 Facebook이 웹 사이트에 더 풍부한 메타 데이터를 제공하기 위해 발명한 메타 데이터 프로토콜입니다.

예시코드는 다음과 같습니다.

```html
<meta property="og:image" content="https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

<br><br><br>

### HTML에 CSS 및 JavaScript 적용

---

CSS 는 link element를 이용해 사용 될 수 있고, JavaScript는 script element를 이용해 사용 될 수 있습니다. 

<br><br>

- link

`link는 항상 head` 부분에 위치합니다

```html
<link rel="stylesheet" href="my-css-file.css">
```

rel 속성은 stylesheet라는 파일의 형태를 의미하며, href는 그 파일의 경로를 포함합니다.

<br><br>

- script

```html
<script src="my-js-file.js"></script>
```

`/body 태그 바로 앞, 문서 본문의 맨 끝에 넣는 것이 좋으며`, JavaScript를 적용하기 전에 모든 HTML 내용을 브라우저에서 읽었는지 확인하는 것이 좋다.