var url = "https://mmart162-api.herokuapp.com/jcj52436999/artists/";
//var url = "https://mmart162-api.herokuapp.com/vanwars/artists/";
var app = angular.module("createApp", []);
app.controller("ctrlr", function($scope, $http) {
     $scope.artists = [];
     $scope.currentArtist = null;
     
     $scope.endpointChecksOut = function () {
          if (url.indexOf("{{username}}") != -1) {
               alert("replace {{username}} with your username");
               return false;
          }
          if (url.indexOf("{{endpointname}}") != -1) {
               alert("replace {{endpointname}} with your endpoint name");
               return false;
          }
          return true;
     };
     
     $scope.save = function () {
          if ($scope.currentArtist._id) {
               $scope.update();
          } else {
               $scope.uploadData();
          }
     };
     
     $scope.clear = function () {
          document.getElementById("form").reset();
          $scope.currentArtist = null;
     };
     
     $scope.edit = function (artist) {
          if (artist.dob) {
               artist.dob = new Date(artist.dob);
          }
          $scope.currentArtist = artist;
     };
     
     $scope.uploadData = function () {
          // HTTP POST
          var image = document.getElementById("image").files[0];
          var fd = new FormData();
          fd.append("image", image);
          fd.append("name", $scope.currentArtist.name);
          fd.append("bio", $scope.currentArtist.bio);
          fd.append("dob", $scope.currentArtist.dob);
          $http.post(url, fd, {
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
               }).success(function (data) {
                    console.log(data);
                    if (data.dob) {
                         data.dob = new Date(data.dob);
                    }
                    $scope.currentArtist = null;
                    $scope.getData();
                    alert("created");
               }).error(function (data) {
                    alert("error");
               });
     };
     
     $scope.update = function () {
          // HTTP PUT
          var updateURL = url + $scope.currentArtist._id + "/";
          $http.put(updateURL, $scope.currentArtist)
               .success(function (data) {
                    alert("saved");
                    $scope.getData();
               })
               .error(function (data) {
                    alert("error");
               });
     };
     
     $scope.delete = function (id) {
          // HTTP DELETE
          var deleteURL = url + id + "/"
          $http.delete(deleteURL)
               .success(function (data) {
                    $scope.getData();
               })
               .error(function (data) {
                    alert("error");
               });
     };
       
     $scope.getData = function () {
          // HTTP GET
          if (!$scope.endpointChecksOut()) {
               return;   
          }
          $http.get(url)
               .success(function (data) {
                    $scope.artists = data;
               })
               .error(function (data) {
                    alert("error");
               });
     };
     
     $scope.getData();

});