import * as ContactsActions from 'actions/contacts.actions.js';

export default class Contacts {

  constructor($ngRedux, $scope, $ionicPopup) {

    Object.assign(this, { $ionicPopup, $scope });
    $scope.$ctrl = this;

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), ContactsActions)(this);
  }

  $onInit() {
    this.getAllPhoneContacts();
  }

  mapStateToThis(state) {

    return {
      contacts: state.contacts
    }
  }

  editContact(contact) {

    this.$scope.email = contact.emails && contact.emails[0].value;
    this.$scope.displayName = contact.displayName;

    this.showPopup(contact);
  }

  showPopup({ id }) {
    const popup =  this.$ionicPopup.show({
        template: `
          <div> 
               Имя: <input ng-model="displayName" type="text"> <br/>
               Емаил: <input ng-model="email" type="text"> <br/>              
          </div>`,
        title: 'Изменение контакта',
        cssClass: '',
        subTitle: ' ',
        scope: this.$scope,
        buttons: [
          { text: 'Отмена', onTap: () => false },
          {
            text: '<b>Сохранить</b>',
            type: 'button-positive',
            onTap: function () { return this.scope }
          },
        ]
      });

    popup.then(res => {

        if (!res) { return; }

        this.updateContact(id, res.displayName, res.email);
      });
  }

  $onDestroy() {

    this.unsubscribe();
  }
}
