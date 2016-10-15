
export default class UiNavButton {

  openNav(e) {
    // 'active'
    console.warn('UiNavButton', e);
    
    this.isShown = !this.isShown;
  }

}