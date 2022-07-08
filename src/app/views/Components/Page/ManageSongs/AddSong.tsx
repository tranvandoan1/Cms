import { Editor } from "@tinymce/tinymce-react";
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
import moment from "moment";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { addSong } from "../../../../Features/SongSlice/SongSlice";
import "../../../../Style/ListSong.css";
import { getSong } from "./../../../../Features/SongSlice/SongSlice";
type Props = {};

const AddSong = (props: Props) => {
  const { name, id } = useParams();
  const [valueText, setValueText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataSongs = useAppSelector((data: any) => data.songs.value);
  useEffect(() => {
    dispatch(getSong());
  }, []);
  const onFinish = (values: any) => {
    const time = new Date(values.time._d);
    const timeMp4 = new Date(values.time._d);

    const newData: any = {
      name: values.name,
      time: `${String(time.getHours()).length == 1 && 0}${time.getHours()}:${
        String(time.getMinutes()).length == 1 && 0
      }${time.getMinutes()}:${
        String(time.getMilliseconds()).length == 1 && 0
      }${time.getSeconds()}`,
      lyrics: valueText,
      section: values.section,
      bar: values.bar,
      bpm: values.bpm,
      mic: values.mic,
      mp4: `${
        String(timeMp4.getHours()).length == 1 && 0
      }${timeMp4.getHours()}:${
        String(timeMp4.getMinutes()).length == 1 && 0
      }${timeMp4.getMinutes()}:${
        String(timeMp4.getMilliseconds()).length == 1 && 0
      }${timeMp4.getSeconds()}`,
      costume: values.costume,
      small_props: values.small_props,
    };
    dispatch(addSong(newData));

    navigate(`/artist&&name=${name}&&id=${id}/songs`);
    message.success("Add successful");
  };

  return (
    <div>
      <div
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 30,
        }}
      >
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Add Song</h3>
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
              rules={[
                {
                  required: true,
                  message: "You have not entered the song name!",
                },
              ]}
            >
              <Input placeholder="Name song" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Time "
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              name="time"
              rules={[
                {
                  required: true,
                  message: "You have not chosen a time!",
                },
              ]}
            >
              <TimePicker defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Section"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              name="section"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập section!",
                },
              ]}
            >
              <Input placeholder="Section" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Bar"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              name="bar"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập Bar!",
                },
              ]}
            >
              <Input placeholder="Quán hát" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Bpm"
              name="bpm"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              rules={[
                {
                  required: true,
                  message: "You have not entered bpm!",
                },
              ]}
            >
              <Input placeholder="Bpm" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="♪４"
              name="mp4"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              rules={[
                {
                  required: true,
                  message: "You have not imported ♪４!",
                },
              ]}
            >
              <TimePicker defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Costume"
              name="costume"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              rules={[
                {
                  required: true,
                  message: "You have not entered costume!",
                },
              ]}
            >
              <Input placeholder="Costume" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="MIC"
              name="mic"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              rules={[
                {
                  required: true,
                  message: "You have not entered the mic!",
                },
              ]}
            >
              <Input placeholder="Mic" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form.Item
              label="Small props"
              name="small_props"
              labelAlign="left"
              style={{ padding: "0 0 20px 0" }}
              className="gutter-row"
              rules={[
                {
                  required: true,
                  message: "You have not imported props!",
                },
              ]}
            >
              <Input placeholder="Small props" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Lyrics"
          labelAlign="left"
          name="lyrics"
          wrapperCol={{
            offset: 0,
            span: 21,
          }}
          labelCol={{
            offset: 0,
            span: 3,
          }}
          rules={[
            {
              required: true,
              message: "You haven't entered the lyrics yet!",
            },
          ]}
        >
          <Editor
            apiKey="f5r9v2m5jorsgp469noiiqpd10fc7xhmn3th5897ghxcpank"
            onEditorChange={(newText: any) => setValueText(newText)}
            value={valueText}
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddSong;
