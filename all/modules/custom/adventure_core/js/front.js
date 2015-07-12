var app = angular.module("adventure", []);

//Main controller
app.controller("things", ["$scope", things])


function things($scope) {

  $scope.list = A.things;

  $(document).on("thingChanged", function (thing) {

    $scope.list = A.things;
    $scope.$apply();

  });

};


//Treat objects like arrays

app.filter("toArray", function () {
  return function (obj) {
    var result = [];
    angular.forEach(obj, function (val, key) {
      result.push(val);
    });
    return result;
  };
})
