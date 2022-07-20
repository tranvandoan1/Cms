import { Button, Form, Input, Modal, Upload } from "antd";
import "../../../Style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Vector324 from "../../../assets/images/Vector324.png";
import Vector1212 from "../../../assets/images/Vector1212.png";
const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    console.log(values);
    navigate("/list-artist");
  };
  console.log("đâsdas");
  return (
    <div className="background">
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "10vh",
        }}
      ></div>
      <div
        style={{
          background: "#2F2F2F",
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="box">
          <div className="box-list">
            <h3 className="title">LOG IN</h3>
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
              style={{
                background: "black",
                padding: "20px 40px",
                textAlign: "center",
              }}
            >
              <Form.Item
                name="email"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: "You have not entered your email!",
                  },
                ]}
                style={{ color: "#fff", marginTop: 30 }}
              >
                <Input
                  className="email"
                  prefix={<img src={Vector324} />}
                  placeholder="メールアドレス"
                />
              </Form.Item>

              <Form.Item
                labelAlign="left"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "You have not entered your password!",
                  },
                ]}
              >
                <Input
                  className="email"
                  prefix={<img src={Vector1212} />}
                  placeholder="パスワード"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 0,
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-login"
                >
                  <span className="button-text"> ログイン</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
