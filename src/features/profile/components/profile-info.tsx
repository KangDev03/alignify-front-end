import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { Icons } from "@/components/icons/icons"

import type { InfluencerData } from "../types/profile.types"

interface ProfileInfoProps {
    influencer: InfluencerData
    isEditing: boolean
    editData: Partial<InfluencerData>
    onEditDataChange: (data: Partial<InfluencerData>) => void
    onSave: () => void
}

export function ProfileInfo({ 
    influencer, 
    isEditing, 
    editData, 
    onEditDataChange, 
    onSave 
}: ProfileInfoProps) {
    const handleChange = (field: keyof InfluencerData, value: string) => {
        onEditDataChange({ ...editData, [field]: value })
    }

    return (
        <Card className="border-2 border-primary/20 bg-card shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Thông tin cá nhân</CardTitle>
                {isEditing && (
                    <Button size="sm" onClick={onSave}>
                        <Icons.save className="h-4 w-4 mr-2" />
                        Lưu thay đổi
                    </Button>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                            id="name"
                            value={isEditing ? editData.name : influencer.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            value={isEditing ? editData.dateOfBirth : (influencer.dateOfBirth)}
                            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Giới tính</Label>
                        <Select
                            value={isEditing ? editData.gender : influencer.gender}
                            onValueChange={(value: string) => handleChange("gender", value)}
                            disabled={!isEditing}
                        >
                            <SelectTrigger id="gender">
                                <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Nam</SelectItem>
                                <SelectItem value="female">Nữ</SelectItem>
                                <SelectItem value="other">Khác</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Địa chỉ</Label>
                        <Input
                            id="location"
                            value={isEditing ? editData.location : influencer.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Giới thiệu</Label>
                    <Textarea
                        id="bio"
                        value={isEditing ? editData.bio : influencer.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                    />
                </div>
            </CardContent>
        </Card>
    )
}