var app = angular.module('app');

// Creating the directive
app.directive('vrDirective', function(){
  return {
    restrict: 'EA', //Aceept element and attribute to render
    templateUrl: './directives/virtual-repeat/virtual-repeat.directive.html',
    controller: function($scope, $mdPanel) {
      var that = this;
      // Selecting the item
      this.selectedItem;

      // Creating drop down menu
      this._mdPanel = $mdPanel;
      this.showMenu = function(ev) {
        var position = this
          ._mdPanel.newPanelPosition()
          .relativeTo('.vm-menu-open-button')
          .addPanelPosition(
            this._mdPanel.xPosition.ALIGN_START, 
            this._mdPanel.yPosition.BELOW
          );
          
          var config = {
            attachTo: angular.element(document.body),
            controller: PanelController,
            controllerAs: 'vm',
            templateUrl: './directives/virtual-repeat/virtual-repeat-content.html',
            panelClass: 'vm-menu',
            position: position,
            openFrom: ev,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: false,
            zIndex: 2
          };

          function PanelController(){
            this.items = [];
            for (var i = 0; i < 500; i++) {
              this.items.push(i + ". OXO Influencer List");
            }
            // Selecting the item
            this.selectItem = function(data){
              that.selectedItem = data;
              $scope.ref.close();
            }
          }
          
          this._mdPanel.open(config).then(function(ref) {
            $scope.ref = ref;
          });
        };
    },
    controllerAs: "vm",
    link: function(scope, element, attrs) {},
  }
});

