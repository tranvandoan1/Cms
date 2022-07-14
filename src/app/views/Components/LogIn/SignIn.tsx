import { Button, Form, Input, Modal, Upload } from "antd";
import styles from "../../../Style/Login.module.css";
import "../../../Style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "./../../firebase/index";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    console.log(values);
    navigate("/list-artist");
  };

  return (
    <div className={styles.background}>
      <Modal title="NRC - Sân khấu" visible={true} width={500}>
        <h3>Đăng nhập</h3>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          autoComplete="off"
          style={{ background: "black" }}
        >
          <Form.Item
            name="email"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập email!",
              },
            ]}
            style={{ color: "#fff" }}
          >
            <Input prefix={<AiOutlineMail />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            labelAlign="left"
            name="password"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập password!",
              },
            ]}
          >
            <Input.Password prefix={<AiOutlineLock />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 0,
            }}
          >
            <Button type="primary" htmlType="submit" className="button-login">
              Đăng nhập
            </Button>
            <br />
            <div className="hr">Hoặc</div>
            <Link to="/signup" className="button-signup">
              Tạo tài khoản mới
            </Link>{" "}
            <br />
            <div style={{ textAlign: "center" }}>
              <a style={{ color: "black" }} href="">
                Quên mật khẩu?
              </a>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SignIn;
