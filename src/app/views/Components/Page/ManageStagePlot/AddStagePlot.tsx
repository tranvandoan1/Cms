import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addStagePlot } from "../../../Slide/StagePlot";



const AddStagePlot:React.FC = () =>{
    const dispath:any = useDispatch()
    const navigate =  useNavigate()
    const onFinish = (values: any) => {
        const age = values.age
       const newStagePlot = {
        ...values,
        age: +age
       }
        if(age>0  && age < 100){
            dispath(addStagePlot(newStagePlot))
            alert("Thêm thành công")
            navigate("/admin/manage-stage-plot")
        }else{
            alert("Tuổi  không được âm!")
        }
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
      };
    return(
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
            <Input type="number" placeholder="Nhập Tuổi của bạn!" />
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
            <Input type="text" placeholder="chọn màu" />
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
    )
}

export default AddStagePlot