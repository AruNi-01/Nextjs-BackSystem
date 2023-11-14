"use client";
import { Card, Form, Button, Input } from "antd";

export default function LoginPage() {
  return (
    <div className="login pt-20">
      <Card title="Welcome Login" className="w-2/5 mx-auto text-center">
        <Form
          labelCol={{ span: 6 }}
          onFinish={(formData) => {
            console.log(formData);
          }}
        >

          <Form.Item name="username" label="Username">
            <Input placeholder="input username" />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password placeholder="input password" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              {"Login →"}
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
}
