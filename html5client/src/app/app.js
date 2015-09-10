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

    .controller('MainController', ['$log', function($log) {

        this.vm = this;
        this.test = 'Greeting from The Incredibels';
        this.goa = null;
    }]);


zeiterfassungsapp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $urlRouterProvider.otherwise("/timeRecording");

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
