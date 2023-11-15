import { MenuProps } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  DashboardOutlined
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// Sider 栏菜单 item
const siderMenuItems: MenuItem[] = [
  getItem("Dashboard", "/admin/dashboard", <DashboardOutlined />),
  getItem("User Info", "/admin/users", <UserOutlined />),
  getItem("Team", "sub1", <TeamOutlined />, [
    getItem("Development", "/admin/teams/development"),
    getItem("Design", "/admin/teams/design"),
  ]),
  getItem("Files", "/admin/files", <FileOutlined />),
];

export default siderMenuItems;