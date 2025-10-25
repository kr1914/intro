import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { ProfileSection } from "./ProfileSection";
import { FileText, Search, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: Date;
}

interface ReadOnlySidebarProps {
  posts: BlogPost[];
  selectedPostId: string | null;
  onSelectPost: (postId: string) => void;
  profileName: string;
  profileBio: string;
  profileImage: string;
  onToggleSidebar: () => void;
}

export function ReadOnlySidebar({
  posts,
  selectedPostId,
  onSelectPost,
  profileName,
  profileBio,
  profileImage,
  onToggleSidebar,
}: ReadOnlySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Array.from(new Set(posts.map((post) => post.category))))
  );

  // 필터링된 포스트
  const filteredPosts = posts.filter((post) => {
    const content = String(post.content || "");
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // 카테고리별로 그룹화
  const groupedPosts = filteredPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, BlogPost[]>);

  // 카테고리별로 날짜 정렬
  Object.keys(groupedPosts).forEach((category) => {
    groupedPosts[category].sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="h-full flex flex-col bg-muted/20">
      <ProfileSection
        name={profileName}
        bio={profileBio}
        imageUrl={profileImage}
        postsCount={posts.length}
        onToggleSidebar={onToggleSidebar}
      />

      <div className="p-4 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시글 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3">
          {Object.keys(groupedPosts).length === 0 ? (
            <div className="text-center text-muted-foreground p-8">
              <FileText className="mx-auto h-12 w-12 mb-3 opacity-30" />
              <p>{searchQuery ? "검색 결과가 없습니다" : "게시글이 없습니다"}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedPosts).map(([category, categoryPosts]) => (
                <div key={category} className="space-y-1">
                  {/* 카테고리 헤더 */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform ${
                          expandedCategories.has(category) ? "rotate-90" : ""
                        }`}
                      />
                      <span className="font-semibold text-sm uppercase tracking-wide text-foreground/80">
                        {category}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {categoryPosts.length}
                    </span>
                  </button>

                  {/* 포스트 목록 */}
                  {expandedCategories.has(category) && (
                    <div className="space-y-0.5 ml-2">
                      {categoryPosts.map((post) => (
                        <button
                          key={post.id}
                          onClick={() => onSelectPost(post.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-md transition-all group ${
                            selectedPostId === post.id
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "hover:bg-accent/70 text-foreground/90"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                                selectedPostId === post.id
                                  ? "bg-primary-foreground"
                                  : "bg-muted-foreground/40 group-hover:bg-primary"
                              }`}
                            />
                            <span className="text-sm leading-relaxed line-clamp-2">
                              {post.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}