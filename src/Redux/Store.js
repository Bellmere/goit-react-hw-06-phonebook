import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['items'],
  };

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: 
        {
            items: [
                { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
                { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
                { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
                { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
            ]
        },
    reducers: {
        add(state, action) {
            if (state.items.findIndex(item => item.name?.toLowerCase() === action.payload.name?.toLowerCase()) !== -1) {
                alert(`${action.payload.name} is already in contacts.`);
                return state;
              }

              state.items.push(action.payload);
        },
        remove({items}, action) {
            return {items: items.filter(item => item.id !== action.payload)}
        }
    },
});

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        change(state, action) {
            return state = action.payload;
        },
    },
})

export const { change } = filterSlice.actions;

export const { add, remove } = contactsSlice.actions;

const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: filterSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    })
}
});

export const persistor = persistStore(store);