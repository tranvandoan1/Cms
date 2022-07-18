import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Spin, Upload } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { addArtist } from "../../../../Features/ArtistSlice/ArtistSlice";
import { storage } from "../../../firebase";
import {
  getMember,
  uploadMember,
} from "./../../../../Features/MemberSlice/MemberSlice";
import "../../../../Style/ListDetailArtist.css";

type Props = {
  check: () => void;
};

const AddArtist = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [members, setMembers]: any = useState();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const dataMember = useAppSelector((data: any) => data.member.value);
  useEffect(() => {
    dispatch(getMember());
  }, []);

  const onFinish = (values: any) => {
    const dataMemberUpload: any = [];
    const artist_id = Math.random();
    dataMember.map((item: any) => {
      members.map((member: any) => {
        if (member == item.id) {
          dataMemberUpload.push({ ...item, artist_id: artist_id });
        }
      });
    });
    dataMemberUpload.map(
      async (item: any) =>
        await dispatch(uploadMember({ id: item.id, data: item }))
    );

    const newData: any = {
      name: values.name,
      time_start: values.time_start,
      avatar: imageUrlAvatar,
      number_members: members,
      artist_id: artist_id,
    };
    dispatch(addArtist(newData));
    props.check();
  };

  const [loading, setLoading] = useState(false);
  const [imageUrlAvatar, setImageUrlAvatar] = useState();
  const UploadAvatatr = (file: any) => {
    const imageRef = ref(storage, `images/${file.name}`);
    setLoading(true);
    uploadBytes(imageRef, file).then(() => {
      getDownloadURL(imageRef).then(async (url: any) => {
        setImageUrlAvatar(url);
        setLoading(false);
      });
    });
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
        <h3 className="title-add-artist"> Create New Artist</h3>
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
          label="Name Artist"
          name="name"
          labelAlign="left"
          rules={[
            {
              required: true,
              message: "You have not entered your name artist!",
            },
          ]}
        >
          <Input placeholder="Name artist" />
        </Form.Item>

        <Form.Item
          label="Time start"
          labelAlign="left"
          name="time_start"
          rules={[
            {
              required: true,
              message: "You have not entered your time start!",
            },
          ]}
        >
          <DatePicker placeholder="Time start" />
        </Form.Item>

        <Form.Item label="Add members" labelAlign="left" name="number_members">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Add members"
            onChange={(e: any) => setMembers(e)}
          >
            {dataMember.map((item: any, index: any) => {
              return <Select.Option key={item.id}>{item.name}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item name="avatar" labelAlign="left" label="Avatar">
          <Upload
            disabled={loading == true && true}
            showUploadList={false}
            beforeUpload={UploadAvatatr}
            name="logo"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {loading == true ? (
            <Spin style={{ marginLeft: 10 }} />
          ) : (
            imageUrlAvatar !== undefined && (
              <div className="edit">
                <img src={imageUrlAvatar == undefined ? "" : imageUrlAvatar} />
              </div>
            )
          )}
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
export default AddArtist;
