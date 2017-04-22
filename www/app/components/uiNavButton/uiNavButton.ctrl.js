import { getLocalDate } from 'core/date.utils.js';

export default class UiNavButton {
  constructor($element, $document, $scope, $state) {

    Object.assign(this, { $element, $document, $scope, $state })
  }

  $onInit() {

    this.$element.bind('click', event => {

      event.stopPropagation();
    });

    this.$document.bind('click', () => {

      this.isShown = false;
      this.$scope.$apply();
    });
  }

  openNav(e) {

    this.isShown = !this.isShown;
  }

  goTo() {
    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate() })
  }

}
