import { CONTACTS } from '../constants/contacts.js';
import { Contact, Contacts, ContactField } from 'ionic-native';
import * as ionicNative from 'ionic-native';
import { contactsMeta } from './contacts.stub.js';

window.ionicNative = ionicNative;

export function receiveContacts(contacts) {
  return {
    type: CONTACTS.RECEIVE_CONTACTS,
    contacts
  }
}

export function receiveUpdatedContacts(contact) {
  return {
    type: CONTACTS.RECEIVE_UPDATED_CONTACTS,
    contact
  }
}

export function getAllPhoneContacts() {
  return dispatch => {
    Contacts.find(['name.formatted', 'phoneNumbers'], { multiple: true }).then(res => {
      dispatch(receiveContacts(res))
    });
  }
}

export function updateContact(id, displayName, email) {
  return dispatch => {
    Contacts.find(['name.formatted', 'phoneNumbers']).then(res => {
      const contact = res.find(d => d.id === id);

      if (!contact) { return; }

      contact.displayName = displayName;

      if (contact.emails) {
        contact.emails[0].value = email
      } else {
        contact.emails = [ new ContactField('email', email, false) ]
      }

      contact.save(s => dispatch(receiveUpdatedContacts(s)), err => console.log('err', err));
    })
  }
}
