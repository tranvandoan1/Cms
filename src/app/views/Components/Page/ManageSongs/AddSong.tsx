import { Editor } from "@tinymce/tinymce-react";
import { Button, DatePicker, Form, Input, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { addSong } from "../../../../Features/SongSlice/SongSlice";

type Props = {};

const AddSong = (props: Props) => {
  const [valueText, setValueText] = useState();
  console.log(valueText);
  const navigete = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    const time = new Date(values.time._d);  

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
    };
    console.log(newData);
    dispatch(addSong(newData));
    navigete("/admin/manage-songs");
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
        <h3>Thêm artist</h3>
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
        <Form.Item
          label="Tên bài hát"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên!",
            },
          ]}
        >
          <Input placeholder="Tên bài hát mà công ty hợp tác, quản lý" />
        </Form.Item>

        <Form.Item
          label="Thời gian "
          labelAlign="left"
          name="time"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn thời gian !",
            },
          ]}
        >
          <TimePicker defaultOpenValue={moment("00:00:00", "HH:mm:ss")} />
        </Form.Item>
        <Form.Item
          label="Lời bài hát"
          labelAlign="left"
          name="lyrics"
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập lời bài hát!",
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
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Section"
          labelAlign="left"
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
        <Form.Item
          label="Bar"
          labelAlign="left"
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
