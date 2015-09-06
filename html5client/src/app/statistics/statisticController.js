/**
 * Created by Kiwi on 02.09.15.
 */

(function () {

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('StatisticsController', function () {

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
                hours: 16,
                task: "Administratives",
                project: "Testproject 2"
            },
            {
                date: "02.01.2015",
                hours: 8,
                task: "Meeting",
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

        function limittimerecordsTo4() {
            sc.timerecords = records.slice(0, 4);
        };

        sc.showallrecords = function () {
            sc.timerecords = records;
        };

        limittimerecordsTo4();


        //Hier kommt der Data Visualisation Stuff
        //=============================================


        var dataset = [
            {label: 'Abulia', count: 10},
            {label: 'Betelgeuse', count: 20},
            {label: 'Cantaloupe', count: 30},
            {label: 'Dijkstra', count: 40}
        ];

        var width = 360;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

        var color = d3.scale.category20b();

        var svg = d3.select('#chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');

        var arc = d3.svg.arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var pie = d3.layout.pie()
            .value(function (d) {
                return d.hours;
            })
            .sort(null);

        var path = svg.selectAll('path')
            .data(pie(records))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function (d, i) {
                return color(d.data.task);
            });


        var tooltip = d3.select('#chartcontainer');

        path.on('mouseover', function (d) {
            var total = d3.sum(records.map(function (d) {
                return d.hours;
            }));
            var percent = Math.round(1000 * d.data.hours / total) / 10;

            $('#labelLabel').text("Task: " + d.data.task);
            $('#countLabel').text("Stunden: " + d.data.hours);
            $('#percentLabel').text(percent + '%');

        });

        /*
        path.on('mouseout', function () {
            tooltip.style('display', 'none');
        });
        */


        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = height * color.domain().length / 2;
                var horz = -2 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function (d) {
                return d;
            });
    });
})();

