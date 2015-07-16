(function ($) {

  $(document).ready(function () {
    
    A.messages = [];
        
    //Set up objects

    $.each(A.data, function (index, element) {

      new A.thing(element.id, element.name, element.description, element.value, element.viewing_requirements, element.choices);

    });

    // Angular

    var app = angular.module("app", []);

    angular.element(document).ready(function () {
      angular.bootstrap(document, ['app']);
    });

    function thingList($scope) {

      $scope.messages = A.messages;
      $scope.things = A.things;
      
    }

    app.controller("thingList", ["$scope", "$rootScope", thingList])

  });

})(jQuery)
