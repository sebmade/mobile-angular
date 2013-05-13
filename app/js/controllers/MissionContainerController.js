
smurAngular.controller("MissionContainerController", 
	function MissionContainerController($scope, $rootScope, $routeParams, $http, $location, Mission, $window){
		$scope.menu = false;

		var date1 = Date.now();
		Mission.get(parseInt($routeParams.missionId)).then(function(data){
			$scope.mission = data;
			$scope.loadTime = Date.now()-date1;
		});

		$http.get("/resources/mission-menu.json").success(function(data){
			$scope.menuItems = data;
			$scope.includedUrl = $scope.getPathFromParams();
		});

		$scope.includeUrlIs = function(expectedUrl) {
			return $scope.includedUrl == expectedUrl;
		};

		$scope.$on('$routeUpdate', function() { 
			$scope.includedUrl = $scope.getPathFromParams();
			$window.scrollTo(0,0);
		});

		$scope.navigate = function(id) {
			if(id == "back")
				$location.url("/");
			else {
				$location.url("/mission/"+$scope.mission.id).search({page: id});
				$scope.menu = false;
			}
		};

		$scope.getPathFromParams = function() {
			var currentPage = $location.search().page;
			for (var i = 0; i < $scope.menuItems.length; i++) {
				if($scope.menuItems[i].id == currentPage) 
					return $scope.menuItems[i].templateUrl;
			};
			return "";
		};

		$scope.toggleLeftMenu = function() {
			$scope.menu = !$scope.menu;
		};

		$scope.showMenu = function() {
			$scope.includedUrl = "";
			$location.path("/mission/"+$scope.mission.id);
		};

		$rootScope.$watch('scrollX', function(newVal, oldVal){
			if($scope.menu)
				$scope.menu = false;
		});
	});