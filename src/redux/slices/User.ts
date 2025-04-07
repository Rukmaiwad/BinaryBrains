import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the user type
interface User {
  firstName?: string
  lastName?: string
  avatar?: string | null
  role?: string
  userName?: string
  newComer?: boolean
}

// Define the initial state object
const initialState: User = {
  firstName: "",
  lastName: "",
  avatar: null,
  role: "",
  userName: "",
  newComer: true,
}

// Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload }
    },
    removeUser: () => {
      return {
        firstName: "",
        lastName: "",
        avatar: null,
        role: "",
        userName: "",
        newComer: true,
      }
    },
  },
})

// Export the actions
export const { setUser, removeUser } = userSlice.actions

// Export the reducer
export default userSlice.reducer