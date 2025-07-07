"use client"

import { useState } from "react"

import { AdminLayout } from "@/components/layouts/admin/admin-layout"
import { AdminDashboard } from "@/features/admin/admin-dashboard"
import { Analytics } from "@/features/admin/analytics"
import { CampaignsManagement } from "@/features/admin/campaigns-management"
import { ForumPostsManagement } from "@/features/admin/forum-posts-management"
import { ReportsManagement } from "@/features/admin/reports-management"
import { SubscriptionPlans } from "@/features/admin/subscription-plans"
import { UsersManagement } from "@/features/admin/users-management"


type AdminPage = "dashboard" | "users" | "campaigns" | "forum-posts" | "reports" | "analytics" | "subscription-plans"

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<AdminPage>("dashboard")

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />
      case "users":
        return <UsersManagement />
      case "campaigns":
        return <CampaignsManagement />
      case "forum-posts":
        return <ForumPostsManagement />
      case "reports":
        return <ReportsManagement />
      case "analytics":
        return <Analytics />
      case "subscription-plans":
        return <SubscriptionPlans />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <AdminLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </AdminLayout>
  )
}
