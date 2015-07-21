(function ($) {

  $(document).ready(function () {

    A.messages = [];

    //Set up objects

    $.each(A.data, function (index, element) {

      new A.thing(element.id, element.name, element.description, element.value, element.viewing_requirements, element.choices, element.location);

    });

    // Angular

    var app = angular.module("app", []);

    angular.element(document).ready(function () {
      angular.bootstrap(document, ['app']);
    });

    function main($scope) {

      $(document).on("actionWithMessage", function () {

        $scope.section = "messages";

      });

      $(document).on("actionNoMessage", function () {

        $scope.section = "mapView";

      });

      $scope.section = "mapView";

      $scope.messages = A.messages;
      $scope.things = A.things;

      $scope.$watch('things', function (newValue, oldValue) {

        $.each(newValue, function (index, thing) {

          if (thing.visibility) {

            //Clear active layers

            activeLayers.forEach(function (element, index) {

              map.removeLayer(element);

            });

            activeLayers = [];

            var location = thing.location.split(",");

            if (location.length == 2) {

              var latlng = L.latLng(parseFloat(location[0]), parseFloat(location[1]));

              var marker = L.marker(latlng);

              marker.on("click", function () {

                $scope.currentThing = thing;
                $scope.section = "choices";
                $scope.$apply();

              });

              activeLayers.push(marker);

            };

          };

        });

        activeLayers.forEach(function (element, index) {

          map.addLayer(element);

        });


      }, true);

      $scope.selectThing = function (thing) {

        $scope.currentThing = thing;
        $scope.section = "choices";

      };

    }

    app.controller("main", ["$scope", main])

    //Map!

    // Provide your access token
    L.mapbox.accessToken = 'pk.eyJ1IjoiZmlsaXBuZXN0IiwiYSI6ImQybTBtS3MifQ.7UzMMtWKkiQtA-UkMCVxdg';
    // Create a map in the div #map
    var map = L.mapbox.map('map', 'filipnest.ga46fcfi');

    //Console log of coordinates for debug/new markers.

    map.on('click', function (e) {
      console.log(e.latlng.lat + ", " + e.latlng.lng)
    });

    var activeLayers = [];

  });


})(jQuery)
