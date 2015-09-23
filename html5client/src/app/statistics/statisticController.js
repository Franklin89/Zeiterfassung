(function () {
    'use strict';

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('StatisticsController', ['AuthenticationIntegrationService', 'UsersIntegrationService',
        function (authenticationIntegrationService, userIntegrationService) {

            var _this = this, records, drawChartwithD3;

            records = [
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskId: 'Programmieren',
                    ProjectId: 'Testproject 1'
                },
                {
                    Date: '02.01.2015',
                    Time: 16,
                    TaskId: 'Administratives',
                    ProjectId: 'Testproject 2'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskId: 'Meeting',
                    ProjectId: 'Testproject 3'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskId: 'Programmieren',
                    ProjectId: 'Testproject 4'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskId: 'Programmieren',
                    ProjectId: 'Testproject'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskId: 'Programmieren',
                    ProjectId: 'Testproject'
                }
            ];

            _this.readUserTaskForUser = function () {
                var userName = _this.getCurrentUserName();
                var user;

                //TODO kk: Noch ausbauen - Wenn nicht muss die Id in den local Storage geschrieben werden.
                userIntegrationService.readByUserName(userName)
                 .then(function(result){
                 user = result;
                 userIntegrationService.readUserForId(user.Id)
                 .then(function(result){
                         records = result.UserTasks;
                         _this.timerecords = records;
                         console.log("Records nach dem Lesen" + angular.toJson(records));
                         drawChartwithD3();
                     },
                 function(){
                 alert("Beim zweiten Lesen des Benutzer ist ein Fehler aufgetreten");
                 })
                 },
                 function(){
                 alert("Beim Lesen des Benutzers ist ein Fehler aufgetreten");
                 });
            };

            _this.getCurrentUserName = function () {
                return authenticationIntegrationService.currentUsername();
            };

            _this.limittimerecordsTo4 = function () {
                _this.timerecords = records.slice(0, 4);
            };

            _this.showallrecords = function () {
                _this.timerecords = records;
            };

            drawChartwithD3 = function () {
                var width = 360,
                    height = 360,
                    radius = Math.min(width, height) / 2,
                    donutWidth = 75,
                    legendRectSize = 18,
                    legendSpacing = 4,
                    color = d3.scale.category20b(),
                    svg,
                    arc,
                    pie,
                    path,
                    legend;

                svg = d3.select('#chart')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

                arc = d3.svg.arc()
                    .innerRadius(radius - donutWidth)
                    .outerRadius(radius);

                pie = d3.layout.pie()
                    .value(function (d) {
                        return d.Time;
                    })
                    .sort(null);

                path = svg.selectAll('path')
                    .data(pie(records))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d) {
                        return color(d.data.TaskId);
                    }
                );

                path.on('mouseover', function (d) {
                    var percent, total;
                    total = d3.sum(records.map(function (d) {
                        return d.Time;
                    }));
                    percent = Math.round(1000 * d.data.Time / total) / 10;

                    //TODO kk: Noch angular model verwenden
                    $('#labelLabel').text('Task: ' + d.data.TaskId);
                    $('#countLabel').text('Stunden: ' + d.data.Time);
                    $('#percentLabel').text(percent + '%');
                });

                legend = svg.selectAll('.legend')
                    .data(color.domain())
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function (d, i) {
                        var height = legendRectSize + legendSpacing,
                            offset = height * color.domain().length / 2,
                            horz = -2 * legendRectSize,
                            vert = i * height - offset;
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
            };

            _this.limittimerecordsTo4();
            _this.readUserTaskForUser();
        }]);
})();

