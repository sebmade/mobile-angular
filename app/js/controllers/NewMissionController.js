
smurAngular.controller('NewMissionController', 
	function NewMissionController($scope, $http, $location, Mission){
		$scope.alerts = [];

		$http.get("/resources/vehicles.json").success(function(data){
			$scope.vehicles = data;
		});

		$http.get("/resources/persons.json").success(function(data){
			$scope.responsibles = data;
		});
		
		$scope.add = function(){
			if($scope.password == "1234") {
				var mission = $scope.mission;
				var currentTime = new Date();
				mission.id = currentTime.getTime();
				mission.created_at = currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear()+" "+
					currentTime.getHours()+"h"+currentTime.getMinutes();
				Mission.store.put(mission);
				$location.url("/");
			} else {
				$scope.alerts.push({
					"type": "error",
					"title": "Mauvais mot de passe",
					"content": "Essayez 1234"
				});
			}
		};

		$scope.back = function() {
			$location.url("/");
		};
	});