import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const EidtSetlist = (props: Props) => {

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3>Sửa setlist</h3>
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Tên"
              name="total_title"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tên bài hát!",
                },
              ]}
            >
              <Input
                defaultValue={"Ánh nắng của anh"}
                placeholder="Tên bài hát"
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Thời gian"
              name="time"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập thời gian!",
                },
              ]}
            >
              <Input defaultValue={"1:30"} placeholder="Thời gian bài hát" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Bpm"
              name="bpm"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập bpm!",
                },
              ]}
            >
              <Input defaultValue={"100"} placeholder="Bpm" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="MP4"
              name="mp4"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mp4!",
                },
              ]}
            >
              <Input defaultValue={"5:30"} placeholder="MP4" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="Sân khấu"
              name="scene"
              style={{ padding: "0 20px" }}
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập SCENE!",
                },
              ]}
            >
              <Input defaultValue={"A"} placeholder="SCENE" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={4} md={12} lg={12} xl={12}>
            <Form.Item
              label="MIC"
              name="mic"
              labelAlign="left"
              style={{ padding: "0 20px" }}
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mic!",
                },
              ]}
            >
              <Input defaultValue={"H/S"} placeholder="Mic" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EidtSetlist;
