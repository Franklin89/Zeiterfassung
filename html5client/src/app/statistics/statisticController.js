/**
 * Created by Kiwi on 02.09.15.
 */

(function(){

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('StatisticsController', function(){

        var sc = this;

        sc.timerecords;

        var records = [
            {
              date: "02.01.2015",
              hours: 8,
              task: "Programmieren",
              project: "Testproject 1"
            },
            {
              date: "02.01.2015",
              hours: 8,
              task: "Programmieren",
              project: "Testproject 2"
            },
            {
              date: "02.01.2015",
              hours: 8,
              task: "Programmieren",
              project: "Testproject 3"
            },
            {
              date: "02.01.2015",
              hours: 8,
              task: "Programmieren",
              project: "Testproject 4"
            },
            {
                date: "02.01.2015",
                hours: 8,
                task: "Programmieren",
                project: "Testproject"
            },
            {
                date: "02.01.2015",
                hours: 8,
                task: "Programmieren",
                project: "Testproject"
            },
        ];

        function limittimerecordsTo4(){
            sc.timerecords = records.slice(0,4);
        };

        sc.showallrecords = function(){
            sc.timerecords = records;
        };

        limittimerecordsTo4();
    });
})();

