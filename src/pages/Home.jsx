import DataTable from "../components/DataTable";
import { useDispatch } from "react-redux";
import { getAssets } from "../redux/assetsSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssets());
  }, [dispatch]);
  return (
    <h2>
      <DataTable />
    </h2>
  );
};
export default Home;
