import { Button, Form, Input, Select } from "antd";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStagePlot } from "../../../Slide/StagePlot";
import { ReactSketchCanvas } from "react-sketch-canvas";
const { Option } = Select;

const AddStagePlot: React.FC = () => {
  const dispath: any = useDispatch();
  const navigate = useNavigate();
  const canvas: any = useRef<HTMLInputElement>();
  const [strokeColor, setStrokeColor] = useState<string>("black");
  const onFinish = (values: any) => {
    const represen = values.name.split("")[0];
    console.log(values);
    canvas.current
      .exportImage("png")
      .then((data: any) => {
        console.log(data);
        const newStagePlot = {
          name: values.name,
          color: values.color,
          represen: represen,
          images: data,
        };
        console.log(newStagePlot);
        dispath(addStagePlot(newStagePlot));
        alert("Thêm thành công");
        navigate("/admin/manage-stage-plot");
      })
      .catch((e: any) => {
        console.log(e, "dấdasd");
      });
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
        <h3>Thêm Stage Plot</h3>
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
        <Form.Item
          label="Tên Stage Plot"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên!",
            },
          ]}
        >
          <Input type="text" placeholder="Tên Các Stage Plot " />
        </Form.Item>

        <Form.Item
          label="Màu sắc"
          labelAlign="left"
          name="color"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn màu!",
            },
          ]}
        >
          <Select className="select-after" style={{ width: "100px" }}>
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
            <Option value="red">Red</Option>
            <Option value="lime">Lime</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="cyan">Cyan</Option>
            <Option value="magenta">Magenta</Option>
            <Option value="silver">Silver</Option>
            <Option value="gray">Gray</Option>
            <Option value="maroon">Maroon</Option>
            <Option value="olive">Olive</Option>
            <Option value="green">Green</Option>
            <Option value="purple">Purple</Option>
            <Option value="teal">Teal</Option>
            <Option value="navy">Navy</Option>
          </Select>
        </Form.Item>

        <div style={{ marginLeft: "24.6%", marginBottom: 10 }}>
          <Button
            style={{ margin: "0px 5px", backgroundColor: "black" }}
            onClick={() => {
              setStrokeColor("black");
            }}
          >
            <div style={{ width: 20 }} />
          </Button>
          <Button
            style={{ margin: "0px 5px", backgroundColor: "blue" }}
            onClick={() => {
              setStrokeColor("blue");
            }}
          >
            <div style={{ width: 20 }} />
          </Button>
          <Button
            style={{ margin: "0px 5px", backgroundColor: "red" }}
            onClick={() => {
              setStrokeColor("red");
            }}
          >
            <div style={{ width: 20 }} />
          </Button>
          <Button
            style={{ margin: "0px 5px", backgroundColor: "yellow" }}
            onClick={() => {
              setStrokeColor("yellow");
            }}
          >
            <div style={{ width: 20 }} />
          </Button>
        </div>
        <Form.Item
          label="pencil"
          labelAlign="left"
          name="images"
          rules={[
            {
              required: true,
              message: "Bạn chưa vẽ đội hình!",
            },
          ]}
        >
          <ReactSketchCanvas
            ref={canvas}
            strokeWidth={4}
            strokeColor={strokeColor}
            height="400px"
            style={{
              border: "0.0625rem solid #9c9c9c",
              borderRadius: "0.25rem",
            }}
          />
        </Form.Item>
        <div style={{ marginLeft: "24.6%" }}>
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            onClick={() => {
              canvas.current.redo();
            }}
          >
            tiến
          </Button>
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            danger
            onClick={() => {
              canvas.current.undo();
            }}
          >
            lùi
          </Button>
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            danger
            onClick={() => {
              canvas.current.clearCanvas();
            }}
          >
            clear
          </Button>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStagePlot;
