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
      <Header style={{ background: "#d64545", overflowX: "auto" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ minWidth: "max-content" }}
          selectedKeys={[location.pathname]}
          items={[
            { key: "/cadastro", label: <Link to="/cadastro">Cadastro</Link> },
            { key: "/pessoas", label: <Link to="/pessoas">Pessoas</Link> },
            { key: "/consultas", label: <Link to="/consultas">Consultas</Link> },
          ]}
        />
      </Header>


      <Content
        style={{
          padding: "24px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <Outlet />
        </div>
      </Content>


      <Footer
        style={{
          textAlign: "center",
          background: "#fff",
        }}
      >
        Sistema — Clínica Médica
      </Footer>
    </Layout>
  );
}
