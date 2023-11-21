import AddOrUpdateModal from '@/components/admin/users/AddOrUpdateModal';
import UserTable from '@/components/admin/users/UserTable';

export default function Users() {
  return (
    <>
      {/* 展示用户信息的 Table */}
      <UserTable />

      {/* 新增/编辑用户 弹窗 */}
      <AddOrUpdateModal />
    </>
  );
}
