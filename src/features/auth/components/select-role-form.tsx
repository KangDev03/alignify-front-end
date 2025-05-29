import { useState } from "react"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Icons } from "@/components/icons/icons"

export default function SelectRoleForm() {
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState("")

    const handleContinue = () => {
        navigate(`/auth/register?role=${selectedRole}`)
    }
    return (
        <div className="w-full max-w-4xl space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary">Chọn vai trò của bạn</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Chọn vai trò phù hợp với bạn để chúng tôi có thể cung cấp trải nghiệm tốt nhất
                </p>
            </div>

            <div className="flex justify-center items-center gap-8">
                <RoleCard
                    title="Nhà sáng tạo<br />nội dung"
                    description="Dành cho những người tạo ra nội dung, influencer và KOLs"
                    icon={<Icons.user className="w-8 h-8" />}
                    isSelected={selectedRole === "creator"}
                    onClick={() => setSelectedRole("creator")}
                />

                <RoleCard
                    title="Nhãn hàng<br />quảng cáo"
                    description="Dành cho các thương hiệu và doanh nghiệp cần quảng cáo"
                    icon={<Icons.store className="w-8 h-8" />}
                    isSelected={selectedRole === "brand"}
                    onClick={() => setSelectedRole("brand")}
                />
            </div>

            <div className="flex justify-center">
                <Button onClick={handleContinue}>
                    Tiếp tục
                    <Icons.arrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}

interface RoleCardProps {
    title: string
    description: string
    icon: React.ReactNode
    isSelected: boolean
    onClick: () => void
}

function RoleCard({ title, description, icon, isSelected, onClick }: RoleCardProps) {
    return (
        <Card
            className={`w-64 cursor-pointer transition duration-300 py-7 ${isSelected
                ? "border-2 border-primary bg-primary/10 shadow-lg"
                : "hover:border-primary/30 hover:shadow-md"
                }`}
            onClick={onClick}
        >
            <CardContent className="flex flex-col items-center justify-center h-full text-center space-y-[22px]">
                <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${isSelected
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                        }`}
                >
                    {icon}
                </div>
                <div className="space-y-3">
                    <h3
                        className={`text-2xl font-bold ${isSelected ? "text-primary" : ""}`}
                        dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <div className="px-5">
                        <p className={`text-sm ${isSelected ? "text-primary/80" : "text-muted-foreground"}`}>
                            {description}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}