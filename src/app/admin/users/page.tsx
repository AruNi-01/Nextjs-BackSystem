"use client";
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
} from "antd";
import {
  SearchOutlined,
  UserAddOutlined,
  EditFilled,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { ApiPathOfUser } from "@/config/apiConfig";

type UserDataType = {
  id: number;
  name: string;
  age?: number;
  gender: string;
  phone?: number;
  team?: string;
};

export default function Users() {
  // 表格 表头
  const columns: ColumnsType<UserDataType> = [
    {
      title: "No.",
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
      render: (_, record, index) => {
        return (
          (paginationQuery.page - 1) * paginationQuery.pageSize + (index + 1)
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name", // 列数据在数据项中对应的路径
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Team",
      dataIndex: "team",
    },
    {
      title: "Action",
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
            icon={<CloseCircleOutlined style={{ color: "red" }} />}
            okButtonProps={{ loading: deleteOkLoading }}
            onConfirm={async () => {
              setDeleteOkLoading(true);
              try {
                await fetch(`${ApiPathOfUser.DeleteUserById}/${record.id}`, {
                  method: "DELETE",
                });
                setRefreshUserList({});
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
  const [refreshUserList, setRefreshUserList] = useState({});
  // 分页查询参数
  const [paginationQuery, setPaginationQuery] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(0); // 总条数

  // 监听 refreshUserList、paginationQuery 变化，刷新用户列表
  useEffect(() => {
    // 不能直接传异步函数给 useEffect
    const fetchUserList = async () => {
      try {
        const rsp = await fetch(
          `${ApiPathOfUser.GetUserList}?page=${paginationQuery.page}&pageSize=${paginationQuery.pageSize}`
        );
        const data = await rsp.json();
        setTotal(data.data.total);
        setUserList(data.data.userList);
      } catch (error) {
        message.error("fetch user list failed !");
      }
    };

    fetchUserList();
  }, [refreshUserList, paginationQuery]);

  // 新增 user 对话框的可见性
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [addOkLoading, setAddOkLoading] = useState<boolean>(false);
  const [deleteOkLoading, setDeleteOkLoading] = useState<boolean>(false);

  // 控制 Form 表单
  const [formOfUserAdd] = useForm();

  const handleModalOk = () => formOfUserAdd.submit();

  const handleModalCancle = () => {
    setModalVisible(false);
    // 由于设置 Modal 关闭时自动清空数据会有 bug，因此直接手动清理(在编辑/新增完成后)
    formOfUserAdd.resetFields();
  };
  const handleModalReset = () => formOfUserAdd.resetFields();

  return (
    <>
      <Card
        className="mt-6"
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
        {/* 搜索 */}
        <Form layout="inline">
          <Form.Item label="Name">
            <Input placeholder="input name" />
          </Form.Item>
          <Form.Item>
            <Button icon={<SearchOutlined />} type="primary" />
          </Form.Item>
        </Form>

        {/* 表格 展示数据 */}
        <Table
          className="mt-2"
          rowKey="id"
          columns={columns}
          dataSource={userList}
          // 分页
          pagination={{
            total: total,
            onChange: (page, pageSize) => {
              setPaginationQuery({ page, pageSize });
            },
          }}
        />
      </Card>

      {/* 新增用户 弹窗 */}
      <Modal
        title="Add New User"
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
          onFinish={async (formData) => {
            setAddOkLoading(true);

            const handleFile = () => {
              if (!formData.id)
                message.error(`Add user (Name: ${formData.name}) failed!`);
              else
                message.error(`Update user (Name: ${formData.name}) failed!`);
            };

            await fetch(ApiPathOfUser.CreateOrUpdate, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => {
                if (response.ok) {
                  if (!formData.id)
                    message.success(
                      `Add user (Name: ${formData.name}) success!`
                    );
                  else
                    message.info(
                      `Update user (Name: ${formData.name}) success!`
                    );
                  setRefreshUserList({});
                } else handleFile();
              })
              .catch((error) => handleFile());
            setAddOkLoading(false);
            formOfUserAdd.resetFields();
            setModalVisible(false);
          }}
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
                message: "Name cannot be empty.",
              },
            ]}
          >
            <Input placeholder="input name" />
          </Form.Item>

          <Form.Item label="Age" name="age">
            <Input placeholder="input age" />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Gender cannot be empty.",
              },
            ]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="input phone" />
          </Form.Item>

          <Form.Item label="Team" name="team">
            <Select allowClear>
              <Select.Option value="development">Development</Select.Option>
              <Select.Option value="design">Design</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
