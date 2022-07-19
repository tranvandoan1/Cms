import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  TimePicker,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { getSetList } from "../../../../Features/SetListSlice/SetListSlice";
import { uploadSetList } from "../../../../Features/SetListSlice/SetListSlice";
import { getSong } from "../../../../Features/SongSlice/SongSlice";
const { TextArea } = Input;

type Props = {};
const dataSetList: any = [
  {
    detail: "thực hành sớm đi",
    time_upload: "2022-07-18T08:53:59.547Z",
    name: "Cháy lên đi",
    artist_id: "2",
    id_song: [4, 5, 6],
    time_start: "00:15:05",
    id: 1,
  },
  {
    artist_id: "2",
    detail: "text",
    id: 2,
    name: "Cùng nhau cháy nhé",
    time_start: "\n      00:04:05",
    time_upload: "2022-07-11T06:53:42.976Z",
    id_song: [4, 5],
  },
  {
    artist_id: "3",
    detail: "text",
    id: 3,
    name: "Tháng 7 dực dỡ",
    time_start: "\n      00:09:04",
    time_upload: "2022-07-08T16:25:10.998Z",
    id_song: [],
  },
  {
    detail: "cháy đi nè",
    name: "Chuyến đi thiện nguyện",
    artist_id: "5",
    id_song: [],
    time_upload: "",
    time_start: "\n      00:05:07",
    id: 4,
  },
];
const EidtSetlist = (props: Props) => {
  const navigate = useNavigate();
  const { name, id, name_setlist, id_setlist } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const dataSetList = useAppSelector((data: any) => data.setlist.value);
  const dataEdit = dataSetList?.find((item: any) => item.id == id_setlist);
  // useEffect(() => {
  //   dispatch(getSetList());
  // }, []);
  const onFinish = (values: any) => {
    const time_upload = new Date();

    const editData = {
      detail: values.detail == undefined ? dataEdit.detail : values.detail,
      time_upload: time_upload,
      name: values.name == undefined ? dataEdit.name : values.name,
      artist_id: dataEdit.artist_id,
      id_song: dataEdit.id_song,
      time_start: dataEdit.time_start,
    };
    dispatch(uploadSetList({ id: id_setlist, data: editData }));
    navigate(`/artist&&name=${name}&&id=${id}/setlist`);
    message.success("Edit successful");
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
        <h3 style={{ color: "#fff", marginTop: "20px" }}>Add setlist</h3>
      </div>
      {dataEdit !== undefined && (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="Name setlist"
                name="name"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <Input
                  defaultValue={dataEdit.name}
                  placeholder="Name setlist"
                />
              </Form.Item>
            </Col>

            <Col xs={12} sm={4} md={12} lg={12} xl={12}>
              <Form.Item
                label="Time start"
                name="time_start"
                labelAlign="left"
                style={{ padding: "0 20px" }}
              >
                <TimePicker
                  defaultValue={moment(`${dataEdit.time_start}`, "HH:mm:ss")}
                  defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Detail"
            name="detail"
            labelAlign="left"
            wrapperCol={{
              offset: 0,
              span: 20,
            }}
            labelCol={{
              offset: 0,
              span: 4,
            }}
            style={{ padding: "0 20px" }}
          >
            <TextArea
              defaultValue={dataEdit.detail}
              rows={4}
              placeholder="Detail"
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 20,
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
export default EidtSetlist;
