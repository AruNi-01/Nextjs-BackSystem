import { Button, ConfigProvider } from "antd";
import Link from "next/link";

import themeConfig from "@/theme/themeConfig";

export default function HomePage() {
  return (
    <ConfigProvider theme={themeConfig}>
      <div className="App">
        <h1>Home</h1>
        <Link href="/admin">
          <Button type="primary">Go Admin</Button>
        </Link>
      </div>
    </ConfigProvider>
  );
}
