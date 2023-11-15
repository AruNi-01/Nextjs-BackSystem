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

type UserDataType = {
  id: number;
  name: string;
  age?: number;
  gender: string;
  phone?: number;
  team?: string;
};

const mockUserList: UserDataType[] = [
  {
    id: 11,
    name: "Tom",
    age: 23,
    gender: "male",
    phone: 11111111111,
    team: "Development",
  },
  {
    id: 22,
    name: "July",
    age: 18,
    gender: "female",
    phone: 22222222222,
    team: "Design",
  },
  {
    id: 32,
    name: "Jack",
    age: 25,
    gender: "male",
    phone: 3333333333,
    team: "Development",
  },
];

export default function Users() {
  // 表格 表头
  const columns: ColumnsType<UserDataType> = [
    {
      title: "No.",
      // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引
      render: (_, record, index) => index + 1,
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
              console.log(`setFieldsValue before: record=`, record)
              formOfUserAdd.setFieldsValue(record);
              console.log(`setFieldsValue after: getFieldsValue()=`, formOfUserAdd.getFieldsValue())
              console.log(`setFieldsValue after: getFieldsValue(true)=`, formOfUserAdd.getFieldsValue(true))
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
            onConfirm={() => {
              // TODO: 调用删除 user API
              message.success(
                `delete user ${record.name} (id=${record.id}) succsess !`
              );
            }}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 新增 user 对话框的可见性
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 控制 Form 表单
  const [formOfUserAdd] = useForm();

  const handleModalOk = () => formOfUserAdd.submit();
  const handleModalCancle = () => setModalVisible(false);
  const handleModalReset = () => formOfUserAdd.resetFields();

  return (
    <>
      <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600">
        Users Info Manage
      </h1>

      <Card
        type="inner"
        title={<span className="font-bold text-lg">Users Info</span>}
        hoverable={true}
        extra={
          <Button
            onClick={() => setModalVisible(true)}
            type="primary"
            shape="round"
            icon={<UserAddOutlined />}
          />
        }
      >
        <Form layout="inline">
          <Form.Item label="Name">
            <Input placeholder="input name" />
          </Form.Item>
          <Form.Item>
            <Button icon={<SearchOutlined />} type="primary" />
          </Form.Item>
        </Form>

        <Table className="mt-2" columns={columns} dataSource={mockUserList} />
      </Card>

      {/* 新增用户 弹窗 */}
      <Modal
        title="Add New User"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancle}
        maskClosable={false} // 点击空白区域不关闭 Modal
        destroyOnClose={true} // 在 Modal 关闭时自动清空数据
        footer={[
          <Button key="cancel" onClick={handleModalCancle}>
            Cancel
          </Button>,
          <Button key="reset" onClick={handleModalReset}>
            Reset
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          layout="horizontal"
          labelCol={{ span: 4 }}
          form={formOfUserAdd} // formOfUserAdd 控制表单内容 Hook
          preserve={false} // 配合 Modal 使用，关闭时销毁表单字段数据
          onFinish={(formData) => {
            console.log(formData);
            // TODO: 调用新增or修改 user API，这里交给后端去判断即可，传入的主键为空则为新增

            setModalVisible(false);
            if (formData.id === null)
              message.success(`Add user (Name: ${formData.name}) usccess !`);
            else message.info(`update user (Name: ${formData.name}) success !`);
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
