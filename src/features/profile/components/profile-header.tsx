import React, { useState } from 'react';
import axios from 'axios';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Icons } from '@/components/icons/icons';

import type { InfluencerData } from '../types/profile.types';

interface ProfileHeaderProps {
  influencer: InfluencerData;
  isEditing: boolean;
  onEditToggle: () => void;
  onCancel: () => void;
}

export function ProfileHeader({
  influencer,
  isEditing,
  onEditToggle,
  onCancel,
}: ProfileHeaderProps) {
  const [avatarUrl, setAvatarUrl] = useState(influencer.avatar || '');
  const [uploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const token = import.meta.env.VITE_API_TOKEN;
    const userId = '683846528abb502e07f6f8ee';
    await axios
      .post(`http://localhost:8080/api/v1/profile/gallery/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAvatarUrl(res.data.secure_url);
        console.log(res.data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-lg">
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <label htmlFor="avatar-upload" className="cursor-pointer relative group">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || '/placeholder.svg'} alt={influencer.name} />
              <AvatarFallback className="text-2xl">{influencer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
              <span className="text-white text-sm">Thay ảnh</span>
            </div>
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading && (
            <div className="text-xs text-gray-500 text-center mt-1">Đang tải ảnh...</div>
          )}

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{influencer.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center space-x-1">
                    <Icons.mapPin className="h-4 w-4" />
                    <span>{influencer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icons.calendar className="h-4 w-4" />
                    <span>{new Date(influencer.dateOfBirth).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </div>
              <Button
                variant={isEditing ? 'destructive' : 'outline'}
                size="sm"
                onClick={isEditing ? onCancel : onEditToggle}
              >
                {isEditing ? (
                  <Icons.x className="h-4 w-4 mr-2" />
                ) : (
                  <Icons.edit className="h-4 w-4 mr-2" />
                )}
                {isEditing ? 'Hủy' : 'Chỉnh sửa'}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {influencer.category.map((cat, index) => (
                <Badge key={index} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icons.star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{influencer.rating}</span>
              </div>
              {/* <div className="flex items-center space-x-1">
                                <Icons.trendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{influencer.engagementRate}% engagement</span>
                            </div> */}
              <div className="text-sm text-muted-foreground">
                {influencer.completedCampaigns} chiến dịch hoàn thành
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
