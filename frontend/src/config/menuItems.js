import {
  AppstoreOutlined,
  TagsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "/dashboard/product",
    icon: <AppstoreOutlined />,
    label: "Products",
  },
  {
    key: "/dashboard/category",
    icon: <TagsOutlined />,
    label: "Categories",
  },
  {
    key: "signout", // special key for logout
    icon: <LogoutOutlined />,
    label: "Sign Out",
  },
];
