import { Badge } from "./ui/badge";
import { Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

interface BlogViewerProps {
  title: string;
  content: string;
  category: string;
  date: Date;
}

export function BlogViewer({ title, content, category, date }: BlogViewerProps) {
  const safeContent = String(content || "");
  const wordCount = safeContent.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="h-full overflow-auto bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Badge variant="default" className="mb-4 text-xs px-3 py-1">
              {category}
            </Badge>
            <h1 className="text-4xl sm:text-5xl mb-6 leading-tight tracking-tight">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-b py-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString("ko-KR", { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime}분 읽기</span>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <span>{wordCount.toLocaleString()} 단어</span>
          </div>
        </header>

        {/* Content */}
        <article className="
          prose prose-slate prose-lg max-w-none dark:prose-invert
          
          /* 전체 스타일링 */
          prose-headings:font-bold prose-headings:tracking-tight
          prose-headings:scroll-mt-20
          
          /* 제목 스타일 */
          prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12 prose-h1:pb-4 prose-h1:border-b-2 prose-h1:border-primary/20
          prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-12 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
          prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-10 prose-h3:text-foreground
          prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-8
          
          /* 단락 */
          prose-p:text-foreground/90 prose-p:leading-[1.8] prose-p:my-5
          
          /* 링크 */
          prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:decoration-2 
          hover:prose-a:underline hover:prose-a:decoration-primary/50 prose-a:underline-offset-4
          prose-a:transition-all
          
          /* 강조 */
          prose-strong:text-foreground prose-strong:font-semibold
          prose-em:text-foreground/90 prose-em:italic
          
          /* 인라인 코드 */
          prose-code:bg-muted prose-code:text-primary 
          prose-code:px-2 prose-code:py-1 prose-code:rounded-md 
          prose-code:text-[0.9em] prose-code:font-mono
          prose-code:before:content-none prose-code:after:content-none
          prose-code:border prose-code:border-border/50
          
          /* 코드 블록 (pre) */
          prose-pre:bg-[#282c34] prose-pre:border prose-pre:border-border/50
          prose-pre:shadow-2xl prose-pre:rounded-xl prose-pre:my-8
          prose-pre:overflow-x-auto
          
          /* 리스트 */
          prose-ul:my-6 prose-ul:space-y-2
          prose-ol:my-6 prose-ol:space-y-2
          prose-li:text-foreground/90 prose-li:leading-relaxed
          prose-li:marker:text-primary
          
          /* 인용구 */
          prose-blockquote:border-l-4 prose-blockquote:border-primary 
          prose-blockquote:bg-primary/5 prose-blockquote:not-italic
          prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8
          prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm
          prose-blockquote:text-foreground/80
          
          /* 수평선 */
          prose-hr:border-border prose-hr:my-12
          
          /* 표 */
          prose-table:border-collapse prose-table:w-full prose-table:my-8
          prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold
          prose-td:p-3 prose-td:border-t prose-td:border-border
          prose-tr:border-b prose-tr:border-border
          
          /* 이미지 */
          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
        ">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // 체크박스 리스트 스타일링
              input({ node, ...props }) {
                if (props.type === 'checkbox') {
                  return (
                    <input
                      {...props}
                      className="mr-2 h-4 w-4 rounded border-2 border-primary/50 text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary"
                    />
                  );
                }
                return <input {...props} />;
              },
              
              // 체크박스가 포함된 리스트 아이템 스타일링
              li({ node, children, ...props }) {
                const childArray = Array.isArray(children) ? children : [children];
                const hasCheckbox = childArray.some(
                  (child: any) => 
                    child?.type === 'input' && 
                    child?.props?.type === 'checkbox'
                );
                
                if (hasCheckbox) {
                  return (
                    <li {...props} className="flex items-start gap-2 list-none">
                      {children}
                    </li>
                  );
                }
                
                return <li {...props}>{children}</li>;
              },
              
              // 인용구에 아이콘 추가
              blockquote({ node, children, ...props }) {
                return (
                  <blockquote {...props}>
                    <div className="flex gap-3">
                      <svg 
                        className="h-6 w-6 text-primary flex-shrink-0 mt-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <div className="flex-1">{children}</div>
                    </div>
                  </blockquote>
                );
              },
              
              // 수평선 스타일링
              hr({ node, ...props }) {
                return (
                  <hr {...props} className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                );
              },
              
              // 표 래퍼
              table({ node, children, ...props }) {
                return (
                  <div className="overflow-x-auto my-8 rounded-lg border border-border shadow-sm">
                    <table {...props} className="w-full">
                      {children}
                    </table>
                  </div>
                );
              },
              
              // 코드 블록에 언어 뱃지 추가
              pre({ node, children, ...props }) {
                const codeElement = (children as any)?.[0];
                const className = codeElement?.props?.className || '';
                const match = /language-(\w+)/.exec(className);
                const language = match ? match[1] : null;
                
                return (
                  <div className="relative group my-8">
                    {language && (
                      <div className="absolute top-0 right-0 z-10 bg-primary/90 text-primary-foreground text-xs px-3 py-1.5 rounded-bl-lg rounded-tr-lg font-mono">
                        {language}
                      </div>
                    )}
                    <pre {...props} className="hljs p-6 pt-10 rounded-xl overflow-x-auto">
                      {children}
                    </pre>
                  </div>
                );
              },
            }}
          >
            {safeContent}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
