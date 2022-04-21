import { Alert, Divider, Form, Input, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { memo } from 'react';

const LoginModal = memo(({ isModalVisible, handleOk, handleCancel }) => {
  const [form] = useForm();

  return (
    <>
      <Modal
        title="用户登录"
        visible={isModalVisible}
        onOk={() => {
          handleOk(form);
        }}
        onCancel={handleCancel}
      >
        <Alert message="用户测试的登录账号：  admin ｜  admin" type="warning" showIcon />
        <Divider />
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            name="username"
            label="用户名："
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="用户密码："
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input type="password" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default LoginModal;
