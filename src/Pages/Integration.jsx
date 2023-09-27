import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  SlidersOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
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
  getItem('Manage Bots', '3', <SlidersOutlined />),
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

  const onFinish = () => {
    navigate("/integration/primary-information");
  }

  return (
    <Layout className='layout'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items} onClick={goto} />
      </Sider>

      <Layout>
        <Header className='Headers' style={{ background: colorBgContainer, }}>
          Create and Integrate Custom Chatbots.
        </Header>

        <Content className='content-main'>
          <Breadcrumb className='main-breadcrumb'>
            <Breadcrumb.Item>Bot Integration</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ background: colorBgContainer }} className='content-botIntegration' >
            Create your bot now!
            <Button className="get-started" onClick={onFinish} type='primary' htmlType='submit'>
              Get Started
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;