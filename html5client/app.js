/**
 * Created by U110333 on 25.08.2015.
 */
'use strict';

angular.module('zeiterfassung.ui', [])

    .controller('MainController', ['$log', function($log) {

        this.vm = this;
        this.test = 'Greeting from The Incredibels';
        this.goa = null;
    }]);
