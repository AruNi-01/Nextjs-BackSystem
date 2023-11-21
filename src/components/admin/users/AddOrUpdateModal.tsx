'use client';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { ApiPathOfUser } from '@/config/apiConfig';
import { useSubsByPubSubJS } from '@/utils/pubsub';
import { PubSubTopics } from '@/common/Constants';

export default function AddOrUpdateModal() {
  useSubsByPubSubJS([
    {
      topic: PubSubTopics.FORM_OF_MODAL,
      action: (_, formOfModalPubSubObj: { method: string; payload?: any }) => {
        if (formOfModalPubSubObj.method === 'setFieldsValue') {
          formOfModal.setFieldsValue(formOfModalPubSubObj.payload);
        } else if (formOfModalPubSubObj.method === 'resetFields') {
          formOfModal.resetFields();
        } else {
          console.error('Unknown method: ', formOfModalPubSubObj.method);
        }
      },
    },
    {
      topic: PubSubTopics.SET_MODAL_VISIBLE,
      action: (_, flag: boolean) => {
        setModalVisible(flag);
      },
    },
  ]);

  const [formOfModal] = useForm();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // 由于设置 Modal 关闭时自动清空（destroyOnClose={true}）会有 bug，故 Modal 关闭时手动清理
  useEffect(() => {
    !modalVisible && handleModalFormReset();
  }, [modalVisible]);

  const handleModalOk = () => formOfModal.submit();
  const handleModalCancle = () => setModalVisible(false);
  const handleModalFormReset = () => formOfModal.resetFields();

  const [addOkLoading, setAddOkLoading] = useState<boolean>(false);

  // 新增/编辑 Modal 表单提交的处理函数
  async function handleModalFormSubmit(formData: any) {
    const handleFail = () => {
      !formData.id
        ? message.error(`Add user (Name: ${formData.name}) failed!`)
        : message.error(`Update user (Name: ${formData.name}) failed!`);
    };

    setAddOkLoading(true);
    try {
      const rsp = await fetch(ApiPathOfUser.CreateOrUpdate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const flag = await rsp.json();
      if (flag) {
        !formData.id
          ? message.success(`Add user (Name: ${formData.name}) success!`)
          : message.success(`Update user (Name: ${formData.name}) success!`);
        PubSub.publish(PubSubTopics.SET_RELOAD_USER_LIST, {});
      } else {
        handleFail();
      }
    } catch (error) {
      handleFail();
    }

    setAddOkLoading(false);
    setModalVisible(false);
  }

  return (
    <>
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
          <Button key="reset" onClick={handleModalFormReset}>
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
          form={formOfModal} // formOfModal 控制表单内容 Hook
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
              <Select.Option value="Development">Development</Select.Option>
              <Select.Option value="Design">Design</Select.Option>
              <Select.Option value="Sell">Sell</Select.Option>
              <Select.Option value="Finance">Finance</Select.Option>
              <Select.Option value="Legal">Legal</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
