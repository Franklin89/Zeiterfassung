/**
 * Created by U110333 on 25.08.2015.
 */
'use strict';

var zeiterfassungsapp = angular.module('zeiterfassung.ui', [
    'ui.router',
    'zeiterfassung.ui.users',
    'zeiterfassung.authentication',
    'zeiterfassung.ui.app.constants',
    'zeiterfassung.project.integrationservices',
    'zeiterfassung.task.integrationservices'])

    .controller('MainController', ['$scope', '$state', 'AuthenticationIntegrationService',
        function ($scope, $state, authenticationIntegrationService) {

            $scope.loggedIn = authenticationIntegrationService.isAuth();

            $scope.logout = function () {
                authenticationIntegrationService.logout()
                    .then(function (result) {
                        alert('Logout succesful!');
                        $state.go('login');
                    }, function (reason) {
                        // error
                        alert('Logout failed! Try again..');
                    });
            }
        }
    ]);


zeiterfassungsapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('AuthenticationInterceptorService');
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('timeRecording', {
                url: "/timeRecording",
                templateUrl: "recording/timeRecording.html"
            })
            .state('projectManagement', {
                url: "/projectManagement",
                templateUrl: "project/projectManagement.html"
            })
            .state('accountManagement', {
                url: "/accountManagement",
                templateUrl: "usertask/accountManagement.html"
            })
            .state('statistics', {
                url: "/statistics",
                templateUrl: "statistics/statistic.html"
            })
            .state('login', {
                url: "/login",
                templateUrl: "authentication/login.html"
            });
    }]);
