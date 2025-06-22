import { useNavigate } from "react-router"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "@/components/icons/icons"
import { useAppSelector } from "@/hooks/redux"
import type { RootState } from "@/redux/store"

interface UserDropdownProps {
  onLogout: () => void
}

export function UserDropdown({ onLogout }: UserDropdownProps) {
  const navigate = useNavigate()
  const {name, avatarUrl, role} = useAppSelector((state: RootState) => state.auth)

  const handleToProfile = () => {
    navigate("/user-profile")
  }

  const handleToSetting = () => {
    navigate("/settings")
  }

  const displayName = name || "User"
  const displayAvatar = avatarUrl || "/placeholder.svg"
  const displayRole =
    role === "INFLUENCER"
      ? "Content Creator"
      : role === "BRAND"
      ? "Brand"
      : role === "ADMIN"
      ? "Admin"
      : "User"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 left-2" align="center" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{displayRole}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleToProfile}>
          <Icons.user className="mr-2 h-4 w-4" />
          <span>Hồ sơ</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToSetting}>
          <Icons.settings className="mr-2 h-4 w-4" />
          <span>Cài đặt</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={onLogout}>
          <Icons.logOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}