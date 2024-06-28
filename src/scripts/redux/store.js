import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import communityReducer from './community/communitySlice';
import friendReducer from './user/friendSlice';
import { communityApi } from "./query/communityApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({ 
    reducer: {
        user: userReducer,
        community: communityReducer,
        friend: friendReducer,
        communityApi: communityApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(communityApi.middleware),
});

setupListeners(store.dispatch)