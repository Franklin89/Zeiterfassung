(function() {
    'use strict';

    var zeiterfassungsapp = angular.module('zeiterfassung.ui', [
        'ui.router',
        'zeiterfassung.ui.users',
        'zeiterfassung.authentication',
        'zeiterfassung.ui.app.constants',
        'zeiterfassung.project.integrationservices',
        'zeiterfassung.task.integrationservices'])

        .controller('MainController', ['$scope', '$state', 'AuthenticationIntegrationService',
            function($scope, $state, authenticationIntegrationService) {

                $scope.loggedIn = function() {
                    return authenticationIntegrationService.isAuth();
                };

                $scope.logout = function() {
                    swal({
                        title: 'Abmelden',
                        text: 'Willst Du dich wirklich ausloggen?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ja, abmelden',
                        cancelButtonText: 'Nein',
                        closeOnConfirm: true
                    }, function() {
                        authenticationIntegrationService.logout();
                        $state.go('login');
                    });
                };
            }]);

    zeiterfassungsapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.interceptors.push('AuthenticationInterceptorService');
            $urlRouterProvider.otherwise('/timeRecording');

            $stateProvider
                .state('timeRecording', {
                    url: '/timeRecording',
                    templateUrl: 'recording/timeRecording.html'
                })
                .state('projectManagement', {
                    url: '/projectManagement',
                    templateUrl: 'project/projectManagement.html'
                })
                .state('accountManagement', {
                    url: '/accountManagement',
                    templateUrl: 'users/accountManagement.html'
                })
                .state('statistics', {
                    url: '/statistics',
                    templateUrl: 'statistics/statistic.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'authentication/login.html'
                });
        }]);
})();
