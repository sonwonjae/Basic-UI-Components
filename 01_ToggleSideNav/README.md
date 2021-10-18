# 1. Toggle side nav

![Toggle side nav](/images/toggle-side-nav.gif)

## 요구사항

- 페이지 상단 토글 버튼(i.toggle)이 클릭되면 사이드 내비게이션이 토글(오픈/클로즈)되도록 구현한다.
- 사이드 내비게이션이 포함된 페이지가 애플리케이션 내에 여러 개 존재한다고 가정하고 reload, 페이지 이동 시에도 이전에 적용된 사이드 내비게이션 상태가 동일하게 적용되도록 구현한다.
- 아이콘은 Boxicons을 사용한다.

## TODO

1. toggle 이벤트 구현

- `addEventListener`로 class toggle

2. 상태 저장

- local storage 사용

## Issue

- [x] DOM load Timing 이슈
  - `DOMContentLoaded`시점에 `no-transition` class 적용
  - `load`시점에 `transition` 재적용
