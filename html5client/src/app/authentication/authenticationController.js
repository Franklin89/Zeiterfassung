angular.module('zeiterfassung.authentication', ['zeiterfassung.authentication.integrationservices'])
    .controller('AuthenticationController', ['$scope', function ($scope) {
        $scope.login = function () {
            alert("LogIn!");
        }
    }]);
