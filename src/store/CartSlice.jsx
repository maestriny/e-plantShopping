import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: loadState(),
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveState(state);
    },

    removeItem: (state, action) => {
      const nameToRemove = action.payload;
      state.items = state.items.filter((item) => item.name !== nameToRemove);
      saveState(state);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);

      if (item && quantity >= 1) {
        item.quantity = quantity;
      } else if (item && quantity === 0) {
        state.items = state.items.filter((i) => i.name !== name);
      }
      saveState(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
