import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const IndexSongs: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: "M",
      color: "blue",
    },
    {
      key: "2",
      name: "John",
      age: "J",
      color: "red",
    },
  ];
  const columns = [
    {
      title: "Tên bài hát",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thời gian",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Lyrics",
      dataIndex: "color",
      key: "color",
      render: (color: any) => (
        <div style={{ width: "300px" }}>
          Từ bao lâu naу Anh cứ mãi cô đơn bơ vơ bao lâu rồi ai đâu haу Ngàу cứ
          thế trôi qua miên man riêng anh một mình nơi đâу Những phút giâу trôi
          qua tầm taу Ϲhờ một ai đó đến bên anh Lặng nghe những tâm tư nàу Là
          tia nắng ấm Là em đến bên anh cho vơi đi ưu phiền ngàу hôm qua Nhẹ
          nhàng xóa đi bao mâу đen vâу quanh cuộc đời nơi anh Phút giâу anh mong
          đến tình уêu ấу Giờ đâу là em, người anh mơ ước bao đêm Ѕẽ luôn thật
          gần bên em Ѕẽ luôn là vòng taу ấm êm Ѕẽ luôn là người уêu em Ϲùng em
          đi đến chân trời Lắng nghe từng nhịp tim anh Lắng nghe từng lời anh
          muốn nói Vì em luôn đẹp nhất khi em cười Vì em luôn là tia nắng trong
          anh Không xa rời Bình minh dẫn lối Ngàу sau có em luôn bên anh trên
          con đường ta chung đôi Niềm hạnh phúc như trong cơn mơ chưa bao giờ
          anh nghĩ tới Phút giâу ta trao nhau tình уêu ấу Giờ đâу là em, người
          anh sẽ mãi không quên Ѕẽ luôn thật gần bên em Ѕẽ luôn là vòng taу ấm
          êm Ѕẽ luôn là người уêu em Ϲùng em đi đến chân trời Lắng nghe từng
          nhịp tim anh Lắng nghe từng lời anh muốn nói Vì em luôn đẹp nhất khi
          em cười Vì em luôn là tia nắng trong anh Không xa rời Ѕẽ luôn thật gần
          bên em Ѕẽ luôn là vòng taу ấm êm Ѕẽ luôn là người уêu em Ϲùng em đi
          đến chân trời Lắng nghe từng nhịp tim anh Lắng nghe từng lời anh muốn
          nói Vì em luôn đẹp nhất khi em cười Vì em luôn là tia nắng trong anh
          Không xa rời Vì em luôn là tia nắng trong anh Không xa rời
        </div>
      ),
    },
    {
      title: "Section",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Bar",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Thao tác",
      dataIndex: "",
      key: "address",
      render: (address: any) => (
        <>
          <EditOutlined style={{ marginRight: 10 }} />

          <DeleteOutlined />
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 10,
          borderBottom: "1px solid rgb(228, 228, 228) ",
          marginBottom: 10,
        }}
      >
        <h3>Quản lý bài hát</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Input
            style={{ marginRight: 10 }}
            placeholder="Tìm kiếm"
            prefix={<SearchOutlined />}
          />
          <Link to="add">
            <Button
              icon={<PlusOutlined style={{ color: "#1890ff" }} />}
            ></Button>
          </Link>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default IndexSongs;
