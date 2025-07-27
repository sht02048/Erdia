# ERDia 📊

ERDia는 JSON 스키마 파일을 업로드하여 시각적인 ERD(Entity Relationship Diagram)를 생성하는 웹 애플리케이션입니다. 데이터베이스 스키마를 직관적으로 이해하고 테이블 간의 관계를 시각화할 수 있습니다.

## 🚀 주요 기능

- **JSON 스키마 업로드**: 데이터베이스 스키마 JSON 파일을 드래그 앤 드롭으로 업로드
- **인터랙티브 ERD**: React Flow를 사용한 드래그 가능한 테이블 노드
- **관계 시각화**: Foreign Key와 Primary Key 간의 관계를 선으로 표시
- **다크모드 지원**: 자동 테마 전환 및 사용자 선택 가능
- **반응형 디자인**: 다양한 화면 크기에 최적화

## 🛠 기술 스택

- **Frontend**: Next.js 15.4.4, React 19, TypeScript
- **스타일링**: Tailwind CSS 4, shadcn/ui
- **다이어그램**: React Flow (@xyflow/react)
- **상태관리**: Zustand
- **개발도구**: ESLint, TypeScript, Lefthook

## 📁 프로젝트 구조 (FSD Architecture)

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처 패턴을 따릅니다:

```
erdia/
├── app/                    # Next.js App Router (Layer 6)
│   ├── erd/               # ERD 페이지 라우트
│   ├── upload/            # 업로드 페이지 라우트
│   ├── globals.css        # 전역 스타일 & 테마 변수
│   └── layout.tsx         # 루트 레이아웃
│
├── src/                   # FSD 아키텍처 소스코드
│   ├── shared/           # Layer 1: 공통 재사용 코드
│   │   ├── ui/           # 재사용 가능한 UI 컴포넌트
│   │   │   ├── TableNode/        # 테이블 노드 컴포넌트
│   │   │   └── shadcn/           # shadcn/ui 컴포넌트들
│   │   ├── lib/          # 유틸리티 함수
│   │   │   └── erd-utils/        # ERD 변환 로직
│   │   ├── store/        # 전역 상태 관리
│   │   │   └── schema-store.ts   # 스키마 상태 스토어
│   │   └── config/       # 설정 파일
│   │       └── path.ts           # 경로 상수
│   │
│   ├── entities/         # Layer 2: 비즈니스 도메인 엔티티
│   │   └── table/        # 테이블 관련 타입 정의
│   │
│   ├── features/         # Layer 3: 사용자 상호작용 & 비즈니스 로직
│   │   └── process/      # 파일 처리 관련 기능
│   │
│   ├── widgets/          # Layer 4: 독립적인 UI 블록
│   │   ├── erd-flow/     # ERD 다이어그램 위젯
│   │   └── schema-upload/ # 스키마 업로드 위젯
│   │
│   └── page/             # Layer 5: 페이지 레벨 컴포넌트
│       ├── erd/          # ERD 페이지 컴포넌트
│       └── upload/       # 업로드 페이지 컴포넌트
│
├── sample-schemas/        # 예제 스키마 파일들
└── public/               # 정적 자원
```

### FSD 레이어 의존성 규칙

- **Shared**: 모든 레이어에서 사용 가능
- **Entities**: Shared만 import 가능
- **Features**: Entities, Shared import 가능
- **Widgets**: Features, Entities, Shared import 가능
- **Pages**: 모든 하위 레이어 import 가능
- **App**: 모든 레이어 import 가능

## 🚀 개발 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 3. 사용 방법

1. 업로드 페이지에서 JSON 스키마 파일을 드래그 앤 드롭
2. ERD 페이지로 자동 이동
3. 테이블을 드래그하여 원하는 위치로 이동
4. 테이블 간의 관계선을 통해 데이터베이스 구조 파악

## 📋 사용 가능한 스크립트

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 코드 린팅
npm run lint

# 타입 체킹
npm run type-check

# 인터랙티브 커밋 (커스텀 깃모지)
npm run commit
```

## 📝 JSON 스키마 형식

프로젝트에서 사용하는 JSON 스키마 형식은 다음과 같습니다:

```json
{
  "tables": [
    {
      "id": "users",
      "name": "users",
      "columns": [
        {
          "name": "id",
          "type": "INTEGER",
          "isPrimaryKey": true,
          "isNotNull": true,
          "isForeignKey": false
        }
      ]
    }
  ],
  "relationships": [
    {
      "id": "users-posts",
      "sourceTableId": "users",
      "targetTableId": "posts",
      "sourceColumn": "id",
      "targetColumn": "user_id",
      "type": "one-to-many"
    }
  ]
}
```

## 🤖 Claude Code와 함께 개발

이 프로젝트는 [Claude Code](https://claude.ai/code)를 활용하여 개발되었습니다.

### CLAUDE.md 파일

프로젝트 루트의 `CLAUDE.md` 파일에는 Claude Code가 프로젝트를 이해하고 작업할 때 필요한 중요한 정보들이 포함되어 있습니다:

- 프로젝트 개요 및 기술 스택
- FSD 아키텍처 구조와 규칙
- 개발 명령어 및 워크플로우
- 코드 스타일 가이드라인
- 특별 고려사항

### Claude Code 활용 방법

1. **아키텍처 준수**: FSD 구조와 import 규칙을 자동으로 따름
2. **일관된 코드 스타일**: 프로젝트의 기존 패턴을 학습하고 적용
3. **타입 안전성**: TypeScript 엄격 모드 준수
4. **테마 시스템**: CSS 변수 기반 테마 적용
5. **컴포넌트 개발**: 기존 컴포넌트 패턴을 참고하여 새로운 기능 구현

### 개발 워크플로우

Claude Code는 다음과 같은 워크플로우를 따릅니다:

- 코드 변경 전 기존 구조 분석
- FSD 레이어 규칙에 따른 파일 배치
- 자동 린팅 및 타입 체킹 실행
- 커밋 전 pre-commit 훅 실행
