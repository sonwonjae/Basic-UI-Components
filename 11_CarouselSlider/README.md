# 11. Carosel Slider

![Carosel Slider](/images/carousel.gif)

## 요구사항

- 무한 루핑 기능을 지원한다.
- 슬라이딩 애니메이션을 지원한다.
- 각 슬라이드의 width/height는 가변적이다. 단, 모든 슬라이드의 width/height는 동일하다.
- 슬라이드 이동 버튼을 연타해도 이상없이 동작해야 한다.
- 캐러셀 슬라이더를 표시할 HTML 요소와 슬라이드 이미지의 url로 구성된 배열을 전달하면 동적으로 캐러셀 슬라이더를 생성한다.

## Issue

- [x] 무한 루핑(infinite looping)

  - 이미지 순서 교체 로직
    ![image replace logic](/images/image_replcement.png)

- [x] 연타 대응
  - `transitionend` 이벤트, 트렌지션이 끝났을 때, button event handler가 실행될 수 있도록 하여, 연타 이슈 대응
