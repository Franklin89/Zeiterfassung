/**
 * Created by Kiwi on 07.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('TaskController', function () {

        var tc = this;

        this.tasks = [
            {
                name: "Programming",
                description: "Implementing a module"
            },
            {
                name: "Administratives",
                description: "Diverent administrative Tasks"
            },
            {
                name: "Meeting",
                description: "Testdescription"
            },
            {
                name: "Specification",
                description: "Testdescription"
            },
        ]

    });
})();