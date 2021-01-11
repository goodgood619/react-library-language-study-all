## defer와 async

<br>

브라우저는 HTML을 읽다가 `<script>...</script> 태그를 만나면 스크립트를 먼저 실행해야 하므로 DOM 생성을 멈춥니다`. 이는 src 속성이 있는 외부 스크립트 <script src="..."></script>를 만났을 때도 마찬가지입니다. 외부에서 스크립트를 다운받고 실행한 후에야 남은 페이지를 처리할 수 있습니다

이와 같이 overhead가 발생하는 현상을 줄이기 위해, `defer`와 `async`라는 2가지 방법을 통해 해결할 수 있습니다.

<br><br><br>

### defer

---

브라우저는 defer 속성이 있는 스크립트를 백그라운드에서 다운로드 합니다. 

defer 속성이 있는 스크립트를 다운로드 하는 중에도 HTML 파싱이 멈추지 않습니다. 

그리고 defer 속성이 있는 스크립트 실행은 페이지 구성이 끝날 때까지 지연된다는 특징이 있습니다.

(defer 속성이 있는 스크립트를 지연 스크립트 혹은 defer 스크립트라고 부릅니다)

```html
<!doctype html>
<body>
<p>...스크립트 앞 콘텐츠...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- 바로 볼 수 있네요! -->
<p>...스크립트 뒤 콘텐츠...</p>
</body>
```

<br><br>

지연 스크립트는 DOM이 준비된 후에 실행되긴 하지만, DOMContentLoaded 이벤트 발생 전에 실행됩니다

```html
<!doctype html>
<body>
<p>...스크립트 앞 콘텐츠...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("`defer` 스크립트가 실행된 후, DOM이 준비되었습니다!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...스크립트 뒤 콘텐츠...</p>
</body>
```

<br><br>

그리고,지연 스크립트는 HTML에 추가된 순서대로 실행이 됩니다.

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

small.js파일이 먼저 다운로드 된다고 하더라도, `실행의 순서는 long.js부터 순차적으로 실행` 됩니다.

유의 사항은, `defer 속성은 src 가 없으면 무시`됩니다.

<br><br>

### async

---

async 스크립트도 defer 스크립트 처럼 백그라운드에서 다운로드 됩니다.

그러나, 다음과 같은 차이점을 보이고 있습니다.

- async 스크립트는 defer 스크립트와 마찬가지로 백그라운드에서 다운로드됩니다. 따라서 HTML 페이지는 async 스크립트 다운이 완료되길 기다리지 않고 페이지 내 콘텐츠를 처리, 출력합니다(`하지만 async 스크립트 실행중에는 HTML 파싱이 멈춥니다`).
- `DOMContentLoaded` 이벤트와 async 스크립트는 서로를 기다리지 않습니다.
    - 페이지 구성이 끝난 후에 async 스크립트 다운로딩이 끝난 경우, `DOMContentLoaded`는 async 스크립트 실행 전에 발생할 수 있습니다,
    - async 스크립트가 짧아서 페이지 구성이 끝나기 전에 다운로드 되거나 스크립트가 캐싱처리 된 경우, `DOMContentLoaded`는 `async` 스크립트 실행 후에 발생할 수도 있습니다.
- 다른 스크립트들은 `async` 스크립트를 기다리지 않습니다. `async` 스크립트 역시 다른 스크립트들을 기다리지 않습니다.
<br><br>

async의 특징들 때문에, async 스크립트가 여러 개 있는 경우 실행 순서는 항상 제각각일 수 밖에 없게 됩니다. `실행은 다운로드가 끝난 스크립트 순서대로 실행` 됩니다.

```html
<!doctype html>
<body>
<p>...스크립트 앞 콘텐츠...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM이 준비 되었습니다!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...스크립트 뒤 콘텐츠...</p>
</body>
```