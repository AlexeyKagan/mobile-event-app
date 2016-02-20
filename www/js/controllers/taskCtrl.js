
angular.module('taskCtrl', [])
  .directive('ngMenuDir', [function(){
    return {
      //scope:{},
      //restrict : 'A',
      link : function(scope, element, attrs){
          element.on('click', function(e){
            element.toggleClass('active');
          })
      }
    }
  }]);
console.log('taskCtrl');
