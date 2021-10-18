# 8. Tabs

![Tabs](/images/tabs.gif)

## 요구사항

- fetchTabsData 함수를 사용해 탭 정보를 담고 있는 배열을 전달받아 Tabs를 생성한다.
- fetchTabsData 함수는 프로미스를 반환하며 이 프로미스가 fulfilled 상태가 될 때까지는 1초 소요된다. 프로미스가 fulfilled 상태가 될 때까지 스피너(.spinner 요소)를 표시한다.
- 탭 정보를 담고 있는 배열의 length는 가변적이다.

## Issue

- [x] `fetchTabsData`, Promise 비동기 처리
- [x] `--tabs-length` css vairable을 통한 동적 tab 개수 생성
- [x] resize event
- [x] 데이터 파싱 아이디어
  ```javascript
  const { titles, contents } = resolve.reduce(
    ({ titles, contents }, { title, content }, i) => ({
      titles: [...titles, `<div class="tab" data-index="${i}">${title}</div>`],
      contents: [
        ...contents,
        `<div class="tab-content ${i === currentTab ? 'active' : ''}">${content}</div>`,
      ],
    }),
    { titles: [], contents: [] },
  ```
