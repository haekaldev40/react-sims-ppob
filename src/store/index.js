import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { balanceReducer } from "./slices/balanceSlice";
import { informationServiceReducer } from "./slices/informationSlice";
import { informationBannerReducer } from "./slices/bannerSlice";
import { transactionReducer } from "./slices/transactionSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
        service: informationServiceReducer,
        banner: informationBannerReducer,
        transaction: transactionReducer
    }
})

