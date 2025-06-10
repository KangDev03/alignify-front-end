"use client"

import { Button } from "@/components/ui/button"

import { Icons } from "@/components/icons/icons"
import { UserDropdown } from "@/components/layouts/app/user-dropdown"
import { ThemeToggle } from "@/components/theme/theme-toggle"

type UserRole = "influencer" | "brand"
type CurrentPage = "home" | "dashboard" | "profile" | "campaigns" | "applications" | "analytics"

interface HeaderProps {
  userRole: UserRole
  currentPage: CurrentPage
  onPageChange: (page: CurrentPage) => void
  onLogout: () => void
  userName: string
  userAvatar: string
}

export function AppHeader({ userRole, currentPage, onPageChange, onLogout, userName, userAvatar }: HeaderProps) {
  const navigationItems =
    userRole === "influencer"
      ? [
        { id: "home", label: "Trang chủ", icon: Icons.home },
        { id: "campaigns", label: "Chiến dịch", icon: Icons.megaphone },
        { id: "applications", label: "Đơn ứng tuyển", icon: Icons.fileText },
        { id: "analytics", label: "Thống kê", icon: Icons.barChart3 },
      ]
      : [
        { id: "home", label: "Khám phá", icon: Icons.home },
        { id: "campaigns", label: "Chiến dịch của tôi", icon: Icons.megaphone },
        { id: "applications", label: "Ứng viên", icon: Icons.fileText },
        { id: "analytics", label: "Báo cáo", icon: Icons.barChart3 },
      ]

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 bg-secondary-background ">
      <div className="container mx-auto px-16 py-3">
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-3xl">Alignify</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : null}
                  size="sm"
                  onClick={() => onPageChange(item.id as CurrentPage)}
                  className="flex justify-center items-center space-x-2 !h-10"
                >
                  <Icon />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <Button size="icon" className="bg-transparent relative">
              <Icons.bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full text-xs"></span>
            </Button>
            <ThemeToggle />
            <UserDropdown
              userName={userName}
              userAvatar={userAvatar}
              userRole={userRole}
              onPageChange={onPageChange}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
