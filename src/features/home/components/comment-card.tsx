import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";
import { formatCommonLastTime, parseIsoToDateTime } from "@/utils/format";

import type { Comment } from "../home.type";

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  const { id } = useAppSelector((state: RootState) => state.auth);
  return <div className="flex gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={comment.avatarUrl || ''}
        alt={comment.name}
        className="rounded-full object-cover h-8 w-8"
      />
      <AvatarFallback className="flex justify-center items-center">
        {(comment.name?.charAt(0)) || 'U'}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col text-sm gap-1">
      <div className="bg-border w-fit rounded-2xl px-3 py-[6px]">
        <p className="font-semibold ">{id === comment.userId ? "Bạn" : comment.name}</p>
        <p className="font-normal">{comment.content}</p>
      </div>
      <p className="text-[10px] font-semibold ml-2">{formatCommonLastTime(parseIsoToDateTime(comment.createdDate))}</p>
    </div>
  </div>
}