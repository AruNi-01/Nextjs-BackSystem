"use client";
import { Button, FloatButton, Image, Layout, Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CommentOutlined,
  TwitterOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import siderMenuItems from "./SiderMenuItem";

const { Header, Footer, Sider, Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useRouter();

  // 登录组件不走模板
  const pathname = usePathname();
  if (pathname === '/admin/login') return children;

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical h-8 mb-3">
          <div className="mx-auto my-auto rounded-b-xl text-center font-bold text-lg w-2/3 bg-gradient-to-r from-blue-500 to-violet-400">
            Menu
          </div>
        </div>

        <Menu 
          theme="dark" 
          mode="inline" 
          items={siderMenuItems} 
          onClick={({ key }) => {
            navigate.push(key);
          }}
        />
      </Sider>

      <span className="p-0.5 bg-gradient-to-b from-violet-400 to-blue-500"></span>

      <Layout>
        <Header className="p-0">
          <span className="p-8 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600">
            Next.js BackSystem
          </span>
          <Button href="/admin/login" className="float-right mr-5 mt-4" type="primary" shape="round">
            Login →
          </Button>
        </Header>

        {/* <span className="h-1 bg-gradient-to-r from-blue-500 to-violet-400"></span> */}
        <Content className="border-t-2 pl-9 pr-9 bg-white">
          {children}
        </Content>

        <FloatButton.Group
          className="right-10 mb-10"
          trigger="hover"
          type="primary"
          icon={<CommentOutlined />}
        >
          <FloatButton
            href="https://twitter.com/AruNi_Lu"
            icon={<TwitterOutlined />}
            target="_blank"
            tooltip="Twitter"
          />
          <FloatButton
            tooltip={
              <Image
                src="https://run-notion.oss-cn-beijing.aliyuncs.com/wx.jpg"
                alt="wechat_img"
                width={100}
                height={100}
              />
            }
            icon={<WechatOutlined />}
          />
        </FloatButton.Group>

        <Footer className="py-4 text-center">
          Next.js BackSystem© 2023 Made by
          <Button href="https://aruni.me" target="_blank" type="link" size="small">
            AarynLu
          </Button>
        </Footer>
      </Layout>
    </Layout>
  );
}
