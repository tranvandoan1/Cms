import {
  CheckOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  message,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import "../../../../Style/LayoutAdmin.css";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../APP/Store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  getArtist,
  removeArtist,
  uploadArtist,
} from "../../../../Features/ArtistSlice/ArtistSlice";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import moment from "moment";
import AddArtist from "./AddArtist";
const { Header, Content } = Layout;
const dataArtist: any = [

  {
    name: "YG",
    time_upload: "2022-7-8",
    time_start: "2022-07-06T10:41:38.868Z",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2FBlackpink-G.jpg?alt=media&token=b9697eb8-d3b5-4f62-9f6c-4463a3db46df",
    number_members: [],
    id: 2,
  },
  {
    name: "BLACKPINK",
    time_upload: "2022-7-15",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2Fthanh-tich-sau-24-gio-dau-phat-hanh-lovesick-girls-luot-xem-qua-thap-so-voi-ky-vong-buoc-thut-lui-cua-blackpink-160-5271054.jpg?alt=media&token=7ffbb05c-591a-4eca-90b3-d47d7da30856",
    time_start: "2022-07-06T10:41:38.868Z",
    number_members: [],
    id: 3,
  },
  {
    name: "Lesserafim",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2Fhinh-anh-nhom-nhac-moi.jpg?alt=media&token=0f3a4e99-db61-4762-89ea-4285a5cf1bee",
    time_upload: "2022-7-8",
    time_start: "2022-07-06T10:41:38.868Z",
    number_members: [],
    id: 4,
  },
  {
    name: "BTS",
    time_upload: "2022-07-30T08:45:08.623Z",
    avatar:
      "https://vtv1.mediacdn.vn/thumb_w/650/2020/6/14/twicetwice-1592113303136628954213.jpg",
    time_start: "2022-07-05T08:45:06.313Z",
    number_members: ["2", "1"],
    id: 5,
  },
  {
    name: "BTS",
    avatar:
      "https://vtv1.mediacdn.vn/thumb_w/650/2020/6/14/twicetwice-1592113303136628954213.jpg",
    time_upload: "2022-07-30T08:45:08.623Z",
    time_start: "2022-07-05T08:45:06.313Z",
    number_members: ["2", "1"],
    id: 6,
  },
  {
    name: "BTS",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2Ftieu-su-gfriend-1-1.jpg?alt=media&token=304ff1e4-91fe-4b6e-b78a-5e20f3b0399a",
    time_upload: "2022-7-8",
    time_start: "2022-07-05T08:45:06.313Z",
    number_members: ["2", "1"],
    id: 7,
  },
  {
    name: "BTS1",
    time_upload: "2022-07-30T08:45:08.623Z",
    time_start: "2022-07-05T08:45:06.313Z",
    avatar: "https://i.doanhnhansaigon.vn/2019/03/26/2-1553591476_750x0.jpg",
    number_members: ["2", "1"],
    id: 8,
  },
  {
    name: "K-Pop BTS",
    time_upload: "2022-7-8",
    time_start: "2022-07-05T08:45:06.313Z",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2F71631-twitter.jpeg?alt=media&token=fee68dc9-a3dc-4f8e-a0a2-50bad4ca9ac5",
    number_members: ["2", "1"],
    id: 9,
  },
  {
    name: "GFriend ",
    time_start: "2022-07-14T04:30:30.081Z",
    number_members: ["1", "4", "5"],
    id: 10,
    time_upload: "2022-7-8",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2Ftieu-su-gfriend-1-1.jpg?alt=media&token=bcee825c-cd28-4bd6-ae9c-5dee17346976",
  },
  {
    name: "Kpop Twice",
    time_start: "2022-07-13T05:07:44.231Z",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/nrc-sankhau.appspot.com/o/images%2FHinh-anh-nhom-nhac-nu-kpop-TWICE-dep-moi-nhat-09.jpg?alt=media&token=d93b0374-acf6-4fef-b107-8870887f91d0",
    number_members: ["2", "6"],
    id: 11,
  },
];
const ListArtist: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  // const dataArtist = useAppSelector((data: any) => data.artist.value);

  const [idEdit, setIdEdit] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUrlAvatar, setImageUrlAvatar] = useState();
  const [nameArtist, setNameArtist] = useState();
  const [nameSearch, setNameSearch] = useState();
  const [dataSearch, setDataSearch] = useState();

  // useEffect(() => {
  //   dispatch(getArtist());
  // }, []);

  const logout = () => {
    navigate("/");
  };
  // upload image
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
  // upload
  const onClickSave = (item: any) => {
    const newData = {
      time_upload: `${moment().year()}-${
        moment().month() + 1
      }-${moment().date()}`,
      name: nameArtist == undefined ? item.name : nameArtist,
      avatar: imageUrlAvatar == undefined ? item.avatar : imageUrlAvatar,
      artist_id: item.artist_id,
      number_members: item.number_members,
      time_start: item.time_start,
    };
    message.success("Successful upload");
    dispatch(uploadArtist({ id: item.id, data: newData }));
    setIdEdit(undefined);
    setImageUrlAvatar(undefined);
  };

  // menu
  const menu = (
    <Menu style={{ marginTop: -20, padding: 5 }}>
      <Menu.Item key="userInfo" style={{ padding: "10px  10px" }}>
        <Avatar
          size={35}
          src="https://img.websosanh.vn/v2/users/review/images/4wvuq0i4ozs1q.jpg?compress=85"
        />{" "}
        <span>tranvandoan</span>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<LogoutOutlined />} onClick={() => logout()} type="text">
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );

  const confirm = (id: any) => {
    dispatch(removeArtist(id));
    message.success("Successful delete");
  };

  // search
  const search = (value: any) => {
    const dataSearch = dataArtist.filter((person: any) => {
      return person.name.toLowerCase().includes(value);
    });
    setDataSearch(dataSearch);
  };

  // add
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Layout className="layout">
        <Header
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
            items={[
              {
                key: "1",
                label: "Artist",
              },
            ]}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <SettingOutlined
              style={{
                fontSize: 20,
                cursor: "pointer",
                color: "#fff",
                marginRight: 25,
                marginTop: -2,
              }}
            />
            <Dropdown overlay={menu}>
              <span>
                <LogoutOutlined
                  style={{ fontSize: 20, cursor: "pointer", color: "#fff" }}
                />
              </span>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ padding: "0 50px", height: "100%" }}>
          <div className="site-layout-content">
            <div
              className="flex"
              style={{
                margin: "20px 0",
                justifyContent: "space-between",
              }}
            >
              <div className="flex">
                <Input
                  onChange={(e: any) => (
                    search(e.target.value), setNameSearch(e.target.value)
                  )}
                  placeholder="Basic usage"
                />
                <Button
                  style={{ background: "black", color: "#fff", marginLeft: 10 }}
                >
                  Search
                </Button>
              </div>

              <div className="flex">
                <Button
                  onClick={showModal}
                  style={{ background: "black", color: "#fff" }}
                >
                  <PlusOutlined />
                </Button>
                <span className="add" style={{ marginLeft: 10 }}>
                  Create New Artist
                </span>
              </div>
            </div>
            {nameSearch !== undefined && String(nameSearch).length > 0 && (
              <span style={{ color: "#fff", fontSize: 20, marginTop: 10 }}>
                Kết quả tìm kiếm với : '{" "}
                <span style={{ color: "red" }}>{nameSearch}</span> '
              </span>
            )}
            <Row gutter={[16, 24]}>
              {(dataSearch == undefined ? dataArtist : dataSearch).map(
                (item: any, index: any) => {
                  return (
                    <Col
                      key={index}
                      className="gutter-row"
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={4}
                      style={{ marginBottom: 10 }}
                    >
                      <div className="list-artist">
                        <div className="artist">
                          {idEdit == item.id ? (
                            <React.Fragment>
                              <div className="avatar">
                                <Upload
                                  disabled={loading == true && true}
                                  listType="picture-card"
                                  showUploadList={false}
                                  beforeUpload={UploadAvatatr}
                                >
                                  {loading == false ? (
                                    <div className="edit">
                                      <img
                                        src={
                                          imageUrlAvatar
                                            ? imageUrlAvatar
                                            : item.avatar !== "" && item.avatar
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div
                                      className="flex"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        background: "black",
                                      }}
                                    >
                                      <Spin
                                        style={{
                                          color: "#fff",
                                          border: "none",
                                        }}
                                      />
                                    </div>
                                  )}
                                </Upload>
                              </div>
                              <Input
                                placeholder="Name artist"
                                style={{
                                  background: "black",
                                  color: "#fff",
                                  border: "none",
                                }}
                                onChange={(e: any) =>
                                  setNameArtist(e.target.value)
                                }
                                defaultValue={
                                  nameArtist == undefined
                                    ? item.name
                                    : nameArtist
                                }
                              />

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  margin: "10px 0",
                                }}
                              >
                                <div className="flex">
                                  <Popconfirm
                                    title="You may want to delete ?"
                                    onConfirm={() => confirm(item.id)}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <AiOutlineDelete
                                      style={{
                                        color: "#FF0000",
                                        cursor: "pointer",
                                        marginRight: 10,
                                      }}
                                    />
                                  </Popconfirm>
                                  <CheckOutlined
                                    style={{
                                      cursor: "pointer",
                                      color: "#00FF47",
                                    }}
                                    disabled={true}
                                    onClick={() => onClickSave(item)}
                                  />
                                </div>
                                <span style={{ fontSize: 10, color: "#fff" }}>
                                  Time Upload : {item.time_upload}
                                </span>
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="avatar">
                                <Link
                                  to={`/artist&&name=${item.name}&&id=${item.id}/setlist`}
                                >
                                  <img src={item.avatar} alt="" />
                                </Link>
                              </div>
                              <span className="name">{item.name}</span>

                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  margin: "10px 0",
                                }}
                              >
                                <FiEdit2
                                  style={{ color: "#fff", cursor: "pointer" }}
                                  onClick={() =>
                                    setIdEdit(
                                      idEdit == item.id ? undefined : item.id
                                    )
                                  }
                                />
                                <span style={{ fontSize: 10, color: "#fff" }}>
                                  Time Upload : {item.time_upload}
                                </span>
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                }
              )}
            </Row>
          </div>
        </Content>
      </Layout>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={700}
      >
        <AddArtist check={handleCancel} />
      </Modal>
    </div>
  );
};

export default ListArtist;
