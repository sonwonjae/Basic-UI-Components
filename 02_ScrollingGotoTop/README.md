# 2. Scrolling goto top

![Scrolling goto top](/images/scrolling-goto-top.gif)

## 요구사항

- 아래를 참조하여 일정 거리(예를 들어, 100px)만큼 스크롤되면 버튼을 활성화하고 그 버튼이 클릭되면 맨 위로 스크롤되도록 구현한다.

  - Window.pageYOffset
  - Window.scrollTo()
  - Window.scroll()

- scroll 이벤트는 짧은 시간 간격으로 연속해서 발생한다. 이벤트 핸들러가 과도하게 호출되지 않도록 한다.
  - <41장 3.디바운스와 스로틀> 참고

## TODO

1. `pageYoffset`이 100px을 넘어가면 `.scroll-icon` 활성화

2. `.scroll-icon`에 `onclick` 이벤트 추가

   - `scrollTo(0, 0)`

3. 스크롤 감지 이벤트 스로틀링

## Issue

- [x] Throttling
  - Custom 쓰로틀링 적용 -> 라이브러리(`Lodash`) 변경
    - 성능상 라이브러리가 유연함
