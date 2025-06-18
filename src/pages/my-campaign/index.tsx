"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Campaign } from "@/features/my-campaign/campaign.type"
import CampaignCard from "@/features/my-campaign/components/campaign-card"

const tabs = [
  { value: "draft", label: "Bản nháp" },
  { value: "active", label: "Đang chạy" },
  { value: "ended", label: "Đã kết thúc" },
]

// 🔸 Dữ liệu mẫu tạm thời
const mockCampaigns: Campaign[] = [
  {
    id: "cmp001",
    title: "Chiến dịch Tết 2025",
    description: "Chiến dịch quảng bá nước giải khát mùa Tết đến người tiêu dùng toàn quốc.",
    brand: "Coca-Cola",
    brandAvatar: "/brands/coca.png",
    budget: "200,000,000 VND",
    goals: ["Tăng nhận diện thương hiệu", "Tăng tương tác trên mạng xã hội"],
    status: "active",
    createdDate: "2024-12-01T00:00:00Z",
    startDate: "2025-01-01T00:00:00Z",
    endDate: "2025-02-01T00:00:00Z",
    category: ["Đồ uống", "Tết", "Thương hiệu lớn"],
    deliverables: ["1 video TikTok", "2 bài đăng Instagram", "1 story Facebook"],
    requirements: ["Tối thiểu 20k followers", "Đang hoạt động tại TP.HCM"],
    contactPerson: "Nguyễn Văn A",
    contactEmail: "nguyenvana@coca-cola.com",
    contactPhone: "0901234567"
  },
  {
    id: "cmp002",
    title: "Chiến dịch Back to School",
    description: "Quảng bá sản phẩm giày thể thao cho học sinh - sinh viên.",
    brand: "Biti's",
    brandAvatar: "/brands/bitis.png",
    budget: "120,000,000 VND",
    goals: ["Tăng lượt truy cập website", "Giới thiệu sản phẩm mới"],
    status: "draft",
    createdDate: "2025-06-10T00:00:00Z",
    startDate: "2025-07-01T00:00:00Z",
    endDate: "2025-08-15T00:00:00Z",
    category: ["Thời trang", "Học đường", "Giày dép"],
    deliverables: ["1 reel Instagram", "1 review YouTube"],
    requirements: ["Độ tuổi 18-24", "Có tệp người theo dõi học sinh – sinh viên"],
    contactPerson: "Trần Thị B",
    contactEmail: "ttb@bitis.com.vn",
    contactPhone: "0912345678"
  },
  {
    id: "cmp003",
    title: "Chiến dịch Giáng Sinh 2024",
    description: "Giới thiệu combo quà tặng Giáng Sinh tại hệ thống siêu thị VinMart.",
    brand: "VinMart",
    brandAvatar: "/brands/vinmart.png",
    budget: "150,000,000 VND",
    goals: ["Tăng doanh số bán hàng dịp Noel", "Lan tỏa hình ảnh thương hiệu"],
    status: "ended",
    createdDate: "2024-11-15T00:00:00Z",
    startDate: "2024-12-01T00:00:00Z",
    endDate: "2024-12-31T00:00:00Z",
    category: ["Siêu thị", "Giáng sinh", "Quà tặng"],
    deliverables: ["1 bài viết Facebook", "1 bộ ảnh sản phẩm"],
    requirements: ["Có kinh nghiệm chụp ảnh sản phẩm", "Đối tượng sống tại Hà Nội"],
    contactPerson: "Lê Văn C",
    contactEmail: "levanc@vinmart.vn",
    contactPhone: "0938123456"
  },
  {
    id: "cmp004",
    title: "Chiến dịch Mùa Hè Rực Rỡ",
    description: "Quảng bá kem chống nắng và sản phẩm chăm sóc da mùa hè của thương hiệu SunCare.",
    brand: "SunCare",
    brandAvatar: "/brands/suncare.png",
    budget: "100,000,000 VND",
    goals: ["Tăng tương tác Instagram", "Lan tỏa thương hiệu đến Gen Z"],
    status: "active",
    createdDate: "2025-03-15T00:00:00Z",
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-06-30T00:00:00Z",
    category: ["Làm đẹp", "Chăm sóc da", "Mùa hè"],
    deliverables: ["1 video TikTok", "1 bài viết blog"],
    requirements: ["Tệp người theo dõi nữ từ 18–30", "Nội dung sáng tạo, vui tươi"],
    contactPerson: "Phạm Thị D",
    contactEmail: "ptd@suncare.vn",
    contactPhone: "0978456123"
  },
  {
    id: "cmp005",
    title: "Chiến dịch Mở Rộng Thị Trường Miền Trung",
    description: "Chiến dịch đưa sản phẩm mì ăn liền vào thị trường miền Trung.",
    brand: "Acecook",
    brandAvatar: "/brands/acecook.png",
    budget: "180,000,000 VND",
    goals: ["Tăng độ phủ sản phẩm", "Thúc đẩy dùng thử tại khu vực miền Trung"],
    status: "draft",
    createdDate: "2025-06-01T00:00:00Z",
    startDate: "2025-07-10T00:00:00Z",
    endDate: "2025-08-30T00:00:00Z",
    category: ["Thực phẩm", "Miền Trung", "Dùng thử"],
    deliverables: ["1 video nấu ăn", "2 story Instagram", "1 mini game Facebook"],
    requirements: ["Đang hoạt động tại Đà Nẵng hoặc Huế", "Đã từng hợp tác với brand thực phẩm"],
    contactPerson: "Ngô Văn E",
    contactEmail: "nve@acecook.com.vn",
    contactPhone: "0905678123"
  },
  {
    id: "cmp006",
    title: "Chiến dịch Thử Thách Sáng Tạo Cùng Galaxy Z Flip",
    description: "Mời các influencer thử nghiệm và chia sẻ trải nghiệm sáng tạo với Galaxy Z Flip5.",
    brand: "Samsung",
    brandAvatar: "/brands/samsung.png",
    budget: "250,000,000 VND",
    goals: ["Tăng nhận diện sản phẩm mới", "Khuyến khích tạo nội dung sáng tạo"],
    status: "active",
    createdDate: "2025-04-01T00:00:00Z",
    startDate: "2025-05-15T00:00:00Z",
    endDate: "2025-07-15T00:00:00Z",
    category: ["Công nghệ", "Lifestyle", "TikTok Challenge"],
    deliverables: ["1 video trải nghiệm", "1 bài review Instagram", "1 TikTok challenge"],
    requirements: ["Tối thiểu 50k followers", "Tệp người theo dõi quan tâm công nghệ"],
    contactPerson: "Lê Minh F",
    contactEmail: "minh.le@samsung.com",
    contactPhone: "0961122334"
  },
  {
    id: "cmp007",
    title: "Chiến dịch Trà Sữa Tươi Truyền Thống",
    description: "Giới thiệu sản phẩm trà sữa thuần Việt mang đậm hương vị truyền thống.",
    brand: "Phúc Long",
    brandAvatar: "/brands/phuclong.png",
    budget: "130,000,000 VND",
    goals: ["Tăng lượng khách hàng mới", "Giới thiệu sản phẩm truyền thống"],
    status: "ended",
    createdDate: "2025-01-10T00:00:00Z",
    startDate: "2025-02-01T00:00:00Z",
    endDate: "2025-03-01T00:00:00Z",
    category: ["Đồ uống", "Truyền thống", "Ẩm thực Việt"],
    deliverables: ["1 clip trải nghiệm", "1 ảnh sản phẩm", "1 bài post kèm hashtag"],
    requirements: ["Ưu tiên KOL ẩm thực", "Có followers Việt Nam >80%"],
    contactPerson: "Vũ Thị G",
    contactEmail: "vu.g@phuclong.vn",
    contactPhone: "0919789456"
  },
  {
    id: "cmp008",
    title: "Chiến dịch Du Lịch Hè Cùng Vietnam Airlines",
    description: "Thúc đẩy hành khách đặt vé máy bay sớm và giới thiệu dịch vụ mới.",
    brand: "Vietnam Airlines",
    brandAvatar: "/brands/vnairlines.png",
    budget: "300,000,000 VND",
    goals: ["Thúc đẩy đặt vé trước", "Tăng nhận diện thương hiệu", "Chia sẻ trải nghiệm"],
    status: "draft",
    createdDate: "2025-06-01T00:00:00Z",
    startDate: "2025-06-20T00:00:00Z",
    endDate: "2025-08-20T00:00:00Z",
    category: ["Du lịch", "Hàng không", "Trải nghiệm dịch vụ"],
    deliverables: ["1 video TikTok", "1 ảnh Instagram", "1 bài review blog"],
    requirements: ["Đã từng hợp tác với hãng du lịch", "Followers yêu thích du lịch >60%"],
    contactPerson: "Đỗ Thanh H",
    contactEmail: "thanh.do@vna.com.vn",
    contactPhone: "0948231789"
  }
]

export default function MyCampaignPage() {
  const [activeTab, setActiveTab] = useState("draft")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCampaigns = mockCampaigns.filter(
    (campaign) =>
      campaign.status === activeTab &&
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Chiến dịch của tôi</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Tab bar */}
            <TabsList className="flex-1 flex justify-between items-center rounded-md px-2 py-1 gap-[10px]"
              style={{
                width: "715px",
                height: "40px",
              }}
            >
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Search bar */}
            <div className="relative flex items-center">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input
                placeholder="Tìm kiếm chiến dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full h-full"
              />
            </div>
          </div>


        <TabsContent value={activeTab}>
          <div className="grid grid-cols-2 gap-4">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Không có chiến dịch nào.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
