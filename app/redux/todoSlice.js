const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = {
  todos: [],
};
const Slice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      const data = {
        id: nanoid(),
        name: action.payload,
      };
      state.todos.push(data);
    },
    removeTodo: (state, action) => {
        
        const data = state.todos.filter((item) => {
          return item.id !== action.payload;
        });
        state.todos = data;
        //   let todos=JSON.stringify(current(state.todos))
        // localStorage.setItem("users", JSON.stringify(data));
      },
  },
});

export const { addTodos,removeTodo } = Slice.actions;
export default Slice.reducer;
