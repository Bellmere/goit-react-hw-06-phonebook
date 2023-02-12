import { configureStore, createSlice } from '@reduxjs/toolkit'

const contactsSlice = createSlice({
    name: 'contacts2',
    initialState: 
        [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
        ],
    reducers: {
        add(state, action) {
            if (state.findIndex(item => item.name?.toLowerCase() === action.payload.name?.toLowerCase()) !== -1) {
                return alert(`${action.payload.name} is already in contacts.`);
              }
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter(contact => contact.id !== action.payload);
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

export const store = configureStore({
  reducer: {
    contacts2: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});