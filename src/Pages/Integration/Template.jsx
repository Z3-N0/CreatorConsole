import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  SlidersOutlined,
  FolderAddOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
  CarOutlined,
  CoffeeOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Card, Button} from 'antd';
import '../StyleSheet.css';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

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
  const [selected, setSelected] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const goto = (val) => {
    if (val['key'] === '1') {
      navigate("/");
    }
    else if (val['key'] === '2') {
      navigate("/Integration");
    }
    else if (val['key'] === '3') {
      navigate("/Manage");
    }
    else if (val['key'] === '4') {
      navigate("/Billing");
    }
  }

  

  const onFinish = () => {
    console.log(selected);
    navigate("/Integration/Editor");
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
            <Breadcrumb.Item>Template</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: colorBgContainer }} className='content-botIntegration-sub'>
            Please Choose a Template:
            <div className='cards-container'> 
              <Card className='template-cards'
                hoverable
                cover={<FolderAddOutlined />}
                onClick={()=>{setSelected("blank")}}
              >
                <Meta title="Blank Bot" description="Create your chatbot from scratch."/>
              </Card>

              <Card className='template-cards'
                hoverable
                cover={<CarOutlined />}
                onClick={()=>{setSelected("trip")}}
                name = "Trip"
              >
                <Meta title="Book a Trip" description="Schedule trips and plans with customers" />
              </Card>

              <Card className='template-cards'
              id='test'
                hoverable
                cover={<InfoCircleOutlined />}
                onClick={()=>{setSelected("custSupport")}}
                name = "CustSupport"
              >
                <Meta title="Customer Support" description="Support bot meant to answer common queries."  />
              </Card>

              <Card className='template-cards'
                hoverable
                cover={<CoffeeOutlined />}
                onClick={()=>{setSelected("restaurant")}}
                name = "Restaurant"
              >
                <Meta title="Restaurants" description="Take orders and manage restarants." />
              </Card>

              <Card className='template-cards'
                hoverable
                cover={<ScheduleOutlined />}
                onClick={()=>{setSelected("meeting")}}
                name = "Meeting"
              >
                <Meta title="Book a meeting" description="Schedule meetings within an organization" />
              </Card>
              
            </div>
            <Button className="submit-button" type='primary' onClick={onFinish}>
              Save and Proceed
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;