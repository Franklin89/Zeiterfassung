/**
 * Created by U110333 on 25.08.2015.
 */
'use strict';

var zeiterfassungsapp = angular.module('zeiterfassung.ui', [
    'ui.router',
    'zeiterfassung.ui.users'])

    .controller('MainController', ['$log', function($log) {

        this.vm = this;
        this.test = 'Greeting from The Incredibels';
        this.goa = null;
    }]);


zeiterfassungsapp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/timeRecording");

    $stateProvider
        .state('timeRecording', {
            url: "/timeRecording",
            templateUrl: "recording/timeRecording.html"
            //controller: "MainController as vm"
        })
        .state('projectManagement', {
            url: "/projectManagement",
            templateUrl: "project/projectManagement.html"
            //controller: "UserCtrl as vm"
        })
        .state('taskManagement', {
            url: "/taskManagement",
            templateUrl: "task/taskManagement.html"
            //controller: "UserCtrl as vm"
        })
        .state('accountManagement', {
            url: "/accountManagement",
            templateUrl: "usertask/accountManagement.html"
            //controller: "UserCtrl as vm"
        })
        .state('statistics', {
            url: "/statistics",
            templateUrl: "statistics/statistic.html"
            //controller: "UserCtrl as vm"
        })
        .state('login', {
            url: "/login",
            templateUrl: "authentification/login.html"
            //controller: "UserCtrl as vm"
        });
});