import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import {
  getArtist,
  uploadArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import {
  getSong,
  uploadSong,
  uploadSongg,
} from "./../../../../Features/SongSlice/SongSlice";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

type Props = {};

const EidtSong = (props: Props) => {
  const navigate = useNavigate();
  const { name, id, name_song, id_song } = useParams();

  const [valueText, setValueText] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dataSong = useAppSelector((data: any) => data.songs.value);
  const dataEdit = dataSong?.find((item: any) => item.id == id_song);

  useEffect(() => {
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const timeMp4 = new Date(values.mp4._d);
    const editData: any = {
      name: values.name == undefined ? dataEdit?.name : values.name,
      time:
        values.time == undefined
          ? dataEdit?.time
          : `
      ${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
              String(time.getMinutes()).length == 1 ? 0 : ""
            }${time.getMinutes()}:${
              String(time.getMilliseconds()).length == 1 && 0
            }${time.getSeconds()}`,
      lyrics: String(valueText).length == 0 ? dataEdit?.lyrics : valueText,
      section: values.section == undefined ? dataEdit?.section : values.section,
      bar: values.bar == undefined ? dataEdit?.bar : values.bar,
      bpm: values.bpm == undefined ? dataEdit?.bpm : values.bpm,
      mic: values.mic == undefined ? dataEdit?.mic : values.mic,
      mp4:
        values.mp4 == undefined
          ? dataEdit?.mp4
          : `${
              String(timeMp4.getHours()).length == 1 && 0
            }${timeMp4.getHours()}:${
              String(timeMp4.getMinutes()).length == 1 && 0
            }${timeMp4.getMinutes()}:${
              String(timeMp4.getMilliseconds()).length == 1 && 0
            }${timeMp4.getSeconds()}`,
      costume: values.costume == undefined ? dataEdit?.costume : values.costume,
      small_props:
        values.small_props == undefined
          ? dataEdit?.small_props
          : values.small_props,
    };

    dispatch(uploadSong({ id: id_song, data: editData }));
    navigate(`/artist&&name=${name}&&id=${id}/songs`);
    message.success("Edit successful");
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
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Edit Song</h3>
      </div>
      {dataEdit !== undefined && (
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
          <Row gutter={[16, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Name song"
                name="name"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.name} placeholder="Name song" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Time "
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="time"
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.time}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Section"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="section"
              >
                <Input defaultValue={dataEdit.section} placeholder="Section" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Bar"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
                name="bar"
              >
                <Input defaultValue={dataEdit.bar} placeholder="Quán hát" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Bpm"
                name="bpm"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.bpm} placeholder="Bpm" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="♪４"
                name="mp4"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.mp4}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Costume"
                name="costume"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.costume} placeholder="Costume" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="MIC"
                name="mic"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input defaultValue={dataEdit.mic} placeholder="Mic" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Form.Item
                label="Small props"
                name="small_props"
                labelAlign="left"
                style={{ padding: "0 0 20px 0" }}
                className="gutter-row"
              >
                <Input
                  defaultValue={dataEdit.small_props}
                  placeholder="Small props"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Lyrics" labelAlign="left" name="lyrics">
            <Editor
              apiKey="f5r9v2m5jorsgp469noiiqpd10fc7xhmn3th5897ghxcpank"
              onEditorChange={(newText: any) => setValueText(newText)}
              // value={valueText}
              initialValue={valueText == "" ? dataEdit.lyrics : valueText}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;background-color:black;color:#fff}",
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
              Sửa
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
export default EidtSong;
