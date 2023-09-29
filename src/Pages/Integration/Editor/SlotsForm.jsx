import React from "react";
import { Form, Input, Button, Divider } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import AWS from 'aws-sdk';
import keys from "./AWS-keys";


const { TextArea } = Input;

AWS.config.update(keys);
const lexmodelbuildingservice = new AWS.LexModelBuildingService();

const setFormat = (values) => {
  let arr = [];
  values.forEach(element => {
    arr.push({value : element})
    
  });
   return arr;
}

const Submitdata = (values) => {
  console.log("Received values of form:", values['vals']);
  let enumvals = setFormat(values['vals']);
  const params = {
    name : values['slotName'],
    description: values['desc'],
    enumerationValues: enumvals
  }
  lexmodelbuildingservice.putSlotType(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);               
 })


};

const formItemLayout = {
  labelCol: {
    sm: {
      span: 5,
    },
  },
  wrapperCol: {

    sm: {
      span: 15,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: {
      span: 15,
      offset: 5,
    },
  },
};


const SlotForm = () => {
  return (
    <>
      <Form 
      className="Slots-form" 
      onFinish={Submitdata}
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      >
        <Form.Item 
        name="slotName" 
        label="Slot Name"
        placeholder="slotNameWithoutSpaces"
        rules={[
          {
            required: true,
            message: "Please enter a name without any whitespaces"
          }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
        name="desc" 
        label="Description:"
        rules={[
          {
            required: true,
            message: "Please enter a description"
          }]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <div className="slot-form-comp">
          Enter Possible Values for the slot type:
        </div>
        <Form.List
          name="vals"
          rules={[
            {
              validator: async (_, names) => {
                if (!names) {
                  return Promise.reject(new Error("At least 2 Slot types"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? "Values" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please enter Slot value or delete this field",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Slot value"
                      style={{
                        width: "60%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "60%",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add Slot Value
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Button className="submit-button-slots" type="primary" htmlType="submit">
          Save
        </Button>

        <Divider />
      </Form>
    </>
  );
};

export default SlotForm;
