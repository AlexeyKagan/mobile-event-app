
export default class UiNavButton {
  constructor($element, $document, $scope) {

    Object.assign(this, { $element, $document, $scope })
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

}