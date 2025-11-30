import { Layout, Menu } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";


const { Header, Content, Footer } = Layout;


export default function MainLayout() {
  const location = useLocation();


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#1677ff" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/pessoa",
              label: <Link to="/pessoa">Cadastro</Link>,
            },
            {
              key: "/lista",
              label: <Link to="/lista">Lista</Link>,
            },
          ]}
        />
      </Header>


      <Content style={{ padding: "24px" }}>
        <Outlet />
      </Content>


      <Footer style={{ textAlign: "center" }}>
        Cadastro de Pessoas — Clínica Médica
      </Footer>
    </Layout>
  );
}
