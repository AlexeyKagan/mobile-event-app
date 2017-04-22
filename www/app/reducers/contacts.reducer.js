import { CONTACTS } from '../constants/contacts.js';

const initState = [];

export function ContactsReducer(state = initState, action) {
  switch (action.type) {
    case CONTACTS.RECEIVE_CONTACTS:
      return [...action.contacts];
    case CONTACTS.RECEIVE_UPDATED_CONTACTS:
      return state.map(s => s.id === action.contact.id ? action.contact: s);
    default:
      return state
  }
}
