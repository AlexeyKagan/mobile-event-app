import { CONTACTS } from '../constants/contacts.js';
import { Contact, Contacts } from 'ionic-native';
import * as all from 'ionic-native';
import { contactsMeta } from './contacts.stub.js';

window.ionicNative = all;

export function receiveContacts(contacts) {

  return {
    type: CONTACTS.RECEIVE_CONTACTS,
    contacts
  }

}

export function getAllPhoneContacts() {

  return dispatch => {

    // Contacts.find(['name.formatted', 'phoneNumbers'], { multiple: true }).then(res => {
    //   console.warn('contacts', res);
    //   dispatch(receiveContacts(res))
    // });

    dispatch(receiveContacts(contactsMeta));

  }
}
