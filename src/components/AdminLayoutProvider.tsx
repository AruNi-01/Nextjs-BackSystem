'use client';
import { Button, FloatButton, Image, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  CommentOutlined,
  TwitterOutlined,
  WechatOutlined,
  HeartTwoTone,
  SmileTwoTone,
} from '@ant-design/icons';
import siderMenuItems from './SiderMenuItem';
import Link from 'next/link';

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
          <Link href="/admin" className="text-black hover:text-purple-800">
            <div className="mx-auto my-auto rounded-b-xl text-center font-bold text-lg w-2/3 bg-gradient-to-r from-blue-500 to-violet-400">
              Menu
            </div>
          </Link>
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
          <Button
            href="/admin/login"
            className="group float-right mr-5 mt-4 shadow-lg shadow-blue-500/50"
            type="primary"
            shape="round"
          >
            <SmileTwoTone />
            Login&thinsp;
            <span className="transition-transform delay-100 duration-1000 group-hover:translate-x-1">
              {/* prettier-ignore */}
              <svg className="w-3 h-3 ms-1 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </span>
          </Button>
        </Header>

        {/* <span className="h-1 bg-gradient-to-r from-blue-500 to-violet-400"></span> */}
        <Content className="border-t-2 pl-9 pr-9 bg-white overflow-auto">
          {children}
        </Content>

        <Footer className="py-4 text-center">
          Next.js BackSystem© 2023 Made by{' '}
          <Link className="group" href="https://aruni.me" target="_blank">
            AarynLu <HeartTwoTone className="pl-1 group-hover:animate-ping" />
          </Link>
        </Footer>

        <FloatButton.Group
          className="right-7 mb-4 animate-pulse hover:animate-none"
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
      </Layout>
    </Layout>
  );
}
