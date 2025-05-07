import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { jwtDecode } from 'jwt-decode';

// Define the user type
interface User {
  firstName?: string
  lastName?: string
  avatar?: string | null
  userName?: string
  newComer?: boolean,
  token: string, 
  refreshToken: string,
  isLoggedIn: boolean
}

// Define the initial state object
const initialState: User = {
  firstName: "",
  lastName: "",
  avatar: null,
  userName: "",
  newComer: true,
  token: "",
  refreshToken: "",
  isLoggedIn: false
}

// Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log('calling the function ahaja', action.payload)
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = action.payload.userName;
      state.avatar = action.payload.avatar;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.newComer = action.payload.newComer;
    },
    removeUser: () => {
      return {
        firstName: "",
        lastName: "",
        avatar: null,
        userName: "",
        newComer: true,
        token: '',
        refreshToken: '',
        isLoggedIn: false
      }
    },
  },
})

// Export the actions
export const { setUser, removeUser } = userSlice.actions

export const getUserAvatar = (state: RootState) => state.user.avatar;
export const getUserName = (state: RootState) => state.user.userName;
export const getFirstName = (state: RootState) => state.user.firstName;
export const getLastName = (state: RootState) => state.user.lastName;
export const getToken = (state: RootState) => state.user.token;
export const getRole = (state: RootState) => {
    if(state.user.token) {
        const userData: any = jwtDecode(state.user.token);
        return userData.role;
    }
    else return ''
}
export const getIsLoggedIn = (state: RootState) => state.user.isLoggedIn;

// Export the reducer
export default userSlice.reducer