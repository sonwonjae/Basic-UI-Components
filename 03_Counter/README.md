# 3. Counter

![counter](/images/counter.gif)

## 요구사항

- 최소값은 0이다. 즉, 0과 양수만을 카운트한다.
- 클로저를 사용하여 상태(카운트 값)을 안전하게 변경하고 유지한다.

## TODO

1. 클로저를 통해 정보은닉 및 상태의 불변성을 지향
2. `onclick` 이벤트로 `increase`, `decrease` 바인딩

## Issue

- 클로저(모듈 패턴)에 대한 고민
- `Counter` 객체 범위에 대한 고민
  - 해당 디렉토리를 하나의 Component로 보느냐에 따라, 범위 선정이 가능할 것
