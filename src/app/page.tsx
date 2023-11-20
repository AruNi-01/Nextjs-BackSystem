import { Button, ConfigProvider } from 'antd';
import Link from 'next/link';
import { GithubOutlined } from '@ant-design/icons';

import themeConfig from '@/theme/themeConfig';

export default function HomePage() {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="App text-center mt-20">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Welcome to Next.js BackSystem
        </h1>
        <div className="mt-8">
          <p className="text-lg font-bold max-w-3xl mx-auto">
            Hello, I'm AarynLu. This is a background management system based on
            React, Next.js, Ant-Design UI and Tailwind CSS. And it is a
            full-stack project, back-end API is built through Java, MySQL,
            SpringBoot and Mybatis-Plus.
          </p>
          <p className="text-lg font-bold max-w-3xl mx-auto">
            This website was written when I started the front end, so it might
            be a little terrible.
          </p>
          <p className="text-lg font-bold max-w-3xl mx-auto">
            I will continue to improve this project and add more features. If
            you are interested, you can star this project on
            <Button
              type="text"
              title="Github"
              icon={<GithubOutlined />}
              href="https://github.com/AruNi-01/Nextjs-BackSystem"
              target="_blank"
              ghost
            />
            , Thank you!
          </p>
        </div>...
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-900 border-0 rounded md:my-10" />
        <Link href="/admin">
          <div className="group transition-all duration-1000 inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-900 hover:text-gray-400 hover:bg-gray-950">
            <span className="w-full">Go To Admin Dashboard</span>
            <span className="transition-transform delay-100 duration-1000 group-hover:translate-x-2">
              {/* prettier-ignore */}
              <svg className="w-7 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </ConfigProvider>
  );
}
