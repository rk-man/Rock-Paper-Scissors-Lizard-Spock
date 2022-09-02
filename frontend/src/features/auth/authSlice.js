import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createNewUserFromBackend, loginFromBackend } from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    token: token ? token : null,
};

export const createNewUser = createAsyncThunk(
    "auth/new-user",
    async (userData, thunkAPI) => {
        try {
            return await createNewUserFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await loginFromBackend(userData);
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },

    extraReducers: (builders) => {
        builders
            .addCase(createNewUser.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(createNewUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })

            .addCase(createNewUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //login

            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            //logout

            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
                state.token = null;
            })

            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export default authSlice.reducer;

export const { reset } = authSlice.actions;
