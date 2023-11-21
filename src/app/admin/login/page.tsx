'use client';
import { Card, Form, Button, Input } from 'antd';

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
            <Button block type="primary" htmlType="submit" className="group">
              Login&thinsp;
              <span className="transition-transform delay-100 duration-1000 group-hover:translate-x-1">
                {/* prettier-ignore */}
                <svg className="w-3 h-3 ms-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
              </span>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
