import { Contact } from 'ionic-native';

let contact = new Contact();

function getAllContacts() {

  contact.find().then(function(allContacts) {
    $scope.contacts = allContacts;
  });

}
