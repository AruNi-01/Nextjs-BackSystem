'use client';
import { Button, Card, message } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { UserAddOutlined } from '@ant-design/icons';
import AddOrUpdateModal from '@/components/admin/users/AddOrUpdateModal';
import ClearButton, {
  useClearLoadingStore,
} from '@/components/admin/users/ClearButton';
import SearchInput, {
  useSearchLoadingStore,
} from '@/components/admin/users/SearchInput';
import UserTable from '@/components/admin/users/UserTable';
import { ApiPathOfUser } from '@/config/apiConfig';
import {
  useTableChangeLoadingStore,
  useTableParamsStore,
} from '@/state_stores/UserTableCompStore';

export interface UserDataType {
  id: number;
  name: string;
  age?: number;
  gender: string;
  phone?: number;
  team?: string;
}

export default function Users() {
  const { setSearchLoading } = useSearchLoadingStore((state) => ({
    setSearchLoading: state.setSearchLoading,
  }));
  const { setClearLoading } = useClearLoadingStore((state) => ({
    setClearLoading: state.setClearLoading,
  }));
  const { setTableChangeLoading } = useTableChangeLoadingStore((state) => ({
    setTableChangeLoading: state.setTableChangeLoading,
  }));
  const { tableParams, setTableParams } = useTableParamsStore((state) => ({
    tableParams: state.tableParams,
    setTableParams: state.setTableParams,
  }));

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formOfModal] = useForm(); // 控制表单内容 Hook，zustand 无法管理（hook 只能在组件函数内使用），所以将其放在父组件中共享

  const [reloadUserList, setReloadUserList] = useState({});

  // 监听 tableParams 变化，刷新用户列表。注意：直接监听 tableParams 会出现死循环，
  // 因为 React 默认通过比较对象的引用来判断是否发生变化，而对象每次重新渲染后引用都会改变。
  useEffect(() => {
    fetchUserList();
  }, [JSON.stringify(tableParams), reloadUserList]);

  const [userList, setUserList] = useState<UserDataType[]>([]);

  const fetchUserList = async () => {
    setTableChangeLoading(true);
    tableParams.searchUsername && setSearchLoading(true);
    try {
      const rsp = await fetch(
        `${ApiPathOfUser.GetUserList}?jsonParams=${JSON.stringify(
          tableParams
        )}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await rsp.json();
      setUserList(data.data.userList);
      setTableParams({
        // 只把改变的参数传入，其他参数保持不变，展开传递即可
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.data.total,
        },
      });
    } catch (error) {
      message.error('fetch user list failed !');
    }
    tableParams.searchUsername && setSearchLoading(false);
    setTableChangeLoading(false);
    setClearLoading(false);
  };

  return (
    <>
      {/* 新增/编辑用户 弹窗 */}
      <AddOrUpdateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formOfModal={formOfModal}
        setReloadUserList={setReloadUserList}
      />

      {/* 展示数据的表格 */}
      <Card
        className="my-5 mx-7"
        type="inner"
        title={
          <span className="font-bold text-lg text-blue-600">Users Manage</span>
        }
        hoverable={true}
        extra={
          // 新增 user
          <Button
            onClick={() => {
              setModalVisible(true);
            }}
            type="primary"
            shape="round"
            icon={<UserAddOutlined />}
          />
        }
      >
        {/* 搜索框 */}
        <SearchInput />

        {/* 清空筛选和排序按钮 */}
        <ClearButton />

        {/* 表格 展示数据 */}
        <UserTable
          userList={userList}
          setModalVisible={setModalVisible}
          formOfModal={formOfModal}
          setReloadUserList={setReloadUserList}
        />
      </Card>
    </>
  );
}
