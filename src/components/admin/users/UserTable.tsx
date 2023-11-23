'use client';
import {
  Button,
  Popconfirm,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  message,
} from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import {
  EditFilled,
  DeleteOutlined,
  CloseCircleOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import mockUserList from '../../../../public/mockData';
import { ApiPathOfUser } from '@/config/apiConfig';
import { UserDataType } from '@/app/admin/users/page';
import {
  useFilteredInfoStore,
  useSortedInfoStore,
  useTableChangeLoadingStore,
  useTableParamsStore,
} from '@/state_stores/UserTableCompStore';

export default function UserTable({
  userList,
  formOfModal,
  setModalVisible,
  setReloadUserList,
}: {
  userList: UserDataType[];
  formOfModal: any;
  setModalVisible: (flag: boolean) => void;
  setReloadUserList: (obj: {}) => void;
}) {
  const { tableChangeLoading } = useTableChangeLoadingStore((state) => ({
    tableChangeLoading: state.tableChangeLoading,
  }));
  const { tableParams, setTableParams } = useTableParamsStore((state) => ({
    tableParams: state.tableParams,
    setTableParams: state.setTableParams,
  }));
  const { filteredInfo, setFilteredInfo } = useFilteredInfoStore((state) => ({
    filteredInfo: state.filteredInfo,
    setFilteredInfo: state.setFilteredInfo,
  }));
  const { sortedInfo, setSortedInfo } = useSortedInfoStore((state) => ({
    sortedInfo: state.sortedInfo,
    setSortedInfo: state.setSortedInfo,
  }));

  const [deleteOkLoading, setDeleteOkLoading] = useState<boolean>(false);

  // 表格分页、排序、筛选变化时的回调
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<UserDataType> | SorterResult<UserDataType>[]
  ) => {
    // 改变界面的 filt，sort
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<UserDataType>);

    // 改变 tableParams，重新调用后端接口
    setTableParams({
      ...tableParams,
      pagination,
      filters,
      ...sorter,
    });
  };

  // 表格 —— 表头
  const columns: ColumnsType<UserDataType> = [
    {
      title: 'No.',
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
      render: (_, record, index) => {
        const current = tableParams.pagination?.current ?? 1;
        const pageSize = tableParams.pagination?.pageSize ?? 10;
        return (current - 1) * pageSize + (index + 1);
      },
    },
    {
      title: 'Name',
      dataIndex: 'name', // 列数据在数据项中对应的路径
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: true,
      // 受控属性，用于控制页面的排序
      sortOrder: sortedInfo.field === 'age' ? sortedInfo.order : null,
      width: '10%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      filteredValue: filteredInfo.gender || null, // 受控属性，用于控制页面的筛选
      render: (gender: string) => {
        const isMale = gender === 'male';
        const isFemale = gender === 'female';
        return (
          <span>
            <Tag color={isMale ? 'blue' : isFemale ? 'pink' : 'orange'}>
              {isMale ? <ManOutlined /> : isFemale ? <WomanOutlined /> : ''}
              {isMale ? ' Male' : isFemale ? ' Female' : 'unkonwn'}
            </Tag>
          </span>
        );
      },
      width: '12%',
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      filters: [
        { text: 'Development', value: 'Development' },
        { text: 'Design', value: 'Design' },
        { text: 'Sell', value: 'Sell' },
        { text: 'Finance', value: 'Finance' },
        { text: 'Legal', value: 'Legal' },
      ],
      filteredValue: filteredInfo.team || null,
      render: (team: string) => (
        <span>
          <Tag
            bordered={false}
            color={
              team === 'Development'
                ? 'geekblue'
                : team === 'Design'
                ? 'green'
                : team === 'Sell'
                ? 'volcano'
                : team === 'Finance'
                ? 'gold'
                : team === 'Legal'
                ? 'purple'
                : 'default'
            }
            key={team}
          >
            {team}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Action',
      // 编辑、删除按钮
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              formOfModal.setFieldsValue(record);
              setModalVisible(true);
            }}
            type="text"
            icon={<EditFilled />}
          />

          <Popconfirm
            placement="rightTop"
            title="Confirm delete ?"
            okText="Yes"
            cancelText="No"
            icon={<CloseCircleOutlined style={{ color: 'red' }} />}
            okButtonProps={{ loading: deleteOkLoading }}
            onConfirm={async () => {
              setDeleteOkLoading(true);
              try {
                const rsp = await fetch(
                  `${ApiPathOfUser.DeleteUserById}/${record.id}`,
                  {
                    method: 'DELETE',
                  }
                );
                const flag = await rsp.json();
                flag
                  ? message.success(
                      `delete user ${record.name} (id=${record.id}) success !`
                    )
                  : message.error(
                      `delete user ${record.name} (id=${record.id}) failed !`
                    );
                setReloadUserList({});
              } catch (error) {
                message.error(`delete user ${record.name} failed !`);
              }
              setDeleteOkLoading(false);
            }}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* 表格 展示数据 */}
      <Table
        className="mt-2"
        rowKey={(record) => record.id.toString()}
        columns={columns}
        dataSource={userList.length !== 0 ? userList : mockUserList}
        loading={tableChangeLoading}
        // 分页
        pagination={{
          ...tableParams.pagination,
          position: ['bottomCenter'],
        }}
        onChange={handleTableChange}
        rowClassName={() => {
          return 'transition-all delay-100 duration-1000 hover: hover:shadow-md';
        }}
      />
    </>
  );
}
