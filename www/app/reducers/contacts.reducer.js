import { CONTACTS } from '../constants/contacts.js';

const initState = [];

export function ContactsReducer(state = initState, action) {
  switch (action.type) {
    case CONTACTS.RECEIVE_CONTACTS:
      return [...action.contacts];
    default:
      return state
  }
}
