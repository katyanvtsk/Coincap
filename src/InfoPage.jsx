import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";
import {
  getAssetsInfo,
  selectChart,
  selectError,
  selectInfo,
  selectLoading,
  getHistory,
} from "./redux/cryptoSlice";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo } from "react";
import { formatNum, changeColor } from "./helpers/formatNumber";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./styles/info.css";

const InfoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const info = useSelector(selectInfo);
  const loading = useSelector(selectLoading);
  const chart = useSelector(selectChart);
  const navigate = useNavigate();
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getAssetsInfo(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getHistory({ id }));
    }
  }, [id, dispatch]);

  const chartData = useMemo(() => {
    if (!chart || chart.length === 0) {
      return [];
    }
    return chart.map((item) => ({
      date: moment(item.data).format("DD.MM.YYYY"),
      price: item.price,
    }));
  }, [chart]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!info) {
    return <div>No data available</div>;
  }

  if (error) {
    return <p>Ошибка загрузки данных: {error.message}</p>;
  }

  const dataSource = [
    {
      key: "1",
      info: "Цена",
      crypto: (
        <Tag style={{ fontSize: 18, color: "#dc07c0ff" }}>
          {formatNum(info.priceUsd)}
        </Tag>
      ),
    },
    {
      key: "2",
      info: "Доступное предложение для торговли",
      crypto: info.maxSupply ? `${formatNum(info.maxSupply)}` : "Unlimited",
    },

    {
      key: "3",
      info: "Общее кол-во выпущенных активов",
      crypto: formatNum(info.marketCapUsd),
    },
    {
      key: "4",
      info: "Объём торгов за последние 24 часа",
      crypto: formatNum(info.volumeUsd24Hr),
    },
    {
      key: "5",
      info: "Средняя цена по объёму за посление 24 часа",
      crypto: `${formatNum(info.vwap24Hr)}$`,
    },
    {
      key: "6",
      info: "Процентное изменение цены за последние 24 часа",
      crypto: (
        <span style={{ color: changeColor(info.changePercent24Hr) }}>
          {formatNum(info.changePercent24Hr)}%
        </span>
      ),
    },
    {
      key: "7",
      info: "Сайт",
      crypto: (
        <a href={info.explorer} target="_blank" rel="noopener noreferrer">
          View on Blockchain
        </a>
      ),
    },
  ];

  const columns = [
    {
      title: "Информация",
      dataIndex: "info",
      key: "info",
      width: "30%",
      render: (text) => <Tag>{text}</Tag>,
    },
    {
      title: "Данные о валюте",
      dataIndex: "crypto",
      key: "crypto",
      width: "70%",
    },
  ];

  return (
    <div>
      <div className="info">
        <h2 className="info__symbol">{info.symbol}</h2>
        <h2 className="info__name">{info.name}</h2>
      </div>

      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>

      <div style={{ padding: "30px" }}>
        {chartData.length > 0 && (
          <ResponsiveContainer
            width="100%"
            height={400}
            style={{ margin: "0 auto" }}
          >
            <LineChart data={chartData}>
              <XAxis dataKey="date" style={{ fontSize: "10px" }} />
              <YAxis
                style={{ fontSize: "10px" }}
                tickFormatter={(value) => `$${formatNum(value)}`}
              />
              <Tooltip
                formatter={(value) => [`$${formatNum(value)}`, "Цена"]}
                labelFormatter={(label) => `Дата: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#dc07c0ff"
                name="Цена"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div>
        <Button
          className="info__button"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default InfoPage;
