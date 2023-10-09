import React from "react";
import {
  Checkbox,
  Space,
  Select,
  Card,
  Form,
  Input,
  Button,
  Divider,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AWS from "aws-sdk";
import keys from "./AWS-keys";

AWS.config.update(keys);
// const lexmodelbuildingservice = new AWS.LexModelBuildingService();


const Submitdata = (values) => {
  console.log(values);
};

const formItemLayout = {
  labelCol: {
    sm: {
      span: 2,
    },
  },
  wrapperCol: {
    sm: {
      maxWidth: 100,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: {
      maxWidth: 80,
      offset: 2,
    },
  },
};

const IntentsForm = () => {
  return (
    <>
      <Card title="Create Intent" className="intent-card">
        <Form
          className="intents-form"
          onFinish={Submitdata}
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
        >
          <Form.Item
            name="intentName"
            label="Intent Name"
            placeholder="IntentNameWithoutSpaces"
            rules={[
              {
                required: true,
                message: "Please enter a name without any whitespaces",
              },
            ]}
            style={{
              maxWidth: "40%",
            }}
          >
            <Input />
          </Form.Item>

          <div className="slot-form-comp">
            Enter sample utterances to trigger intent.
          </div>
          <Form.List
            name="utterances"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names) {
                    return Promise.reject(new Error("At least 2 utterances"));
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
                    label={index === 0 ? "Utterances" : ""}
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
                          message:
                            "Please enter a utterance or delete this field",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="I want a ​{Crust}​ crust ​{Type}​ pizza with ​{Sauce}​ sauce."
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
                    Add utterance
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />
          <div className="slot-form-comp">Slots</div>
          <Form.List name="slots">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    className="slots-embed-space"
                    align="baseline"
                  >
                    <Form.Item
                      label="Slot Name"
                      {...restField}
                      name={[name, "slotname"]}
                      rules={[{ required: true, message: "Missing Slot name" }]}
                    >
                      <Input placeholder="eg. Location" />
                    </Form.Item>
                    <Form.Item
                      label="Slot Type"
                      {...restField}
                      name={[name, "slotType"]}
                      rules={[{ message: "Missing Slot Type" }]}
                    >
                      <Select>
                        <Select.Option value="item1">item 1</Select.Option>
                        <Select.Option value="item2">item 2</Select.Option>
                        <Select.Option value="item3">item 3</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Prompt"
                      {...restField}
                      name={[name, "prompt"]}
                      rules={[{ required: true, message: "Missing prompt" }]}
                    >
                      <Input placeholder="eg. what city?" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "required"]}>
                      <Checkbox> Required</Checkbox>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Slot
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />

          <div className="slot-form-comp">Confirmation Prompt</div>
          <Form.Item label="Prompt" name="confirmation">
            <Input placeholder="Can i confirm your order for {Type} pizza with {Sauce} sauce?" />
          </Form.Item>

          <Divider />
          <div className="slot-form-comp">Rejection Statement</div>
          <Form.List
            name="Rejection"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names) {
                    return Promise.reject(new Error("At least 2 utterances"));
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
                    label={index === 0 ? "Statement" : ""}
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
                          message:
                            "Please enter a utterance or delete this field",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Your order for {Type} Pizza with {Sauce} sauce has been cancelled."
                        style={{
                          width: "90%",
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
                    Add Statement
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Divider />
          <div className="slot-form-comp">Conclusion Statement</div>
          <Form.List
            name="conclusions"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names) {
                    return Promise.reject(new Error("At least 2 utterances"));
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
                    label={index === 0 ? "Statement" : ""}
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
                          message:
                            "Please enter a utterance or delete this field",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Your order for {Type} Pizza with {Sauce} sauce has been placed."
                        style={{
                          width: "90%",
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
                    Add Statement
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Button
            className="submit-button-slots"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default IntentsForm;
