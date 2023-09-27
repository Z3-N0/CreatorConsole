import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './StyleSheet.css';
import { useNavigate } from "react-router-dom";


const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const items = [
  getItem('Bot statistics', '1', <PieChartOutlined />),
  getItem('Bot integration', '2', <DesktopOutlined />),
  getItem('Manage Bots', '3', <SlidersOutlined/>),
  getItem('Billing', '4', <ContainerOutlined />), 
  
];


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const goto = (val) => {
    if(val['key'] === '1')
    {
      navigate("/");
    }
    else if(val['key'] === '2')
    {
      navigate("/integration");
    }
    else if(val['key'] === '3')
    {
      navigate("/manage");
    }
    else if(val['key'] === '4')
    {
      navigate("/billing");
    }
  }


  return (
    <Layout className='layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={goto} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Bot Statistics</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            In development
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;