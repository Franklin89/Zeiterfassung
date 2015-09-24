(function() {
    'use strict';

    var zeiterfassungsapp = angular.module('zeiterfassung.ui', [
        'ui.router',
        'zeiterfassung.users',
        'zeiterfassung.authentication',
        'zeiterfassung.ui.app.constants',
        'zeiterfassung.project.integrationservices',
        'zeiterfassung.task.integrationservices',
        'zeiterfassung.userTasks.integrationservices',
        'angular-loading-bar',
        'zeiterfassung.saldoCalculator'])

        .controller('MainController', ['$scope', '$state', 'AuthenticationIntegrationService',
            function($scope, $state, authenticationIntegrationService) {

                $scope.loggedIn = function() {
                    return authenticationIntegrationService.isAuth();
                };

                $scope.isAdmin = function() {
                    return authenticationIntegrationService.isAdmin();
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

    zeiterfassungsapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider ,cfpLoadingBarProvider) {
            cfpLoadingBarProvider.spinnerTemplate = '<div class="col-lg-offset-6 dots-loader"></div>';
            $httpProvider.interceptors.push('AuthenticationInterceptorService');
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('timeRecording', {
                    url: '/timeRecording',
                    templateUrl: 'recording/timeRecording.html'
                })
                .state('projectManagement', {
                    url: '/projectManagement',
                    templateUrl: 'project/projectManagement.html'
                })
                .state('account', {
                    url: '/account',
                    templateUrl: 'users/accountManagement.html'
                })
                .state('users', {
                    url: '/userManagement',
                    templateUrl: 'users/userManagement.html'
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
