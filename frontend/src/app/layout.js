import "@ant-design/v5-patch-for-react-19";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "antd/dist/reset.css";
import AuthInitializer from "./authInitializer";
import Providers from "./providers";
import NotificationListener from "@/components/notificationListener";
export const metadata = {
  title: "My App",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NotificationListener />
          <AuthInitializer>
            <AntdRegistry>{children}</AntdRegistry>
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
