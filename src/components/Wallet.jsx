import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, Button } from "antd";
import { CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import { deleteCrypto, selectItems } from "../redux/userWalletSlice";
import { selectAssets } from "../redux/assetsSlice";
import { useState } from "react";
import { changeColor } from "../helpers/formatNumber";
import { calculateWallet } from "../helpers/calculatePrice";
import "../styles/header.css";

const Wallet = () => {
  const dispatch = useDispatch();
  const wallet = useSelector(selectItems);
  const assets = useSelector(selectAssets);
  const [isModalOpen, setIsModal] = useState(false);

  const { firstPrice, currentPrice, change, percent } = calculateWallet(
    wallet,
    assets,
  );

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => quantity,
    },
    {
      title: "Цена покупки",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Итоговая цена",
      dataIndex: "allPrice",
      key: "allPrice",
      render: (allPrice) => `$${allPrice.toFixed(2)}`,
    },
    {
      title: "",
      key: "action",
      render: (_, item) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => {
            dispatch(deleteCrypto(item.id));
          }}
        />
      ),
    },
  ];

  return (
    <>
      <div onClick={() => setIsModal(true)} className="wallet">
        <CreditCardOutlined style={{ fontSize: "34px" }} />
        <Tag className="wallet__value">
          {`$${currentPrice.toFixed(2)}`}
          <div className="change">
            {change !== 0 && (
              <span style={{ color: changeColor(change) }}>
                {change > 0 ? "+" : ""}
                {change.toFixed(2)} USD ({percent > 0 ? "+" : ""}
                {percent.toFixed(2)}%)
              </span>
            )}
          </div>
        </Tag>
      </div>

      <Modal
        title="Мой портфель"
        open={isModalOpen}
        onCancel={() => setIsModal(false)}
        footer={null}
        width={700}
      >
        <Table
          columns={columns}
          dataSource={wallet}
          rowKey="id"
          pagination={false}
        />
        <h3>ИТОГО: {`$${currentPrice.toFixed(2)}`}</h3>
      </Modal>
    </>
  );
};
export default Wallet;
