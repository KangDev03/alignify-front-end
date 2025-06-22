import { Check, Clock, X } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ApplicantCard } from "./applicant-card"

export function ApplicantTabs({ applicants }: {
  applicants: {
    waiting: any[]
    accepted: any[]
    rejected: any[]
  }
}) {
  return (
    <div className="flex-1 p-6">
      <Tabs defaultValue="waiting" className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waiting"><Clock className="h-4 w-4" /> Danh sách chờ ({applicants.waiting.length})</TabsTrigger>
          <TabsTrigger value="accepted"><Check className="h-4 w-4" /> Đã chấp nhận ({applicants.accepted.length})</TabsTrigger>
          <TabsTrigger value="rejected"><X className="h-4 w-4" /> Đã từ chối ({applicants.rejected.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="waiting" className="mt-4 space-y-3">
          {applicants.waiting.length > 0 ? (
            applicants.waiting.map((inf) => <ApplicantCard key={inf.id} influencer={inf} status="waiting" />)
          ) : <p className="text-center text-muted-foreground py-8">Không có ứng viên đang chờ.</p>}
        </TabsContent>

        <TabsContent value="accepted" className="mt-4 space-y-3">
          {applicants.accepted.length > 0 ? (
            applicants.accepted.map((inf) => <ApplicantCard key={inf.id} influencer={inf} status="accepted" />)
          ) : <p className="text-center text-muted-foreground py-8">Không có ứng viên đã chấp nhận.</p>}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4 space-y-3">
          {applicants.rejected.length > 0 ? (
            applicants.rejected.map((inf) => <ApplicantCard key={inf.id} influencer={inf} status="rejected" />)
          ) : <p className="text-center text-muted-foreground py-8">Không có ứng viên đã từ chối.</p>}
        </TabsContent>
      </Tabs>
    </div>
  )
}
