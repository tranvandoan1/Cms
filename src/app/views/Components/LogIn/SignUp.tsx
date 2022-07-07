import { Button, Checkbox, Form, Input, Modal, Upload } from "antd";
import React from "react";
import styles from "../../../Style/Login.module.css";
import "../../../Style/Login.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "./../../firebase/index";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
const SignUp = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  // const handleChange = (e: any) => {
  //   console.log(e.file.name)
  //   const imageRef = ref(storage, `images/${e.file.name}`);
  //   uploadBytes(imageRef, e).then(() => {
  //     getDownloadURL(imageRef).then(async (url) => {
  //       console.log(url);
  //     });
  //   });
  // };
  const Upload1 = (file: any) => {
    console.log(file);
    // const imageRef = ref(storage, `images/${file.name}`);
    // setLoading1(true);
    // uploadBytes(imageRef, file).then(() => {
    //   getDownloadURL(imageRef).then(async (url) => {
    //     await setImageUrl1(url);

    //     setLoading1(false);
    //   });
    // });
  };
  return (
    <div className={styles.background}>
      <Modal title="NRC - Sân khấu" visible={true} width={500}>
        <h3>Đăng ký</h3>
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
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            labelAlign="left"
            name="password"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Avatar"
            labelAlign="left"
            valuePropName=""
          >
            <Upload
              listType="picture"
              showUploadList={false}
              beforeUpload={Upload1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 0,
            }}
          >
            <Button type="primary" htmlType="submit" className="button-login">
              Đăng ký
            </Button>
            <br />
            <div className="hr">Hoặc</div>

            <br />
            <div style={{ textAlign: "center" }}>
              <Link to="/signin">Bạn đã có tài khoản</Link>{" "}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SignUp;
