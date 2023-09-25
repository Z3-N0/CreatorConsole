import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  SlidersOutlined,
  FormOutlined,
  DeploymentUnitOutlined, 
  PlusCircleOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Form, Input, Button, Modal } from 'antd';
import '../StyleSheet.css';
import { useNavigate } from "react-router-dom";
import { ConditionallyRender } from "react-util-kit";



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

const intents = [
  getItem('Intents', 'sub1', <FormOutlined />, [getItem('add Intent', 'baseIntent', <PlusCircleOutlined />)]),
];

const slots = [
  getItem('Slots', 'sub2', <DeploymentUnitOutlined />, [getItem('add Slot ', 'baseSlot', <PlusCircleOutlined />)]),
];



const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [incollapsed, setIncollapsed] = useState(false);
  const [intentModalOpen, setIntentModalOpen] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [intentsno, setIntentsno] = useState(0);
  const [slotsno, setSlotsno] = useState(0);
  const [intenteditor, setIntentEditor] = useState(false);
 
  

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const slotEdit = (e) =>{
    if(e.key === 'baseSlot'){
      setSlotModalOpen(true);
    }
    else
    {
      setIntentEditor(true);
    }
    
  }

  const intentEdit = (e) =>{
    if(e.key === 'baseIntent'){
      setIntentModalOpen(true);
    }
    else
    {
      setIntentEditor(true);
    }
    
  }

  const handleIntentOk = (e) => {
    setIntentModalOpen(false);
    setIntentsno(intentsno+1)
    let newIntent = getItem(e.name, intentsno, <BulbOutlined />)
    intents['0'].children.push(newIntent);
  };

  const handleSlotOk = (e) => {
    setSlotModalOpen(false);
    setSlotsno(slotsno+1)
    let newSlot = getItem(e.name, slotsno, <BulbOutlined />)
    slots['0'].children.push(newSlot);
  }

  const handleCancel = () => {
    setIntentModalOpen(false);
    setSlotModalOpen(false);
  }

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

        <Content className='content-main-editor'>
          <Breadcrumb className='main-breadcrumb-editor'>
            <Breadcrumb.Item>Bot Integration</Breadcrumb.Item>
            <Breadcrumb.Item>Bot Editor</Breadcrumb.Item>
          </Breadcrumb>
          <Modal title="Enter a name for your Intent" 
          closeIcon = " "
          open={intentModalOpen} 
          footer={[]}
          >
            
            <Form
                layout="vertical"
                className='modal-form'
                initialValues={{
                  modifier: 'public',
                }}
                onFinish={handleIntentOk}>
              <Form.Item name = 'name'>
                <Input placeholder='sampleIntent'/>
              </Form.Item>
              <div className='modal-button-container'>
                <Button className='modal-button' key="cancel" type="primary" htmlType="reset" onClick={handleCancel}>
                  cancel
                </Button> 
                <Button className='modal-button' key="submit" type="primary" htmlType="submit">
                  submit
                </Button> 
              </div>
              
            </Form>
          </Modal>
          <Modal title="Enter a name for your Slot" 
          closeIcon = " "
          open={slotModalOpen} 
          footer={[]}
          >
            <Form
                layout="vertical"
                className='modal-form'
                initialValues={{
                  modifier: 'public',
                }}
                onFinish={handleSlotOk}>
              <Form.Item name = 'name'>
                <Input placeholder='sampleSlot'/>
              </Form.Item>
              <div className='modal-button-container'>
                <Button className='modal-button' key="cancel" type="primary" htmlType="reset" onClick={handleCancel}>
                  cancel
                </Button> 
                <Button className='modal-button' key="submit" type="primary" htmlType="submit">
                  submit
                </Button> 
              </div>
              
            </Form>
          </Modal>
          
          <Layout className='inner-layout'>
            <Sider collapsible collapsed={incollapsed} onCollapse={(value) => setIncollapsed(value)}>
              
            <Menu key = {intentsno} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={intents} onClick={intentEdit} />
            <Menu key = {slotsno} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={slots} onclick= {slotEdit} />
            </Sider>
          </Layout>
          <ConditionallyRender
            ifTrue={intenteditor}
            show = {"hello"}
          />
          
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;