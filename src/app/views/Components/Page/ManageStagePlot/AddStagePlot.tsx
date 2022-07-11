import React, { Component, useRef, useState } from "react";
import { Stage, Layer, Arrow, Circle, Line } from "react-konva";
import { Form, Input, Row, Col, Button } from "antd";
import { useDispatch } from "react-redux";
import { addStagePlot } from "../../../Slide/StagePlot";
import { useNavigate } from "react-router-dom";

const historyStep:any = 0;

interface Drawable {
  x: any;
  y: any;
  startx: any;
  starty: any;
  points: any;
  color:any
}

class Drawable {
  constructor(startx: any, starty: any) {
    this.startx = startx;
    this.starty = starty;
  }
}

class FreePathDrawable extends Drawable {
  constructor(startx: any, starty: any, color:any) {
    super(startx, starty);
    this.color = color
    this.points = [startx, starty];
  }
  registerMovement(x: any, y: any) {
    this.points = [...this.points, x, y];
  }
  render() {
    return <Line points={this.points} fill="black" stroke={this.color}  />;
  }
}

class ArrowDrawable extends Drawable {
  constructor(startx: any, starty: any,color:any) {
    super(startx, starty);
    this.x = startx;
    this.y = starty;
    this.color = color
  }
  registerMovement(x: any, y: any) {
    this.x = x;
    this.y = y;
  }
  render() {
    const points: any = [this.startx, this.starty, this.x, this.y];
    return <Line points={points} fill="black" stroke={this.color}  />;
  }
}

class CircleDrawable extends Drawable {
  constructor(startx: any, starty: any, color:any) {
    super(startx, starty);
    this.startx = startx;
    this.starty = starty;
    this.color = color
  }
  registerMovement(x: any, y: any) {
    this.x = x;
    this.y = y;
  }
  render() {
    const dx = this.startx - this.x;
    const dy = this.starty - this.y;
    const radius = Math.sqrt(dx * dx + dy * dy);
    return (
      <Circle radius={radius} x={this.startx} y={this.starty} stroke={this.color} />
    );
  }
}
const AddStagePlot: React.FC = () => {
  const [drawables, setDrawables] = useState<any>([]);
  const [newDrawable, setNewDrawable] = useState<any>([]);
  const [newDrawableType, setNewDrawableType] =
    useState<any>("FreePathDrawable");
  const stageRef = useRef(null);
  const dispath: any = useDispatch();
  const navigate = useNavigate();
  const getNewDrawableBasedOnType = (x: any, y: any, type: any,color:any) => {
    const drawableClasses: any = {
      FreePathDrawable,
      ArrowDrawable,
      CircleDrawable,
    };
    return new drawableClasses[type](x, y, color);
  };

  const handleMouseDown = (e: any) => {
    if (newDrawable.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const color:any = document.getElementById("color")
      const colors:any = color.value
      const newDrawable = getNewDrawableBasedOnType(x, y, newDrawableType,colors);
      setNewDrawable([newDrawable]);
    }
  };

  const handleMouseUp = (e: any) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const drawableToAdd = newDrawable[0];
      drawableToAdd.registerMovement(x, y);
      drawables.push(drawableToAdd);
      setNewDrawable([]);
      setDrawables(drawables);
    }
  };

  const handleMouseMove = (e: any) => {
    if (newDrawable.length === 1) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const updatedNewDrawable = newDrawable[0];
      updatedNewDrawable.registerMovement(x, y);
      setNewDrawable([updatedNewDrawable]);
    }
  };

  const drawabless = [...drawables,...newDrawable];
  
  const onFinish = async (values: any) => {
    console.log(values);
    const uri: any = stageRef.current;
    const images = uri.toDataURL();
    const newStagePlot = {
      name: values.name,
      images: images,
    };
    await dispath(addStagePlot(newStagePlot));
    alert("thêm StagePlot thành công");
    navigate("/admin/manage-stage-plot");
  };
  const onFinishFailed = (values: any) => {};
  const handleUndo = () =>{
    if(drawabless){
      
    }
  }
  return (
    <div>
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
          label="Tên StagePlot"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên StagePlot!",
            },
          ]}
        >
          <Input placeholder="Tên bài hát" />
        </Form.Item>

        <div style={{ marginLeft: "5%",display:"flex" }}>
          <input type="color" id="color"  />
          <button
            onClick={(e) => {
              setNewDrawableType("ArrowDrawable");
            }}
          >
            Draw Arrows
          </button>
          <button
            onClick={(e) => {
              setNewDrawableType("CircleDrawable");
            }}
          >
            Draw Circles
          </button>
          <button
            onClick={(e) => {
              setNewDrawableType("FreePathDrawable");
            }}
          >
            Draw FreeHand!
          </button>
        </div>
        <Form.Item
          label="Pencil"
          name="images"
          labelAlign="left"
          style={{ marginTop: 20 }}
        >
          <Stage
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            width={1200}
            height={700}
            ref={stageRef}
            style={{ borderStyle: "solid", borderWidth: 1 }}
          >
            <Layer>
              {drawabless.map((drawable: any,index:any) => {
                return drawable.render();
              })}
            </Layer>
          </Stage>
        </Form.Item>

        <Form.Item style={{ marginLeft: "5%" }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddStagePlot;
