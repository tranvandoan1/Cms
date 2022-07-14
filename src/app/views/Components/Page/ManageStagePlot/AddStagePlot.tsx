import { Button, Form, Input, Select } from "antd";
import React, { createRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStagePlot } from "../../../../Features/Slide/StagePlot";
import { ReactSketchCanvas, ExportImageType } from "react-sketch-canvas";
const { Option } = Select;

const AddStagePlot: React.FC = () => {
  const dispath: any = useDispatch();
  const navigate = useNavigate();
  const [exportImageType, setexportImageType] = useState("png");
  const canvas: any = useRef<HTMLInputElement>();
  const canvasRef = createRef();
  const [strokeColor, setStrokeColor] = useState<string>("black");
  const onFinish = async (values: any) => {
    console.log(values.color);
    const represen = values.name.split("")[0];
    // console.log(canvas.current.exportImage("image/png"));
    if (values.color === undefined) {
      canvas.current
        .exportImage()
        .then((data: any) => {
          console.log(data);
          const newStagePlot = {
            name: values.name,
            color: "black",
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
    } else {
      canvas.current
        .exportImage()
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
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const changeColor = () => {
    const colorbox: any = window.document.getElementById("color");
    setStrokeColor(colorbox.value);
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
          wrapperCol={{
            span: 1,
          }}
          name="color"
        >
          <input type="color" />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <label style={{ marginLeft: "5.5%", marginBottom: 10 }}>
            Chọn màu sắc bút vẽ
            <input
              type="color"
              style={{ marginLeft: 10, marginBottom: 10, width: "30px" }}
              id="color"
              onChange={() => changeColor()}
            />
          </label>

          <div style={{ marginLeft: "2%" }}>
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
            strokeWidth={20}
            strokeColor={strokeColor}
            height="520px"
            backgroundImage={'black'}
            style={{
              border: "0.0625rem solid #9c9c9c",
              borderRadius: "0.25rem",
            }}
          />
        </Form.Item>
        <Form.Item style={{ marginLeft: "5.5%" }}>
          <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStagePlot;
