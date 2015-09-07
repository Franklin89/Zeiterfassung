/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('ProjectController', function () {

        var pc = this;

        this.projects = [
            {
                name: "Testproject",
                duration: "2",
                description: "Testdescription"
            },
            {
                name: "Altova",
                duration: "4",
                description: "Testdescription"
            },
            {
                name: "Game 456",
                duration: "2",
                description: "Testdescription"
            },
            {
                name: "App 321",
                duration: "2",
                description: "Testdescription"
            },
        ]

    });
})();