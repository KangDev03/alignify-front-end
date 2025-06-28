import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";

const mockData = {
  userdto: {
    userId: "u1",
    avatarUrl: "",
    name: "Minh"
  },
  comment: {
    commentId: "cmt1",
    content: "Quá tuyệt vời",
    createdAt: "28/06/2025"
  }
}

export default function CommentCard() {
  const { id } = useAppSelector((state: RootState) => state.auth);
  return <div className="flex gap-2">
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={mockData.userdto.avatarUrl || ''}
        alt={mockData.userdto.name}
        className="rounded-full object-cover h-8 w-8"
      />
      <AvatarFallback className="flex justify-center items-center">
        {"Minh".charAt(0) ?? 'U'}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col text-sm gap-1">
      <div className="bg-border w-fit rounded-2xl px-3 py-[6px]">
        <p className="font-semibold ">{id === mockData.userdto.userId ? "Bạn" : mockData.userdto.name}</p>
        <p className="font-normal">{mockData.comment.content}</p>
      </div>
      <p className="text-[10px] font-semibold ml-2">{mockData.comment.createdAt}</p>
    </div>
  </div>
}