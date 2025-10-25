# 📝 새로운 포스트 발행 방법 (Vite 프로젝트)

Vite 기반 블로그 프로젝트에서 새로운 게시그를 추가하려면 아래 단계를 면 됩니다.

---

## 📂 1. Markdown 파일 작성

`/src/posts` 디렉토리에 새 `.md` 파일을 생성합니다.

예시:

```
src/
 └─ posts/
     ├─ web-performance.md
     └─ new-article.md  ← 새로 작성할 파일
```

예시 내용 (`new-article.md`):

```markdown
# 새로운 포스트 제목

여기에 본문 내용을 작성하세요.

## 섹션 제목
내용을 자유롭게 추가합니다.
```

---

## 📦 2. posts 데이터 등록

`/src/data/posts.ts` 파일을 열어서,

아래 예시처럼 새로 만든 Markdown 파일을 `import`한 뒤, `posts` 배열에 추가합니다.

```ts
import webPerformance from '@posts/getting-started.md?raw'
import newArticle from '@posts/new-article.md?raw'

export const posts = [
  {
    id: "1",
    title: "웹 성능 최적화 가이드",
    category: "개발",
    date: new Date("2025-10-25"),
    content: webPerformance,
  },
  {
    id: "2",
    title: "새로운 포스트 제목",
    category: "기술",
    date: new Date("2025-10-26"),
    content: newArticle, // 🔹 반드시 ?raw 로 불러와야 순수 Markdown 내용으로 import됨
  },
]
```

---

## 🦩 3. 결과 확인

Vite 개발 서버 실행:

```bash
npm run dev
```

브라우저에서 새로 등록한 포스트가 목록 또는 상세 페이지에 정상적으로 표시되는지 확인합니다.

---

## ✅ 요약

| 단계  | 설명                                              |
| --- | ----------------------------------------------- |
| 1️⃣ | `/src/posts` 폴더에 새 `.md` 파일 작성                  |
| 2️⃣ | `/src/data/posts.ts`에서 `import` + `posts` 배열 등록 |
| 3️⃣ | `?raw` 옵션을 꼭 붙여야 Markdown 원본 텍스트를 문자열로 읽음       |
| 4️⃣ | 개발 서버 실행 후 정상 표시 여부 확인                          |

---

> 💡 Tip
> Markdown 문서 내 코드 블록(```)이나 이미지 경로를 사용할 수 있으며,
> React에서 `react-markdown`으로 렌더링 시 자동으로 HTML로 변환됩니다.
