import { Layout, Menu } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        style={{
          background: "#d64545",
          position: "sticky",   // fixa no topo
          top: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={[
            { key: "/cadastro", label: <Link to="/cadastro">Cadastro</Link> },
            { key: "/pessoas", label: <Link to="/pessoas">Pessoas</Link> },
            { key: "/consultas", label: <Link to="/consultas">Consultas</Link>},
          ]}
        />
      </Header>

      <Content
        style={{
          padding: "24px",
          flex: 1,
        }}
      >
        <Outlet />
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "#fff",
        }}
      >
        Cadastro de Pessoas — Clínica Médica
      </Footer>
    </Layout>
  );
}
