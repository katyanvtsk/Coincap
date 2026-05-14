import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./assetsSlice";
import cryptoReducer from "./cryptoSlice";

import userWalletReducer from "./userWalletSlice";

const store = configureStore({
  reducer: {
    assets: assetsReducer,
    crypto: cryptoReducer,

    userWallet: userWalletReducer,
  },
});

export default store;
