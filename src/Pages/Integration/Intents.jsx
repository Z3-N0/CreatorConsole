import React, { useState } from 'react';
import { Modal, Form, Input, Button, Layout, Menu, theme} from 'antd';
import {
  PlusCircleOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Content } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const intents = [
  getItem('add Intent', 'baseIntent', <PlusCircleOutlined />),
];


const Intents = () => {
  const [intentModalOpen, setIntentModalOpen] = useState(false);
  const [intentsno, setIntentsno] = useState(0);



  const intentEdit = (e) =>{
    if(e.key === 'baseIntent'){
      setIntentModalOpen(true);
    }
    else
    {
      console.log('Open');
    }
    
  }

  const handleIntentOk = (e) => {
    setIntentModalOpen(false);
    setIntentsno(intentsno+1);
    let newIntent = getItem(e.name, intentsno, <BulbOutlined />);
    intents.push(newIntent);
    console.log(intents)
  };


  const handleCancel = () => {
    setIntentModalOpen(false);
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <>

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
    <Layout className='intent-layout'>
      <Menu className='intent-menu' key = {intentsno} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={intents} onClick={intentEdit} />
      <Content className='intent-content' style={{ background: colorBgContainer }}>
        
        <Form className='utterance-form'>
          <Form.Item label='Utterances' name = 'uttr' >
                <Input />
          </Form.Item>
          <Button className="submit-button" type='primary' htmlType='submit'>
              add Utterance
          </Button>
        </Form>
      </Content>             
    </Layout>

    </>
  );

}

export default Intents;