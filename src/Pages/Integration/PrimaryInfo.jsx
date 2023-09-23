import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  ContainerOutlined,
  SlidersOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Select, Radio,  Form, Input,  Upload, Button } from 'antd';
import '../StyleSheet.css';
import { useNavigate } from "react-router-dom";


const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
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

  const onFinish = (val) => {
    console.log(val);
    navigate("/Integration/Template");
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
            <Breadcrumb.Item>Primary Information</Breadcrumb.Item>
          </Breadcrumb>


          <div style={{ background: colorBgContainer }} className='content-botIntegration-sub'>
            <Form className='botIntegration-form1' 
            labelCol={{ span: 6, }} 
            wrapperCol={{ span: 14, }} 
            layout="horizontal"
            onFinish={onFinish}
            >

            <Form.Item label="Bot Name" name = 'name'
            rules={[
              {
                required: true,
                min : 3, 
                message: "Minimum 3 characters"
              },
            ]}>
              <Input />
            </Form.Item>


            <Form.Item label="Bot Avatar" name = 'image'
            valuePropName="fileList" 
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please Upload an Avatar"
              },
            ]}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div>
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>


            <Form.Item label="Default Language" name = 'lang'
            rules={[
              {
                required: true,
                message: "Please choose a language"
              },
            ]}>
              <Select>
                <Select.Option value="1">English</Select.Option>
                <Select.Option value="2">Lan2</Select.Option>
                <Select.Option value="3">Lan3</Select.Option>
                <Select.Option value="4">Lan4</Select.Option>
              </Select>
            </Form.Item>


           Is your use of this bot is subject to the <a target='_blank' href='https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions' rel="noreferrer">Children's Online Privacy Protection Act (COPPA)</a>:
            <Form.Item name = "COPPA"
            rules={[
              {
                required: true,
                message: "Please choose an answer"
              },
            ]}>
              <Radio.Group defaultValue="No">
                <Radio value="Yes"> Yes </Radio>
                <Radio value="No"> No </Radio>
              </Radio.Group>
            </Form.Item>


            <Button className="submit-button" type='primary' htmlType='submit'>
              Save and Proceed
            </Button>
        
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;