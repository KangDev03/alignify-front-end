import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { Icons } from "@/components/icons/icons"
import type { Campaign } from "@/features/my-campaign/campaign.type"
import CampaignCard from "@/features/my-campaign/components/campaign-card"


const mockCampaigns2 = [
  {
    id: "1",
    title: "Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè",
    brand: "Beauty Co.",
    brandAvatar: "/placeholder.svg?height=40&width=40",
    description: "Tìm kiếm influencer để quảng cáo dòng sản phẩm chăm sóc da mùa hè",
    budget: "10,000,000 VND",
    deadline: "10/07/2025",
    requirements: "Follower > 10K, nữ, 18 tuổi-35 tuổi",
    category: "Làm đẹp",
    location: "TP. HCM",
    poster: "background-16x9.jpg",
    deliverables: ["3 bài đăng Instagram", "2 Stories", "1 Reel"],
    startDate: "2024-06-01",
    endDate: "2024-07-10",
  },
  {
    id: "2",
    title: "Review sản phẩm công nghệ mới nhất",
    brand: "TechViet",
    brandAvatar: "/placeholder.svg?height=40&width=40",
    description: "Cần influencer tech review các sản phẩm điện tử mới",
    budget: "15,000,000 VND",
    deadline: "15/07/2025",
    requirements: "Follower > 50K, am hiểu công nghệ",
    category: "Công nghệ",
    location: "Hà Nội",
    poster: "background-16x9.jpg",
    deliverables: ["2 video YouTube", "1 bài đăng blog"],
    startDate: "2024-06-15",
    endDate: "2024-07-15",
  },
]

const mockCampaigns: Campaign[] = [
  {
    campaignId: '1',
    campaignName: 'Chiến dịch quảng cáo sản phẩm làm đẹp mùa hè',
    brandName: 'Beauty Co.',
    brandAvartar: '/placeholder.svg?height=40&width=40',
    imageUrl: '/images/background-16x9.jpg',
    content: 'Tìm kiếm influencer để quảng bá dòng sản phẩm chăm sóc da mùa hè.',
    budget: 10000000,
    status: 'active',
    createdAt: [2024, 5, 15],
    startAt: [2024, 6, 1],
    dueAt: [2024, 7, 10],
    categories: [
      {
        categoryId: 'beauty',
        categoryName: 'Làm đẹp',
      },
    ],
    campaignRequirements: {
      followers: 10000,
      ageMin: 18,
      ageMax: 35,
    },
    influencerRequirements: ['Nữ', 'Follower > 10K'],
    influencerCountExpected: 5,
    influencerCountCurrent: 2,
  },
  {
    campaignId: '2',
    campaignName: 'Review sản phẩm công nghệ mới nhất',
    brandName: 'TechViet',
    brandAvartar: '/placeholder.svg?height=40&width=40',
    imageUrl: '/images/background-16x9.jpg',
    content: 'Cần influencer tech review các sản phẩm điện tử mới.',
    budget: 15000000,
    status: 'pending',
    createdAt: [2024, 5, 25],
    startAt: [2024, 6, 15],
    dueAt: [2024, 7, 15],
    categories: [
      {
        categoryId: 'tech',
        categoryName: 'Công nghệ',
      },
    ],
    campaignRequirements: {
      followers: 50000,
    },
    influencerRequirements: ['Am hiểu công nghệ', 'Follower > 50K'],
    influencerCountExpected: 3,
    influencerCountCurrent: 1,
  },
]

export default function Campaigns() {
  const dispatch = useDispatch();
  const { campaign } = useAppSelector((state) => state.homeRefetch);
  const {
    data: rawData,
    isLoading,
    refetch,
  } = useGetCampaignsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    if (campaign) {
      refetch();
      dispatch(setRefetch({ key: 'campaign', value: false }));
    }
  }, [campaign, refetch, dispatch]);
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow pt-0">
          <div className="w-full h-64 relative">
            <Skeleton className="w-full h-full object-cover" />
          </div>
          <CardContent className="px-6 w-full">
            <div className="flex gap-3 mb-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <div className="flex flex-row items-center justify-between">
                  <Skeleton className="h-6 w-100" />
                  <Skeleton className="h-6 w-16 ml-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{campaign.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Ngân sách</span>
                  <p className="text-green-600 font-semibold">{campaign.budget}</p>
                </div>
                <div>
                  <span className="font-medium">Deadline</span>
                  <p>{campaign.deadline}</p>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Yêu cầu</span>
                <p className="text-sm text-muted-foreground">{campaign.requirements}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icons.mapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{campaign.location}</span>
                </div>
                <Button size="sm" onClick={() => setSelectedCampaign(campaign)} className="bg-blue-600 hover:bg-blue-700">
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))} */}
        {mockCampaigns.map((campaign) => (
          <CampaignCard key={campaign.campaignId} campaign={campaign} />
        ))}
      </div>
      {/* <Dialog open={!!selectedCampaign} onOpenChange={(open) => !open && setSelectedCampaign(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedCampaign && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedCampaign.title}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedCampaign.brandAvatar || "/placeholder.svg"}
                        alt={selectedCampaign.brand}
                      />
                      <AvatarFallback>{selectedCampaign.brand.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{selectedCampaign.brand}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="w-full h-64 relative mt-4 rounded-lg overflow-hidden">
                <img
                  src={selectedCampaign.poster || "/placeholder.svg"}
                  alt={selectedCampaign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Mô tả chiến dịch</h4>
                  <p className="text-sm text-muted-foreground">{selectedCampaign.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Ngân sách</h4>
                    <p className="text-green-600 font-semibold">{selectedCampaign.budget}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Deadline</h4>
                    <p>{selectedCampaign.deadline}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Thời gian chiến dịch</h4>
                  <div className="flex items-center">
                    <Icons.calendar className="h-4 w-4 text-blue-500 mr-2" />
                    <span>
                      {new Date(selectedCampaign.startDate).toLocaleDateString("vi-VN")} -{" "}
                      {new Date(selectedCampaign.endDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2">Yêu cầu đối với influencer</h4>
                  <p className="text-sm text-muted-foreground">{selectedCampaign.requirements}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Nội dung yêu cầu</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedCampaign.deliverables.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {selectedCampaign.category}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Icons.mapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedCampaign.location}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">Apply ngay</Button>
                  <DialogClose asChild>
                    <Button variant="outline">Đóng</Button>
                  </DialogClose>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog> */}
    </>
  )
}
