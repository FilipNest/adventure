(function ($) {

  $(document).ready(function () {

    A.messages = [];

    //Set up objects

    $.each(A.data.rawThings, function (index, element) {

      new A.thing(element.id, element.name, element.description, element.value, element.viewing_requirements, element.choices, element.location, element.icon);

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

      $scope.admin = A.data.owner;

      $scope.messages = A.messages;
      $scope.things = A.things;

      $scope.activeLayers = [];

      $scope.$watch('things', function (newValue, oldValue) {

        //Clear active layers ready for replacing

        $scope.activeLayers.forEach(function (element, index) {

          map.removeLayer(element);

        });

        //Clear active layers array

        $scope.activeLayers = [];

        $.each(newValue, function (index, thing) {

          if (thing.visibility) {

            if (thing.location) {

              var location = thing.location.split(",");

            }

            if (location && location.length == 2) {

              var latlng = L.latLng(parseFloat(location[0]), parseFloat(location[1]));

              var marker = L.marker(latlng);

              if (thing.icon) {

                var myIcon = L.icon({
                  iconUrl: thing.icon.path,
                  iconSize: [thing.icon.width, thing.icon.height],
                  iconAnchor: [thing.icon.width/2, thing.icon.height/2],
                });

                marker.setIcon(myIcon);


              }

              marker.on("click", function () {

                $scope.currentThing = thing;
                $scope.section = "choices";
                $scope.$apply();

              });

              $scope.activeLayers.push(marker);

            };

          };

        });

        //Replace;

        $scope.activeLayers.forEach(function (element, index) {

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

    //Bring up the thing edit form

    $(".edit-thing").on("click", function () {

      var nid = $(this).attr("data-nid");

      $("#thing-form").load("/edit_thing/" + nid);

    });

    $(".create-thing").on("click", function () {

      $("#thing-form").load("/create_thing");

    });

  });


})(jQuery)
