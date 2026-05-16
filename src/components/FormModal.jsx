import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";

import { addCrypto } from "../redux/userWalletSlice";

const FormModal = ({ crypto, onClose }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      addCrypto({
        id: crypto.id,
        name: crypto.name,
        price: parseFloat(crypto.priceUsd),
        quantity: parseFloat(values.count),
      }),
    );

    message.success(`Куплено ${values.count} ${crypto.symbol}`);
    onClose();
  };

  const onFinishFailed = (errorInfo) => {
    message.error(`Ошибка покупки валюты: ${errorInfo}`);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Введите колличество"
        name="count"
        rules={[{ required: true, message: "Введите колличество" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Купить
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormModal;
