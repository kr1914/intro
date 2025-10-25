import web_perform_post from '@posts/getting-started.md?raw'

export interface PostData {
  id: string;
  title: string;
  content: string;
  category: string;
  date: Date;
}

export const posts: PostData[] = [
  {
    id: "1",
    title: "글 작성 및 퍼블리싱 하는 방법",
    category: "블로그",
    date: new Date("2025-10-25"),
    content: web_perform_post,
  },
  {
    id: "2",
    title: "TypeScript 실전 팁 모음",
    category: "개발",
    date: new Date("2025-10-24"),
    content: web_perform_post,
  },
  {
    id: "3",
    title: "React Hooks 완벽 정리",
    category: "개발",
    date: new Date("2025-10-23"),
    content: web_perform_post,
  },
  {
    id: "4",
    title: "효율적인 개발 환경 만들기",
    category: "튜토리얼",
    date: new Date("2025-10-22"),
    content: web_perform_post,
  },
  {
    id: "6",
    title: "마크다운 완벽 가이드",
    category: "튜토리얼",
    date: new Date("2025-10-20"),
    content: web_perform_post,
  },
];
