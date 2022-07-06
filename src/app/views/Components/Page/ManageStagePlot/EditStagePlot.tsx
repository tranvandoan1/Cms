import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select } from "antd";
import { get } from "../../../Api/StagePlot";
import { editStagePlot } from "../../../Slide/StagePlot";
import { ReactSketchCanvas } from "react-sketch-canvas";

const { Option } = Select;

const EditStagePlot: React.FC = () => {
  const { id } = useParams();
  const canvas: any = useRef<HTMLInputElement>();
  const [StagePlot, setStagePlot] = useState<any>();
  const dispath: any = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getStagePlot = async (id: any) => {
      try {
        const { data } = await get(id);
        setStagePlot(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStagePlot(id);
  }, []);

  const onFinish = (values: any) => {
    const represen = values.name.split("")[0];
    console.log(represen);
    canvas.current
      .exportImage("png")
      .then((data: any) => {
        console.log(values.images.length);

        if (values.images.length === 0) {
          const newStagePlot = {
            ...StagePlot,
            name: values.name,
            color: values.color,
            represen: represen,
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        } else {
          const newStagePlot = {
            ...StagePlot,
            name: values.name,
            color: values.color,
            represen: represen,
            images: data,
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }
      })
      .catch((e: any) => {
        console.log(e, "dấdasd");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };
  console.log(StagePlot);

  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3>Update Stage Plot</h3>
      </div>
      {StagePlot != undefined ? (
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
            <Input
              placeholder="Tên Các Stage Plot "
              defaultValue={StagePlot?.name}
              value={StagePlot?.name}
            />
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
            <Select
              className="select-after"
              style={{ width: "100px" }}
              defaultValue={StagePlot?.color}
            >
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
          <Form.Item label="pencil" labelAlign="left" name="images">
            <ReactSketchCanvas
              ref={canvas}
              strokeWidth={4}
              strokeColor="black"
              height="400px"
              style={{
                border: "0.0625rem solid #9c9c9c",
                borderRadius: "0.25rem",
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              update
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default EditStagePlot;
