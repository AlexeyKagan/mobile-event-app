import Contacts from './contacts.ctrl.js';
import TEMPLATE from './contacts.tpl.html';
import './contacts.scss';

angular.module('task.contacts', [])
  .component('contacts', {
    bindings: {},
    template: TEMPLATE,
    controller: Contacts
  });



