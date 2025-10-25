import { useState } from "react";
import { ReadOnlySidebar } from "./components/ReadOnlySidebar";
import { BlogViewer } from "./components/BlogViewer";
import { BookOpen, PanelLeftOpen } from "lucide-react";
import { posts } from "./data/posts";
import { Resizable } from "re-resizable";
import { Button } from "./components/ui/button";

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(posts[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(384); // 384px = w-96

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* 사이드바 */}
      {isSidebarOpen ? (
        <Resizable
          size={{ width: sidebarWidth, height: "100%" }}
          onResizeStop={(e, direction, ref, d) => {
            setSidebarWidth(sidebarWidth + d.width);
          }}
          minWidth={280}
          maxWidth={600}
          enable={{
            right: true,
            top: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          handleStyles={{
            right: {
              width: '4px',
              right: 0,
              cursor: 'col-resize',
            }
          }}
          handleClasses={{
            right: 'hover:bg-primary/20 transition-colors'
          }}
          className="border-r flex-shrink-0"
        >
          <ReadOnlySidebar
            posts={posts}
            selectedPostId={selectedPostId}
            onSelectPost={setSelectedPostId}
            profileName="김개발"
            profileBio="생각을 글로 옮기는 개발자입니다. 코드와 일상을 기록합니다."
            profileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
            onToggleSidebar={() => setIsSidebarOpen(false)}
          />
        </Resizable>
      ) : (
        <div className="flex-shrink-0 border-r bg-muted/20 p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            title="사이드바 열기"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* 메인 뷰어 */}
      <div className="flex-1 overflow-hidden">
        {selectedPost ? (
          <BlogViewer
            title={selectedPost.title}
            content={selectedPost.content}
            category={selectedPost.category}
            date={selectedPost.date}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/5">
            <BookOpen className="h-24 w-24 mb-6 opacity-20" strokeWidth={1.5} />
            <h2 className="mb-2">블로그에 오신 것을 환영합니다</h2>
            <p className="text-center max-w-md">
              좌측에서 읽고 싶은 게시글을 선택하세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
