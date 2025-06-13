import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
  contacts: [],
  searchTerm: '',
  editingContact: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts: (state, action) => {
      const newContacts = action.payload.map(contact => ({
        ...contact,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }));
      state.contacts.push(...newContacts);
    },
    updateContact: (state, action) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
      state.editingContact = null;
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setEditingContact: (state, action) => {
      state.editingContact = action.payload;
    },
  },
});

export const {
  addContacts,
  updateContact,
  deleteContact,
  setSearchTerm,
  setEditingContact,
} = contactsSlice.actions;

export default contactsSlice.reducer;