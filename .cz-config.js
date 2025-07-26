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
  allowCustomScopes: false,
  subjectLimit: 72,

  // 이 항목에 나열된 질문은 전부 건너뜁니다
  skipQuestions: ["scope", "body", "footer"],

  // 남길 질문만 정의
  messages: {
    type: "커밋 유형을 선택하세요:",
    subject: "커밋 메시지를 작성하세요",
  },
};
