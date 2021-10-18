# 10. Toaster (Collapse)

![Toaster](/images/toast-ui.gif)

## 요구사항

- Success/Error/Warning 버튼을 클릭하면 해당 toast 요소를 생성해 뷰의 우측 하단에 표시한다.
- Success/Error/Warning toast 요소는 순차적으로 표시되어야 하며 일정 시간(3000ms) 후에 자동 제거되어야 한다.

## Issue

- 기 생성된 toast 위치 조절
  - `Array<Element>`, Toast Element로 구성된 배열을 선언
  - Toast 생성 시, Element `push`, 3초뒤 `shift`, `removeChild`
    ```javascript
    setTimeout(() => {
      document.body.removeChild(toasts.shift());
    }, 3000);
    ```
