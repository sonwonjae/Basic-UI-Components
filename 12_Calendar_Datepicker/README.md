# 12. Calendar & Datepicker

![Calendar & Datepicker](/images/date-picker.gif)

## 요구사항

## Calendar

### 레이아웃

- flex는 1차원(선형) 레이아웃에 적합하고 grid는 2차원(매트릭스) 레이이웃에 적합하다. .calendar-nav 요소의 콘텐츠는 선형이고 .calendar-grid 요소의 콘텐츠는 매트릭스이므로 다음과 같이 레이아웃 시스템을 적용해 구현한다.

|   구성 요소    | 적용 레이아웃 |
| :------------: | :-----------: |
| .calendar-nav  |     flex      |
| .calendar-grid |     grid      |

#### When to use Flexbox and when to use CSS grid

- css 변수와 반응형 뷰

CSS의 미디어 쿼리(@media)는 HTML 요소를 기반으로 동작하지 않고 디바이스 또는 미디어 타입을 기반으로 동작한다. 따라서 미디어 쿼리로는 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 없다. 하지만 css 변수(css 커스텀 프로퍼티)를 사용하면 특정 HTML 요소의 width 값의 변화에 반응하는 뷰를 구현할 수 있다.

#### Responsive Designs and CSS Custom Properties: Building a Flexible Grid System

자바스크립트로 .calendar 요소의 width 값을 동적으로 변경할 경우를 대비해 css 변수를 사용하여 .calendar 요소의 width 값을 관리하려 한다. 다음과 같이 .calendar 요소의 width 값이 변경되면 캘린더 전체의 크기와 폰트 사이즈가 연동해서 조정되도록 뷰를 구현한다.

### 기능

- 현재를 기준으로 .calendar 요소의 콘텐츠를 동적으로 생성하여 초기 렌더링한다.
- .calendar-nav 요소의 버튼을 클릭하면 익월 또는 전월을 기준으로 .calendar 요소의 컨텐츠를 동적으로 생성하여 렌더링한다.

- 현재 표시 중인 달의 1일 앞과 말일 뒤에 이전 달과 다음 달의 날짜를 채운다.

- 캘린터에 오늘이 포함되어 있으면 구별할 수 있도록 표시한다.

- 일요일은 폰트 컬러를 빨간색으로 지정한다.

- 캘린터 크기는 동적으로 변경할 수 있어야 한다. 즉, 캘린터를 생성할 때 캘린터 크기를 지정할 수 있어야 한다.

- 날짜를 클릭하면 해당 날짜를 ‘yyyy-mm-dd’ 형식의 문자열로 콘솔에 출력한다.

---

<br>

## Date picker

- Date picker를 클릭(포커스)하면 캘린더가 렌더링된다. 이때 Date picker의 값은 빈문자열이다.

- Date picker는 read only하다.

- 캘린더의 날짜를 클릭하면 해당 날짜가 Date picker의 값으로 출력된다.

- 캘린더와 Date picker 이외의 영역을 클릭하면 캘린더가 사라진다.

- Date picker의 값이 존재할 때 Date picker를 다시 클릭(포커스)하면
  Date picker의 값을 기준으로 캘린더를 렌더링한다.
