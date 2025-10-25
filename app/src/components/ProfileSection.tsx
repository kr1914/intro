import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { X, TrendingUp } from "lucide-react";
import { Badge } from "./ui/badge";

interface ProfileSectionProps {
  name: string;
  bio: string;
  imageUrl: string;
  postsCount: number;
  onToggleSidebar: () => void;
}

export function ProfileSection({ name, bio, imageUrl, postsCount, onToggleSidebar }: ProfileSectionProps) {
  return (
    <div className="p-6 border-b bg-gradient-to-b from-muted/30 to-background">
      <div className="flex items-start justify-between mb-4">
        <Avatar className="h-16 w-16 ring-2 ring-border">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} title="사이드바 최소화">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <h2 className="tracking-tight">{name}</h2>
        <p className="text-sm text-muted-foreground">{bio}</p>
        
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="h-3 w-3" />
            {postsCount}개의 포스트
          </Badge>
        </div>
      </div>
    </div>
  );
}