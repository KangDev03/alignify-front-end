import { Outlet } from 'react-router'

import AppFooter from '@/components/layouts/app/footer'
import { AppHeader } from '@/components/layouts/app/header'

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader
        userRole={"influencer"}
        currentPage={"home"}
        onPageChange={(page) => console.log(`Page changed to: ${page}`)}
        onLogout={() => console.log('User logged out')}
        userName={"KangDev"}
        userAvatar={"https://avatars.githubusercontent.com/u/12345678?v=4"}
      />
      <main className="container mx-auto px-20 py-8">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}

export default AppLayout