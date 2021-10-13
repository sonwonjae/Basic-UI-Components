# 13. Form validation

![Form validation](https://poiemaweb.com/assets/fs-images/exercise/form-validation-1.gif)

## 요구사항

- 아이디 입력 필드(#signin-userid)에는 이메일, 패스워드 입력 필드(#signin-password)에는 영문 또는 숫자를 6~12자를 입력해야 한다.

- 입력 필드에 적절한 형식의 값이 입력되지 않으면 해당 입력 필드에 유효성 검증 실패를 알리는 아이콘을 출력하고 해당 입력 필드 하단에 에러 메시지를 출력한다.

- 입력 필드에 적절한 형식의 값이 입력되면 해당 입력 필드에 유효성 검증 성공을 알리는 아이콘을 출력하고 해당 입력 필드 하단에 에러 메시지를 제거한다.

- submit 버튼은 모든 입력 필드에 적절한 형식의 값이 입력되었을 때만 활성화한다.

- submit 버튼을 클릭하면 로그인이 성공된 것으로 간주한다. 이때 모든 입력 필드의 값을 콘솔에 출력하고 Toaster UI를 사용해 로그인 성공을 사용자에게 알린다.

- ESM 모듈을 적극적으로 사용하여 소스 코드를 기능별로 분리한다.
  최대한 중복없이 가독성 좋게 구현한다.

## Todo

### refactoring

- validate All 메서드, 기본 로직에 별개로 input 이벤트에 따로 달아주기
