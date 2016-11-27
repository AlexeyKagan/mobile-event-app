import * as ContactsActions from 'actions/contacts.actions.js';

export default class Contacts {

  constructor($ngRedux, $scope) {
    console.log('Contacts');
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), ContactsActions)(this);
    $scope.$ctrl = this;
  }

  $onInit() {
    this.getAllPhoneContacts();
  }

  mapStateToThis(state) {
    console.log('mapStateToThis', state);
    // return {
    //   contacts: state.contacts
    // }
    return {
      contacts: state.contacts
    }
  }

  $onDestroy() {
    console.warn('$onDestroy');
    this.unsubscribe();
  }
}
