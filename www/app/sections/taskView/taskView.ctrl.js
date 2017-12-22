import { getLocalDate } from 'core/date.utils.js';
import { setVisabilityFilter } from 'actions/visabilityFilter.actions.js';

export default class TaskView {

  constructor($ionicSideMenuDelegate, $state, $ngRedux, $scope, $rootScope) {

    Object.assign(this, { $ionicSideMenuDelegate, $state  });

    this.$scope = $scope;
    $scope.$ctrl = this;

    this.unsubscribe = $ngRedux.connect(null, { setVisabilityFilter })(this);

    $rootScope.$on('$ionicSideMenuClose', () => {
      this.isShownLeftMenu = false;
    })
  }

  $onDestroy() {

    this.unsubscribe();
  }

  openFilterInput() {
    if (this.showFilter) {
      this.setVisabilityFilter('');
      this.filter = '';
    }
    this.showFilter = !this.showFilter;
  }

  exit() {

    ionic.Platform.exitApp();
  }

  toggleLeft() {
    this.isShownLeftMenu = !this.isShownLeftMenu;
    this.$ionicSideMenuDelegate.toggleLeft();
  }

  goToMain() {


    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate() })
  }

  onFilterChanged() {

    this.setVisabilityFilter(this.filter)
  }

}

