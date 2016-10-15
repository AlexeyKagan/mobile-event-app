import TEMPLATE from './uiNavButton.tpl.html';
import UiNavButton from './uiNavButton.ctrl.js';

angular.module('app.ui.navButton', [])
  .component('uiNavButton', {
    bindings: {},
    template: TEMPLATE,
    controller: UiNavButton
  }); 
