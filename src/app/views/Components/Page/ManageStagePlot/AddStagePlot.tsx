import { createRef, useCallback, useRef, useState } from "react";
import { Layer, Stage, Line } from "react-konva";
import Circ from "./Draw/Circle";
import Elip from "./Draw/Elip";
import Rectangle from "./Draw/Rectangle";
import { Form } from "antd";
import "./../../../../Style/StagePlot.css";
const AddStagePlot = () => {
  const [selectedId, selectShape] = useState<any>(null);
  const [rectangles, setrectangles] = useState<any>([]);
  const [circles, setCircles] = useState<any>([]);
  const [shapes, setShapes] = useState<any>([]);
  const [lines, setLines] = useState<any>([]);
  const [elips, setElips] = useState<any>([]);

  const [remove, setRemove] = useState<any>(null);

  const [removeId, setRemoveId] = useState<any>(null);

  const [color, setColor] = useState<any>("#000000");
  const [tool, setTool] = useState<any>("pen");
  const [, updateState] = useState<any>();

  const [redos, setRedo] = useState<any>([]);
  const isDrawing = useRef<any>(false);
  const stageRef = useRef<any>();
  const getRandomInt = (max: any) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // đổi màu stroke
  const handleChangeColor = (e: any) => {
    setColor(e.target.value);
  };

  // vẽ hình chữ nhật
  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      stroke: color,
      id: `rect${rectangles.length + 1}`,
      check: 3,
    };
    const rects = rectangles.concat([rect]);
    setrectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };

  //vẽ hình tròn

  const addCircle = () => {
    console.log(remove);
    // const number = remove?.length + 1
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      stroke: color,
      id: `circ${circles.length + 1}`,
      check: 2,
    };

    const circs = circles.concat([circ]);
    setCircles(circs);
    const shs = shapes.concat([`circ${circles.length + 1}`]);
    setShapes(shs);
  };

  // vẽ hình elip

  const addElip = () => {
    const elip = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      radiusX: 100,
      radiusY: 50,
      stroke: color,
      id: `elip${elips.length + 1}`,
    };
    const elipss = elips.concat([elip]);
    setElips(elipss);
    const shs = shapes.concat([`elip${elips.length + 1}`]);
    setShapes(shs);
  };

  // call lại
  const forceUpdate = useCallback(() => updateState({}), []);

  // xóa 1 phần tử
  const undo = () => {
    if (shapes.length == 0) {
      return;
    }
    const lastId = shapes[shapes.length - 1];

    rectangles.find((item: any) => {
      if (item.id == lastId) {
        if (remove == undefined) {
          setRemove([item]);
          // console.log(remove, "1");
        } else if (remove.length == 1) {
          setRemove([...remove, item]);
          // console.log(remove, "2");
        } else if (remove.length >= 2) {
          // console.log(remove, "3");
          setRemove([...remove, item]);
        }
      }
    });
    circles.find((item: any) => {
      if (item.id == lastId) {
        if (remove == undefined) {
          setRemove([item]);
        } else if (remove.length == 1) {
          setRemove([...remove, item]);
        } else if (remove.length >= 2) {
          setRemove([...remove, item]);
        }
      }
    });
    lines.find((item: any) => {
      if (item.id == lastId) {
        if (remove == undefined) {
          setRemove([item]);
        } else if (remove.length == 1) {
          setRemove([...remove, item]);
        } else if (remove.length >= 2) {
          setRemove([...remove, item]);
        }
      }
    });

    if (removeId === null) {
      setRemoveId([lastId]);
    } else if (removeId.length == 1) {
      setRemoveId([removeId, lastId]);
    } else if (removeId.length >= 2) {
      setRemoveId([...removeId, lastId]);
    }

    rectangles.map((item: any) => {
      if (item.id == lastId) {
        setrectangles(rectangles.filter((r: any) => r.id !== lastId));
      }
    });

    circles.map((item: any) => {
      if (item.id == lastId) {
        setCircles(circles.filter((r: any) => r.id !== lastId));
      }
    });
    lines.map((item: any) => {
      if (item.id == lastId) {
        setLines(lines.filter((r: any) => r.id !== lastId));
      }
    });

    shapes.pop();

    setShapes(shapes);

    forceUpdate();
  };
  const redo = () => {
    if (remove == undefined) {
      return;
    }

    const lastId = removeId[removeId.length - 1];
    console.log(lastId);
    console.log(lines);
    remove.map((item: any) => {
      if (item.id == lastId) {
        console.log(item);
        if (item.check == 3 && remove.length == 1) {
          setrectangles([...rectangles, item]);
          setShapes([...shapes, item.id]);
          setRemove(null);
          setRemoveId(null);
        } else if (item.check == 3 && remove.length > 1) {
          setrectangles([...rectangles, item]);
          setShapes([...shapes, item.id]);
          remove.pop();
          setRemove(remove);
          removeId.pop();
          setRemoveId(removeId);
        }

        if (item.check == 2 && remove.length == 1) {
          setCircles([...circles, item]);
          setShapes([...shapes, item.id]);
          setRemove(null);
          setRemoveId(null);
        } else if (item.check == 2 && remove.length > 1) {
          setCircles([...circles, item]);
          setShapes([...shapes, item.id]);
          remove.pop();
          setRemove(remove);
          removeId.pop();
          setRemoveId(removeId);
        }

        if (item.check == 1 && remove.length == 1) {
          setLines([...lines, item]);
          setShapes([...shapes, item.id]);
          setRemove(null);
          setRemoveId(null);
        } else if (item.check == 1 && remove.length > 1) {
          setLines([...lines, item]);
          setShapes([...shapes, item.id]);
          remove.pop();
          setRemove(remove);
          removeId.pop();
          setRemoveId(removeId);
        }
      }
    });
    // setRemoveId(shapes);
    // remove.map((item: any) => {
    //   if (item.id !== lastId) {
    //     console.log(item);
    //     setRemove([item]);
    //   }
    // });
  };
  // console.log(remove?.length);
  // console.log(redos);
  document.addEventListener("keydown", (e) => {
    if (e.code === "Delete") {
      let index = rectangles.findIndex((r: any) => r.id === selectedId);
      if (index !== -1) {
        rectangles.splice(index, 1);
        setrectangles(rectangles);
      }
      forceUpdate();
    }
  });
  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  // pencil

  const handleMouseDown = (e: any) => {
    if (tool === "pen") {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([
        ...lines,
        {
          tool,
          points: [pos.x, pos.y],
          color,
          id: `line${lines.length + 1}`,
          check: 1,
        },
      ]);
    }
    // if(tool === "rectangle"){
    //   isDrawing.current = true;
    //   const pos = e.target.getStage().getPointerPosition();
    //   const x = pos.x
    //   const y = pos.y
    //   console.log(x,y);
    //   const scaleX =  pos.x -x
    //   console.log(scaleX);
    // }
  };
  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (tool === "pen") {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      const line = lines.concat();
      setLines(line);
    }
    // if (tool === "rectangle") {
    //   if (!isDrawing.current) {
    //     return;
    //   }
    //   const stage = e.target.getStage();
    //   const point = stage.getPointerPosition();
    //   console.log(point)
    // }
  };
  const handleMouseUp = () => {
    if (tool === "pen") {
      isDrawing.current = false;
      const shs = shapes.concat([`line${lines.length}`]);
      setShapes(shs);
    }
  };
  return (
    <div className="div">

      <Form style={{ marginLeft: "5%",paddingTop:20,paddingBottom:20}}>
        <div>
          <label htmlFor="">Tên StagePlot : </label>
          <input
            type="text"
            style={{ width: 1100 }}
            placeholder="nhập tên StagePlot..."
          />
        </div>
        <h1 style={{ textAlign: "center" }}>vẽ</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="color"
            style={{ margin: 10 }}
            onChange={(e) => handleChangeColor(e)}
          />
          <button
            onClick={() => {
              addRectangle();
              setTool("rectangle");
            }}
          >
            Rectangle
          </button>
          <button
            onClick={() => {
              addCircle();
              setTool(null);
            }}
          >
            Circle
          </button>
          <button
            onClick={() => {
              addElip();
              setTool(null);
            }}
          >
            elip
          </button>
          <button onClick={() => setTool("pen")}>pen</button>
          <button onClick={undo}>undo</button>
          <button onClick={redo}>redo</button>
        </div>
        <div
          style={{
            backgroundColor:"GrayText",
            width: "1200px",
            height: "800px",
            borderRadius:20
          }}
        >
          <Stage
            width={1200}
            height={800}
            onMouseDown={(e) => {
              checkDeselect(e);
              handleMouseDown(e);
            }}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onTouchStart={(e: any) => {
              checkDeselect(e);
            }}
            ref={stageRef}
          >
            <Layer>
              {rectangles.map((rect: any, index: number) => {
                return (
                  <Rectangle
                    key={index}
                    shapeProps={rect}
                    isSelected={rect.id === selectedId}
                    onMousemove={() => setTool("rectangle")}
                    onSelect={() => {
                      console.log("aaa");
                      setTool("rectangle");
                      if (selectedId === null) {
                        selectShape(rect.id);
                      } else if (selectedId === rect.id) {
                        selectShape(null);
                      } else {
                        selectShape(rect.id);
                      }
                    }}
                    onChange={(newAttrs: any) => {
                      setTool("rectangle");
                      const rects = rectangles.slice();
                      rects[index] = newAttrs;
                      setrectangles(rects);
                    }}
                  />
                );
              })}

              {circles.map((circle: any, index: number) => {
                return (
                  <Circ
                    key={index}
                    shapeProps={circle}
                    isSelected={circle.id === selectedId}
                    onSelect={() => {
                      setTool("circle");
                      if (selectedId === null) {
                        selectShape(circle.id);
                      } else if (selectedId === circle.id) {
                        selectShape(null);
                      } else {
                        selectShape(circle.id);
                      }
                    }}
                    onChange={(newAttrs: any) => {
                      setTool("circle");
                      const circs = circles.slice();
                      circs[index] = newAttrs;
                      setCircles(circs);
                    }}
                  />
                );
              })}

              {lines.map((line: any, i: number) => {
                return (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.size}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                );
              })}
              {elips.map((elip: any, index: any) => {
                return (
                  <Elip
                    key={index}
                    shapeProps={elip}
                    isSelected={elip.id === selectedId}
                    onSelect={() => {
                      setTool("elip");
                      if (selectedId === null) {
                        selectShape(elip.id);
                      } else if (selectedId === elip.id) {
                        selectShape(null);
                      } else {
                        selectShape(elip.id);
                      }
                    }}
                    onChange={(newAttrs: any) => {
                      setTool("elip");
                      const elip = elips.slice();
                      elip[index] = newAttrs;
                      setElips(elip);
                    }}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
        <button>Thêm</button>
      </Form>
    </div>
  );
};

export default AddStagePlot;
