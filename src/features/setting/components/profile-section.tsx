import { useState } from 'react';
import { Camera, Plus, Save, Star, X } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import type { Category } from '@/features/common/common.type';
import type { InfluencerData } from '@/features/profile/profile.type';
import { useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import type { RootState } from '@/redux/store';

export default function ProfileSection() {
  const { role: roleName } = useAppSelector((state: RootState) => state.auth);
  const [newSocialMedia, setNewSocialMedia] = useState({ platform: '', url: '' });

  const [profileData, setProfileData] = useState<InfluencerData>({
    userId: "user123",
    name: "Nguyễn Thị Lan",
    email: "lan@example.com",
    roleId: "influencer",
    avatarUrl: "/placeholder.svg?height=80&width=80",
    backgroundUrl: "/placeholder.svg?height=200&width=800",
    doB: [1995, 3, 15], // March 15, 1995
    gender: "female",
    bio: "Content creator chuyên về lifestyle và beauty. Yêu thích chia sẻ những trải nghiệm cuộc sống và tips làm đẹp.",
    socialMediaLinks: [
      { key: "instagram" }, "https://instagram.com/nguyenthilan",
      { key: "tiktok" }, "https://tiktok.com/@nguyenthilan",
      { key: "youtube" }, "https://youtube.com/nguyenthilan"
    ],
    rating: 4.8,
    categories: [
      { categoryId: "1", categoryName: "Thời trang" },
      { categoryId: "2", categoryName: "Làm đẹp" },
      { categoryId: "3", categoryName: "Lifestyle" }
    ],
    follower: 326000,
    isPublic: true,
    completedCampaign: 24
  });

  const MAX_CATEGORIES = 3

  // Mock available categories - trong thực tế sẽ lấy từ API
  const availableCategories: Category[] = [
    { categoryId: "1", categoryName: "Thời trang" },
    { categoryId: "2", categoryName: "Làm đẹp" },
    { categoryId: "3", categoryName: "Lifestyle" },
    { categoryId: "4", categoryName: "Công nghệ" },
    { categoryId: "5", categoryName: "Ẩm thực" },
    { categoryId: "6", categoryName: "Du lịch" },
    { categoryId: "7", categoryName: "Thể thao" },
    { categoryId: "8", categoryName: "Giải trí" },
    { categoryId: "9", categoryName: "Giáo dục" },
    { categoryId: "10", categoryName: "Sức khỏe" },
  ]

  const handleSelectCategory = (category: Category) => {
    const current = profileData.categories || []
    const isSelected = current.some((cat) => cat.categoryId === category.categoryId)

    if (isSelected) {
      // Remove category
      const updatedCategories = current.filter((cat) => cat.categoryId !== category.categoryId)
      setProfileData({ ...profileData, categories: updatedCategories })
    } else {
      // Add category (with max limit)
      if (current.length >= MAX_CATEGORIES) {
        // Replace the last category if at max limit
        const updatedCategories = [...current.slice(0, MAX_CATEGORIES - 1), category]
        setProfileData({ ...profileData, categories: updatedCategories })
      } else {
        // Add new category
        const updatedCategories = [...current, category]
        setProfileData({ ...profileData, categories: updatedCategories })
      }
    }
  }

  const formatDateForInput = (doB?: number[] | null) => {
    if (!doB || doB.length !== 3) return '';
    const [year, month, day] = doB;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  // Convert date string to doB array
  const parseDateFromInput = (dateString: string): number[] | null => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-').map(Number);
    return [year, month, day];
  };

  // Format follower count
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  // Handle social media links
  const addSocialMedia = () => {
    if (newSocialMedia.platform && newSocialMedia.url) {
      const currentLinks = Array.isArray(profileData.socialMediaLinks) ? profileData.socialMediaLinks : [];
      const newLinks = [...currentLinks, { key: newSocialMedia.platform }, newSocialMedia.url];
      setProfileData({ ...profileData, socialMediaLinks: newLinks as [{ key: string }, string] | [] });
      setNewSocialMedia({ platform: '', url: '' });
    }
  };

  const removeSocialMedia = (index: number) => {
    if (Array.isArray(profileData.socialMediaLinks)) {
      const newLinks = [...profileData.socialMediaLinks];
      newLinks.splice(index * 2, 2); // Remove both key and value
      setProfileData({ ...profileData, socialMediaLinks: newLinks as [{ key: string }, string] | [] });
    }
  };

  // Get social media pairs
  const getSocialMediaPairs = () => {
    if (!Array.isArray(profileData.socialMediaLinks)) return [];
    const pairs = [];
    for (let i = 0; i < profileData.socialMediaLinks.length; i += 2) {
      if (i + 1 < profileData.socialMediaLinks.length) {
        const key = (profileData.socialMediaLinks[i] as { key: string }).key;
        const url = profileData.socialMediaLinks[i + 1] as string;
        pairs.push({ key, url, index: i / 2 });
      }
    }
    return pairs;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Hồ sơ cá nhân</h3>
        <p className="text-sm text-muted-foreground">
          Cập nhật thông tin hồ sơ và ảnh đại diện của bạn.
        </p>
      </div>

      {/* Avatar and Background */}
      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện và ảnh bìa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background Image */}
          {/* <div className="space-y-2">
            <Label>Ảnh bìa</Label>
            <div className="relative">
              <div
                className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: profileData.backgroundUrl ? `url(${profileData.backgroundUrl})` : undefined
                }}
              />
              <Button
                size="sm"
                className="absolute bottom-2 right-2"
                variant="secondary"
              >
                <Camera className="h-4 w-4 mr-2" />
                Thay đổi ảnh bìa
              </Button>
            </div>
          </div> */}

          {/* Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileData.avatarUrl || "/placeholder.svg?height=80&width=80"} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Thay đổi ảnh đại diện
              </Button>
              <p className="text-sm text-muted-foreground">JPG, GIF hoặc PNG. Tối đa 1MB.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ và tên</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Ngày sinh</Label>
              <Input
                id="dob"
                type="date"
                value={formatDateForInput(profileData.doB)}
                onChange={(e) => setProfileData({
                  ...profileData,
                  doB: parseDateFromInput(e.target.value)
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                value={profileData.gender}
                onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea
              id="bio"
              value={profileData.bio || ''}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={3}
            />
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <Label>Hồ sơ công khai</Label>
              <p className="text-sm text-muted-foreground">
                Cho phép mọi người xem hồ sơ của bạn
              </p>
            </div>
            <Switch
              checked={profileData.isPublic}
              onCheckedChange={(checked) => setProfileData({ ...profileData, isPublic: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Influencer Specific Information */}
      {roleName === 'INFLUENCER' && (
        <>
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatFollowerCount(profileData.follower || 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center text-2xl font-bold text-yellow-600">
                    <Star className="h-6 w-6 mr-1 fill-current" />
                    {profileData.rating || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Đánh giá</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {profileData.completedCampaign || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Chiến dịch hoàn thành</div>
                </div>
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lĩnh vực chuyên môn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Chọn tối đa 3 lĩnh vực chuyên môn của bạn</p>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <Badge
                      key={category.categoryId}
                      variant={profileData.categories?.some((cat) => cat.categoryId === category.categoryId)
                        ? "default"
                        : "outline"
                      }
                      className={cn(
                        "flex justify-center items-center gap-1 h-6 rounded-md text-xs font-medium cursor-pointer capitalize",
                      )}
                      onClick={() => handleSelectCategory(category)}
                    >
                      {category.categoryName}
                      {profileData.categories?.some((cat) => cat.categoryId === category.categoryId) && <X className="h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Đã chọn: {profileData.categories?.length || 0}/3</p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card>
            <CardHeader>
              <CardTitle>Liên kết mạng xã hội</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {getSocialMediaPairs().map((social) => (
                  <div key={social.index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium capitalize">{social.key}</div>
                      <div className="text-sm text-muted-foreground">{social.url}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSocialMedia(social.index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={newSocialMedia.platform}
                    onValueChange={(value) => setNewSocialMedia({ ...newSocialMedia, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="URL"
                    value={newSocialMedia.url}
                    onChange={(e) => setNewSocialMedia({ ...newSocialMedia, url: e.target.value })}
                  />
                </div>
                <Button onClick={addSocialMedia} size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm liên kết
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
