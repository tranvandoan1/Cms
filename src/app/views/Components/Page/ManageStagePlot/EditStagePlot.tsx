import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { get } from "../../../Api/StagePlot";
import { editStagePlot } from "../../../Slide/StagePlot";

const EditStagePlot: React.FC = () => {
  const { id } = useParams();
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
    const age = values.age;
    const newStagePlot = {
      ...values,
      age: +age,
      id: id,
    };
    console.log(newStagePlot);

    if (age > 0 && age < 100) {
      dispath(editStagePlot(newStagePlot));
      alert("Sửa thành công");
      navigate("/admin/manage-stage-plot");
    } else {
      alert("Tuổi  không được âm!");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
            />
          </Form.Item>

          <Form.Item
            label="Tuổi"
            labelAlign="left"
            name="age"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập tuổi!",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập Tuổi của bạn!"
              defaultValue={StagePlot?.age}
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
            <Input
              type="text"
              placeholder="chọn màu"
              defaultValue={StagePlot?.color}
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
