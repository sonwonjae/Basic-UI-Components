# 6. Dark mode

![Dark mode](https://poiemaweb.com/assets/fs-images/exercise/dark-mode-toggle.gif)

## 요구사항

- 로컬스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.

- 로컬스토리지에 저장된 테마가 없다면 시스템 테마로 초기 렌더링한다.

- 테마를 적용하여 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.

- 토글 버튼을 클릭하면 로컬스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.

## TODO

1. css 변수 `--deg`를 활용하여 JS로 `Analog Clock` 조정
2. `Timeout` function 사용하여 ms 조정

### Refactoring

1. 최초 로드 시 버퍼 제거