import { Table, Tag, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAssets } from "../redux/assetsSlice";
import { useNavigate } from "react-router";
import { formatNum, changeColor } from "../helpers/formatNumber";
import { useState } from "react";
import FormModal from "./FormModal";

const DataTable = () => {
  const assets = useSelector(selectAssets);
  const navigate = useNavigate();
  const [isModal, setIsModalOpen] = useState(false);
  const [selectCrypto, setSelectCrypto] = useState(null);
  const columns = [
    {
      title: "№",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => <Tag color="pink">{symbol}</Tag>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "VWAP (24Hr)",
      dataIndex: "vwap24Hr",
      key: "vwap24Hr",
      render: (value) => `${parseFloat(value).toFixed(2)}$`,
    },
    {
      title: "Change (24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      render: (value) => {
        return (
          <span style={{ color: changeColor(value) }}>{formatNum(value)}%</span>
        );
      },
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: (value) => {
        return `$${formatNum(value)}`;
      },
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: (value) => `$${parseFloat(value).toFixed(2)}`,
    },
    {
      title: "",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            console.log("добавляем в портфель", record);

            setIsModalOpen(true);
            setSelectCrypto(record);
          }}
        />
      ),
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={assets}
        rowKey="id"
        size="middle"
        bordered
        pagination={{ pageSize: 10, showSizeChanger: false }}
        onRow={(item) => ({
          onClick: () => {
            navigate(`/info/${item.id}`);
          },
          style: { cursor: "pointer" },
        })}
      />
      {isModal && (
        <Modal
          title={`Покупка ${selectCrypto.symbol}`}
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModal}
          onOk={handleOk}
          onCancel={handleCancel}
          className="custom-modal"
        >
          <FormModal crypto={selectCrypto} onClose={handleCancel} />
        </Modal>
      )}
    </>
  );
};

export default DataTable;
