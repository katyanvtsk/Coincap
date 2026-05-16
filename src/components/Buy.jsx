import { Button, message, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectInfo } from "../redux/cryptoSlice";
import { addCrypto } from "../redux/userWalletSlice";
import { useState } from "react";
import "../styles/buy.css";

const Buy = () => {
  const dispatch = useDispatch();
  const crypto = useSelector(selectInfo); // {инфа про выбранную валюту}
  const [count, setCount] = useState(1);

  const onChange = (value) => {
    setCount(value);
  };

  const handleBuy = () => {
    if (!count || count <= 0) {
      message.error("Введите корректное значение!");
      return;
    }
    dispatch(
      addCrypto({
        id: crypto.id,
        name: crypto.name,
        price: parseFloat(crypto.priceUsd),
        quantity: parseFloat(count),
      }),
    );
    message.success(`Куплено ${count} ${crypto.symbol}`);
    setCount(1);
  };
  return (
    <div className="buy">
      <h3 className="buy__title">Введите количество</h3>
      <InputNumber
        min={0.1}
        step={0.1}
        onChange={onChange}
        value={count}
        className="buy__input"
      />
      <Button type="primary" onClick={handleBuy} className="buy__button">
        Купить
      </Button>
    </div>
  );
};

export default Buy;
