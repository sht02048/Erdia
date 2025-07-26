module.exports = {
  types: [
    {
      value: "✨",
      name: "✨  Feature:   로직 추가, 변경, 삭제 등의 기능 작업",
    },
    {
      value: "♻️",
      name: "♻️   Refactor:  동작은 동일하나 내부 로직이 변경된 리팩토링",
    },
    {
      value: "🐛",
      name: "🐛  Fix:      의도된 동작과 다르게 구현된 버그 수정",
    },
    {
      value: "✏️",
      name: "✏️   Typo:     오타 수정, 번역, 주석 추가 등 로직과는 무관한 타이핑 작업",
    },
    {
      value: "🚚",
      name: "🚚  Move:     파일 및 폴더 위치 변경",
    },
    {
      value: "💄",
      name: "💄  Style:    로직이 아닌 스타일 변경",
    },
    {
      value: "✅",
      name: "✅  Test:     테스트코드 작성",
    },
    {
      value: "📦",
      name: "📦  Package:  패키지 설치",
    },
    {
      value: "🔧",
      name: "🔧  Config:   설정 변경",
    },
    {
      value: "🧹",
      name: "🧹  Chore:    그 외 작업",
    },
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: false,

  // override the messages, defaults are as follows
  messages: {
    type: "변경사항의 유형을 선택하세요:",
    scope: "변경 범위를 입력하세요 (선택사항):",
    customScope: "변경 범위를 입력하세요:",
    subject: "변경사항에 대한 간단한 설명을 입력하세요:\n",
    body: '변경사항에 대한 자세한 설명을 입력하세요 (선택사항). "|"를 사용하여 줄바꿈:\n',
    breaking: "Breaking Changes에 대한 설명 (선택사항):\n",
    footer: "이슈 번호가 있다면 입력하세요 (선택사항). 예: #31, #34:\n",
    confirmCommit: "위 내용으로 커밋하시겠습니까?",
  },

  allowCustomScopes: true,
  allowBreakingChanges: false,

  // limit subject length
  subjectLimit: 50,
  bodyLineLength: 72,
  footerPrefix: "ISSUES CLOSED:",
};
