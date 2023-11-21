'use client';
import {
  Button,
  Card,
  Popconfirm,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
  message,
} from 'antd';
import Search from 'antd/es/input/Search';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import {
  UserAddOutlined,
  EditFilled,
  DeleteOutlined,
  CloseCircleOutlined,
  ManOutlined,
  WomanOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { PubSubTopics } from '@/common/Constants';
import { useSubsByPubSubJS } from '@/utils/pubsub';
import mockUserList from '../../../../public/mockData';
import { ApiPathOfUser } from '@/config/apiConfig';

interface UserDataType {
  id: number;
  name: string;
  age?: number;
  gender: string;
  phone?: number;
  team?: string;
}

// 数据表格的筛选参数
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
  searchUsername?: string;
}

export default function UserTable() {
  useSubsByPubSubJS([
    {
      topic: PubSubTopics.SET_RELOAD_USER_LIST,
      action: (_, data: {}) => {
        setReloadUserList(data);
      },
    },
  ]);

  const [deleteOkLoading, setDeleteOkLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [tableChangeLoading, setTableChangeLoading] = useState<boolean>(false);

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<UserDataType>>({});

  const [clearLoading, setClearLoading] = useState<boolean>(false);

  const [userList, setUserList] = useState<UserDataType[]>([]);
  const [reloadUserList, setReloadUserList] = useState<{}>({});

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
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
  // 监听 tableParams 变化，刷新用户列表。注意：直接监听 tableParams 会出现死循环，
  // 因为 React 默认通过比较对象的引用来判断是否发生变化，而对象每次重新渲染后引用都会改变。
  useEffect(() => {
    fetchUserList();
  }, [JSON.stringify(tableParams), reloadUserList]);

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
              PubSub.publish(PubSubTopics.FORM_OF_MODAL, {
                method: 'setFieldsValue',
                payload: record,
              });
              PubSub.publish(PubSubTopics.SET_MODAL_VISIBLE, true);
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
              PubSub.publish(PubSubTopics.SET_MODAL_VISIBLE, true);
            }}
            type="primary"
            shape="round"
            icon={<UserAddOutlined />}
          />
        }
      >
        {/* 搜索框 */}
        <Search
          className="w-1/5 rounded delay-300 duration-1000 transition-all focus:w-1/4"
          addonBefore="Name"
          placeholder="Search..."
          onSearch={(value, _e, _) => {
            setTableParams({
              ...tableParams,
              searchUsername: value,
            });
          }}
          enterButton
          allowClear
          loading={searchLoading}
        />

        {/* 清空筛选和排序按钮 */}
        <Button
          className="float-right"
          type="dashed"
          icon={<ClearOutlined />}
          loading={clearLoading}
          onClick={() => {
            setClearLoading(true);
            setFilteredInfo({});
            setSortedInfo({});
            // 同时也要清空 tableParams 中的，重新调用后端接口
            setTableParams({
              ...tableParams,
              filters: {},
              sortField: undefined,
              sortOrder: undefined,
            });
          }}
        >
          <span className="">Clear Filt & Sort</span>
        </Button>

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
      </Card>
    </>
  );
}
