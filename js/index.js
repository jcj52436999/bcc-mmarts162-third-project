// var url = "justauser/foods"
// var url = "https://mmart162-api.herokuapp.com/jcj52436999/artists/";
var url = "";

// var urlEaten = "https://mmart162-api.herokuapp.com/jcj52436999/eaten/";
// var urlFoods = "https://mmart162-api.herokuapp.com/jcj52436999/foods/";
// var urlMenus = "https://mmart162-api.herokuapp.com/jcj52436999/menus/";
var urlEaten = "http://bcc-mmarts162-third-project.backhoesoft.com/mmart162-api/jcj52436999/eaten/";
var urlFoods = "http://bcc-mmarts162-third-project.backhoesoft.com/mmart162-api/jcj52436999/foods/";
var urlMenus = "http://bcc-mmarts162-third-project.backhoesoft.com/mmart162-api/jcj52436999/menus/";

url = urlFoods;
// var url = "https://mmart162-api.herokuapp.com/vanwars/artists/";
var app = angular.module("createApp", []);
app.controller("ctrlr", function($scope, $http) {
	$scope.artists = [];
	$scope.currentArtist = null;
	$scope.menus = [];
	$scope.currentMenu = null;
	$scope.eatens = [];
	$scope.currentEaten = null;



	$scope.endpointChecksOut = function() {
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

	$scope.saveFood = function() {
		if ($scope.currentArtist._id) {
			$scope.update();
		} else {
			$scope.uploadData();
		}
	};

	$scope.saveMenu = function() {
		if ($scope.currentMenu._id) {
			$scope.updateMenu();
		} else {
			$scope.uploadMenuData();
		}
	};

	$scope.saveEaten = function() {
		if ($scope.currentEaten._id) {
			$scope.updateEaten();
		} else {
			$scope.uploadEatenData();
		}
	};



	$scope.clear = function() {
		document.getElementById("form").reset();
		$scope.currentArtist = null;
	};

	$scope.edit = function(artist) {
		if (artist.dob) {
			artist.dob = new Date(artist.dob);
		}
		$scope.currentArtist = artist;
	};

	$scope.uploadData = function() {
		// HTTP POST
		var image = document.getElementById("image").files[0];
		var fd = new FormData();
		fd.append("image", image);
		fd.append("name", $scope.currentArtist.name);
		fd.append("bio", $scope.currentArtist.bio);
		fd.append("dob", $scope.currentArtist.dob);
		$http.post(url, fd, {
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(data) {
			console.log(data);
			if (data.dob) {
				data.dob = new Date(data.dob);
			}
			$scope.currentArtist = null;
			$scope.getData();
			alert("created");
		}).error(function(data) {
			alert("error");
		});
	};

	$scope.uploadMenuData = function() {
		// HTTP POST
		var image = document.getElementById("imageOfPlate").files[0];
		var fd = new FormData();
		fd.append("image", image);
		fd.append("name", $scope.currentMenu.name);
		fd.append("fooditem", $scope.currentMenu.foodItem);
		fd.append("dos", $scope.currentMenu.dos);
		$http.post(urlMenus, fd, {
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(data) {
			console.log(data);
			if (data.dos) {
				data.dos = new Date(data.dos);
			}
			$scope.currentMenu = null;
			$scope.getMenuData();
			alert("created");
		}).error(function(data) {
			alert("error");
		});
	};

	$scope.uploadEatenData = function() {
		// HTTP POST
		var image = document.getElementById("imageOfEaten").files[0];
		var fd = new FormData();
		fd.append("image", image);
		fd.append("name", $scope.currentEaten.name);
		fd.append("fooditem", $scope.currentEaten.foodItem);
		fd.append("dos", $scope.currentEaten.dos);
		$http.post(urlEaten, fd, {
			headers: {
				'Content-Type': undefined
			},
			transformRequest: angular.identity
		}).success(function(data) {
			console.log(data);
			if (data.dos) {
				data.dos = new Date(data.dos);
			}
			$scope.currentEaten = null;
			$scope.getEatenData();
			alert("created");
		}).error(function(data) {
			alert("error");
		});
	};



	$scope.update = function() {
		// HTTP PUT
		var updateURL = url + $scope.currentArtist._id + "/";
		$http.put(updateURL, $scope.currentArtist)
			.success(function(data) {
				alert("saved");
				$scope.getData();
			})
			.error(function(data) {
				alert("error");
			});
	};

	$scope.updateMenu = function() {
		// HTTP PUT
		var updateURL = urlMenus + $scope.currentMenu._id + "/";
		$http.put(updateURL, $scope.currentMenu)
			.success(function(data) {
				alert("saved");
				$scope.getMenuData();
			})
			.error(function(data) {
				alert("error");
			});
	};

	$scope.updateEaten = function() {
		// HTTP PUT
		var updateURL = urlEaten + $scope.currentEaten._id + "/";
		$http.put(updateURL, $scope.currentEaten)
			.success(function(data) {
				alert("saved");
				$scope.getEatenData();
			})
			.error(function(data) {
				alert("error");
			});
	};



	$scope.delete = function(id) {
		// HTTP DELETE
		var deleteURL = url + id + "/"
		$http.delete(deleteURL)
			.success(function(data) {
				$scope.getData();
			})
			.error(function(data) {
				alert("error");
			});
	};

	$scope.getData = function() {
		// HTTP GET
		if (!$scope.endpointChecksOut()) {
			return;
		}
		$http.get(url)
			.success(function(data) {
				$scope.artists = data;
			})
			.error(function(data) {
				alert("error");
			});
	};

	$scope.getMenuData = function() {
		// HTTP GET
		if (!$scope.endpointChecksOut()) {
			return;
		}
		$http.get(urlMenus)
			.success(function(data) {
				$scope.menus = data;
			})
			.error(function(data) {
				alert("error");
			});
	};

	$scope.getEatenData = function() {
		// HTTP GET
		if (!$scope.endpointChecksOut()) {
			return;
		}
		$http.get(urlEaten)
			.success(function(data) {
				$scope.eatens = data;
			})
			.error(function(data) {
				alert("error");
			});
	};



	$scope.getData();
	$scope.getMenuData();
	$scope.getEatenData();

});