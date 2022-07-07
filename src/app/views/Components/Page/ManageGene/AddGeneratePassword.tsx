import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../Api/Auth";
const AddGeneratePassword: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log(values);
    if (values.password == values.idpassword) {
      try {
        const user = {
          email: values.email,
          password: values.password,
        };
        await signup(user);
        alert("Tạo tài khoản thành công")
        navigate("/admin/manage-generate-password");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("nhập lại password chưa khớp");
    }
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
        <h3>Thêm Tài khoản</h3>
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
          label="Tài khoản"
          name="email"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tài khoản!",
            },
          ]}
        >
          <Input type="email" placeholder="Tài khoản" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập password!",
            },
          ]}
        >
          <Input type="password" placeholder="mời bạn nhập password" />
        </Form.Item>

        <Form.Item
          label="Nhập lại Password"
          name="idpassword"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập password!",
            },
          ]}
        >
          <Input type="password" placeholder="mời bạn nhập password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
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
export default AddGeneratePassword;
