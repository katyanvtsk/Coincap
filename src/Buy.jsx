import { InputNumber } from "antd";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectInfo } from "./redux/cryptoSlice";
const Buy = () => {
  return (
    <div>
      <h3>Введите колличество</h3>
      <InputNumber min={1} />
      <Button type="primary">Купить</Button>
    </div>
  );
};

export default Buy;
