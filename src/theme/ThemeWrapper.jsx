import { ConfigProvider } from "antd";
import App from "../App.jsx";

export default function ThemeWrapper() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#d64545",
                    colorLink: "#d64545",
                    borderRadius: 6,
                    colorBgContainer: "#ffffff",
                },
                components: {
                    Menu: {
                        darkItemBg: "#d64545",
                        darkItemHoverBg: "#b73a3a",
                        darkItemSelectedBg: "#8e2a2a",
                        darkItemColor: "#fff",
                    },
                },
            }}
        >
            <App />
        </ConfigProvider>
    );
}
