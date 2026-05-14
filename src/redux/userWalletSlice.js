import { createSlice } from "@reduxjs/toolkit";

const savedCrypto = () => {
  return localStorage.getItem("userWallet")
    ? JSON.parse(localStorage.getItem("userWallet"))
    : [];
};

const initialState = {
  items: savedCrypto(),
};

const userWalletSlice = createSlice({
  name: "userWallet",
  initialState,
  selectors: {
    selectItems: (state) => state.items,
  },
  reducers: {
    addCrypto: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const saved = state.items.find((item) => item.id === id);
      if (saved) {
        saved.quantity += quantity;
      } else {
        state.items.push({
          id: id,
          name: name,
          price: parseFloat(price),
          quantity: quantity,
          allPrice: parseFloat(price) * quantity,
        });
      }
    },
    deleteCrypto: (state, action) => {
      const crypto = state.items.find((item) => item.id === action.payload);
      if (crypto && crypto.quantity > 1) {
        crypto.quantity -= 1;
        crypto.allPrice = crypto.price * crypto.quantity;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { selectItems } = userWalletSlice.selectors;
export const { addCrypto, deleteCrypto } = userWalletSlice.actions;
export default userWalletSlice.reducer;
