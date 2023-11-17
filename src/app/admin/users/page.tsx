'use client';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  Table,
  Space,
  Modal,
  Select,
  message,
  Popconfirm,
} from 'antd';
import {
  UserAddOutlined,
  EditFilled,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useForm } from 'antd/es/form/Form';
import { ApiPathOfUser } from '@/config/apiConfig';
import Search from 'antd/es/input/Search';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

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

export default function Users() {
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
      width: '10%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
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
        { text: 'Development', value: 'development' },
        { text: 'Design', value: 'design' },
        { text: 'Sell', value: 'sell' },
        { text: 'Finance', value: 'finance' },
        { text: 'Legal', value: 'legal' },
      ],
    },
    {
      title: 'Action',
      // 编辑、删除按钮
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              setModalVisible(true);
              formOfUserAdd.setFieldsValue(record);
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
                await fetch(`${ApiPathOfUser.DeleteUserById}/${record.id}`, {
                  method: 'DELETE',
                });
                setReloadUserList({});
                message.success(
                  `delete user ${record.name} (id=${record.id}) succsess !`
                );
              } catch (error) {
                message.warning(`delete user ${record.name} failed !`);
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

  const [userList, setUserList] = useState<UserDataType[]>([]);
  const [reloadUserList, setReloadUserList] = useState({});

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
  };

  const [addOkLoading, setAddOkLoading] = useState<boolean>(false);
  const [deleteOkLoading, setDeleteOkLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [tableChangeLoading, setTableChangeLoading] = useState<boolean>(false);

  // 用于控制 Modal 中的 Form 表单
  const [formOfUserAdd] = useForm();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleModalOk = () => formOfUserAdd.submit();
  const handleModalCancle = () => {
    setModalVisible(false);
    // 由于设置 Modal 关闭时自动清空数据会有 bug，因此直接手动清理(在编辑/新增完成后)
    formOfUserAdd.resetFields();
  };
  const handleModalReset = () => formOfUserAdd.resetFields();
  // 新增/编辑 Modal 表单提交的处理函数
  async function handleModalFormSubmit(formData: any) {
    setAddOkLoading(true);

    const handleFail = () => {
      !formData.id
        ? message.error(`Add user (Name: ${formData.name}) failed!`)
        : message.error(`Update user (Name: ${formData.name}) failed!`);
    };

    await fetch(ApiPathOfUser.CreateOrUpdate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          !formData.id
            ? message.success(`Add user (Name: ${formData.name}) success!`)
            : message.info(`Update user (Name: ${formData.name}) success!`);
          setReloadUserList({});
        } else {
          handleFail();
        }
      })
      .catch((error) => handleFail());

    setAddOkLoading(false);
    formOfUserAdd.resetFields();
    setModalVisible(false);
  }

  return (
    <>
      {/* 展示数据的表格 */}
      <Card
        className="mt-3"
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
        <Search
          className="w-2/5"
          addonBefore="Name"
          placeholder="Support fuzzy search"
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

        {/* 表格 展示数据 */}
        <Table
          className="mt-2"
          rowKey={(record) => record.id.toString()}
          columns={columns}
          dataSource={userList}
          loading={tableChangeLoading}
          // 分页
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      </Card>

      {/* 新增/编辑用户 弹窗 */}
      <Modal
        title="Manage User (Create new user will be positioned first) "
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancle}
        maskClosable={false} // 点击空白区域不关闭 Modal
        // destroyOnClose={true} // 在 Modal 关闭时自动清空数据
        // forceRender={true}
        footer={[
          <Button key="cancel" onClick={handleModalCancle}>
            Cancel
          </Button>,
          <Button key="reset" onClick={handleModalReset}>
            Reset
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleModalOk}
            loading={addOkLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          form={formOfUserAdd} // formOfUserAdd 控制表单内容 Hook
          // preserve={false} // 配合 Modal 使用，关闭时销毁表单字段数据
          onFinish={(formData) => handleModalFormSubmit(formData)}
        >
          <Form.Item label="Id" name="id">
            <Input placeholder="Autogeneration" disabled={true} />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Name cannot be empty.',
              },
            ]}
          >
            <Input allowClear placeholder="input name" />
          </Form.Item>

          <Form.Item label="Age" name="age">
            <Input allowClear placeholder="input age" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Gender cannot be empty.',
              },
            ]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input allowClear placeholder="input phone" />
          </Form.Item>

          <Form.Item label="Team" name="team">
            <Select allowClear>
              <Select.Option value="development">Development</Select.Option>
              <Select.Option value="design">Design</Select.Option>
              <Select.Option value="sell">Sell</Select.Option>
              <Select.Option value="finance">Finance</Select.Option>
              <Select.Option value="legal">Legal</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
