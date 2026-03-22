import { configureStore } from '@reduxjs/toolkit';
import courrierReducer from './courrierSlice';

export const store = configureStore({
    reducer: {
        courriers: courrierReducer,
    }
});