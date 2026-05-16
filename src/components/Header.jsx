import { useSelector } from "react-redux";
import { selectAssets } from "../redux/assetsSlice";
import Wallet from "./Wallet";
import "../styles/header.css";
import { useNavigate } from "react-router";

const Header = () => {
  const assets = useSelector(selectAssets);
  const navigate = useNavigate();

  const headerData = assets.slice(0, 3).map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: `${parseFloat(item.priceUsd).toFixed(2)}$`,
    };
  });

  return (
    <div className="header">
      <div>
        <h3 className="header__title">Популярные криптовалюты</h3>
        <div className="header__continer">
          {headerData.map((item) => (
            <div
              key={item.id}
              className="header__card"
              onClick={() => navigate(`/info/${item.id}`)}
            >
              <h4 className="header__cardTitle" style={{ margin: 0 }}>
                {item.name}
              </h4>
              <p className="header__cardPrice">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <Wallet />
    </div>
  );
};
export default Header;
