import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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
  // const [brushSize,setBrushSize] = useState(3)
  const [strokeColor, setStrokeColor] = useState<string>("black");
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
    console.log(values);
    canvas.current
      .exportImage("png")
      .then((data: any) => {
       
        if (values.images.length === 0 && values.color === undefined && values.name === undefined) {
          const newStagePlot = {
            ...StagePlot
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        } else if(values.images.length === 0 && values.name === undefined){
          // const represen = values.name.split("")[0];
          const newStagePlot = {
            ...StagePlot,
            color: values.color
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }else if(values.images.length === 0 && values.color === undefined){
          const represen = values.name.split("")[0];
          const newStagePlot = {
            ...StagePlot,
            name:values.name,
            represen: represen
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }else if(values.images.length === 0){
          const represen = values.name.split("")[0];
          const newStagePlot = {
            ...StagePlot,
            name:values.name,
            color: values.color,
            represen: represen
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }else if(values.name === undefined && values.color === undefined){
          const newStagePlot = {
            ...StagePlot,
            images: data
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }else if(values.name === undefined){
          const newStagePlot = {
            ...StagePlot,
            color: values.color,
            images: data
          };
          console.log(newStagePlot);
          dispath(editStagePlot(newStagePlot));
          alert("Sửa thành công");
          navigate("/admin/manage-stage-plot");
        }else{
          const represen = values.name.split("")[0];
          const newStagePlot = {
            ...StagePlot,
            name:values.name,
            color: values.color,
            represen: represen,
            images: data
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
        <h3>Update Stage Plot</h3>
      </div>
      {StagePlot != undefined ? (
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
          labelAlign="left"
          label="Tên Stage Plot" 
          name="name" 
          rules={[
            {
              transform(value:any) {
                  if(value === ""){
                    return {
                      message:"bạn chưa nhập tên StagePlot!"
                    }
                  }
              },
            }
          ]}
          >
            <Input
              placeholder="Tên Các Stage Plot "
              defaultValue={StagePlot?.name}
             
            />
          </Form.Item>

          <Form.Item
            label="Màu sắc"
            labelAlign="left"
            name="color"
            wrapperCol={{
              span: 1,
            }}
          >
            <Input type="color" defaultValue={StagePlot?.color} />
          </Form.Item>

          <div style={{ display: "flex" }}>
            <label style={{ marginLeft: "5.5%", marginBottom: 10 }}>
              Chọn màu sắc bút vẽ
              <input
                type="color"
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                  width: "55px",
                  height: 32,
                }}
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
          {/* <div style={{display:"flex",justifyContent:"space-between"}}>
            <input
              min="1"
              max="50"
              type="range"
              onChange={(event:any) => {
                setBrushSize(event.target.value);
              }}
              value={brushSize}
            />
          </div> */}
          <Form.Item label="pencil" labelAlign="left" name="images">
            <ReactSketchCanvas
              ref={canvas}
              strokeWidth={4}
              strokeColor={strokeColor}
              height="520px"
              style={{
                border: "0.0625rem solid #9c9c9c",
                borderRadius: "0.25rem",
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginLeft: "4%" }}>
            <Button type="primary" htmlType="submit" style={{ marginTop: 20 }}>
              update
            </Button>
          </Form.Item>
        </Form>
      ) : null}
    </div>
  );
};

export default EditStagePlot;
