
const {
  createSlice,
  nanoid,
  current,
  createAsyncThunk,
} = require("@reduxjs/toolkit");
const loadUsersFromLocalStorage = () => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return [];
    }
  };
const initialState = {
  userApiData: [],
  userdata:loadUsersFromLocalStorage(),
//   userdata: JSON.parse(localStorage.getItem("users"))
//     ? JSON.parse(localStorage.getItem("users"))
//     : [],
};
export const fetchApiUsers = createAsyncThunk("fetchApiUsers", async () => {
  const result = await fetch("https://dummyjson.com/users");
  return result.json();
});
const Slice = createSlice({
  name: "adduserSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload,
      };
      state.userdata.push(data);
      let userData = JSON.stringify(current(state.userdata));
      // localStorage.setItem("users", userData);
    },
    removeUser: (state, action) => {
      console.log("action", action);
      const data = state.userdata.filter((item) => {
        return item.id !== action.payload;
      });
      state.userdata = data;
      //   let userData=JSON.stringify(current(state.userdata))
      // localStorage.setItem("users", JSON.stringify(data));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiUsers.fulfilled, (state, action) => {
      (state.isloadng = false), (state.userApiData = action.payload);
    });
  },
});
export const { addUser, removeUser } = Slice.actions;
export default Slice.reducer;
