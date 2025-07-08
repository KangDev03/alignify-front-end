import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import UserRows from './user-rows';

interface UserTableProps {
  isInfluencerRole: boolean;
  isBanned: boolean;
}
const UserTable = ({ isInfluencerRole, isBanned }: UserTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Người dùng</TableHead>
        {/* <TableHead>Trạng thái</TableHead> */}
        {/* <TableHead>Gói đăng ký</TableHead> */}
        <TableHead>Ngày tham gia</TableHead>
        <TableHead className="text-right">Thao tác</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <UserRows isBanned={isBanned} isInfluencerRole={isInfluencerRole} />
    </TableBody>
  </Table>
);
export default UserTable;
