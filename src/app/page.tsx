import { Button, ConfigProvider } from "antd";
import Link from "next/link";

import theme from "./theme/themeConfig";

export default function HomePage() {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <h1>Home</h1>
        <Link href="/admin">
          <Button type="primary">Go Admin</Button>
        </Link>
      </div>
    </ConfigProvider>
  );
}
