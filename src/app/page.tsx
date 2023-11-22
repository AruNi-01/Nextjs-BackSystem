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
            React, Next.js, Ant-Design UI, Zustand and Tailwind CSS. And it is a
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
            />
            , Thank you!
          </p>
        </div>
        <hr className="w-48 h-1 mx-auto my-4 bg-gray-900 border-0 rounded md:my-10" />
        <Link href="/admin">
          <div className="group transition-all duration-1000 inline-flex h-5 items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-900 hover:text-gray-400 hover:bg-gray-950">
            <span className="w-full">Go To Admin Dashboard</span>
            <span className="transition-transform delay-100 duration-1000 group-hover:translate-x-2">
              {/* prettier-ignore */}
              <svg className="text-primary mt-1.5  rtl:rotate-180" fill="none" width="24" height="24" viewBox="0 0 72 72" aria-hidden="true">
                <path className="transition-transform ease-in-out delay-200 duration-1000 translate-x-[-8px] group-hover:translate-x-[8px]" fillRule="evenodd" clipRule="evenodd" d="M40.0001 19.0245C41.0912 17.7776 42.9864 17.6513 44.2334 18.7423L58.9758 33.768C59.6268 34.3377 60.0002 35.1607 60.0002 36.0257C60.0002 36.8908 59.6268 37.7138 58.9758 38.2835L44.2335 53.3078C42.9865 54.3988 41.0913 54.2725 40.0002 53.0256C38.9092 51.7786 39.0355 49.8835 40.2824 48.7924L52.4445 36.0257L40.2823 23.2578C39.0354 22.1667 38.9091 20.2714 40.0001 19.0245Z" fill="currentColor"></path>
                <path className="opacity-0 ease-in-out delay-200 duration-1000 transition-opacity group-hover:opacity-100" d="M60 36.0273C60 37.6842 58.6569 39.0273 57 39.0273H15C13.3431 39.0273 12 37.6842 12 36.0273C12 34.3704 13.3431 33.0273 15 33.0273H57C58.6569 33.0273 60 34.3704 60 36.0273Z" fill="currentColor"></path>
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </ConfigProvider>
  );
}
