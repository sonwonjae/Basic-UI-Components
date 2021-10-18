# 9. Accordion (Collapse)

![Accordion](/images/accordion.gif)

## 요구사항

- 대상 요소의 height는 알 수 없다. 하지만 어떤 height라도 동작해야 한다.
- CSS transition을 이용하여 슬라이드 효과를 구현한다.
- CSS transition은 적절한 타이밍을 유지해야 한다. 다시 말해, 열고 닫히는 타이밍이 같아야 한다.

## Issue

- DOM redering timing 이슈
  - `height:0` transition(collapse) 이슈
  - js를 통한 height 동적할당, 초기 렌더링시 `height:auto`로 transition 제거
