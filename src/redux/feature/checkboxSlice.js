const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  ischecked: false,
};

const checkboxSlice = createSlice({
  name: "checkbox",
  initialState,
  reducers: {
    setCheckd: (state, action) => {
      state.ischecked = action.payload;
    },
  },
});

export const { setCheckd } = checkboxSlice.actions;
export default checkboxSlice.reducer;
