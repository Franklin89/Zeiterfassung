(function () {
    'use strict';

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('StatisticsController', ['AuthenticationIntegrationService', 'UsersIntegrationService',
        'ProjectIntegrationService', 'TaskIntegrationService',
        function (authenticationIntegrationService, userIntegrationService,
                  projectIntegrationService, taskIntegrationService) {

            var _this = this, records, drawChartwithD3;
            _this.workingHoursPerDay = 0;
            var projects;
            var tasks;

            records = [
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskName: 'Programmieren',
                    ProjectName: 'Testproject 1'
                },
                {
                    Date: '02.01.2015',
                    Time: 16,
                    TaskName: 'Administratives',
                    ProjectName: 'Testproject 2'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskName: 'Meeting',
                    ProjectName: 'Testproject 3'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskName: 'Programmieren',
                    ProjectName: 'Testproject 4'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskName: 'Programmieren',
                    ProjectName: 'Testproject'
                },
                {
                    Date: '02.01.2015',
                    Time: 8,
                    TaskName: 'Programmieren',
                    ProjectName: 'Testproject'
                }
            ];

            function readProjects(){
                projectIntegrationService.readProjects()
                    .then(function(result){
                        projects = result;
                    }, function(){
                        alert("Beim Lesen der Projekte ist ein Error aufgetreten.");
                    })
            };

            function readTasks(){
                taskIntegrationService.readAllTasks()
                    .then(function(result){
                        tasks = result;
                    }, function(){
                        alert("Beim Lesen der Tasks ist ein Fehler aufgetreten");
                    })
            };

            function ermittleTaskNameForRecords(userTasks){
                for(var i = 0; i<userTasks.length; i++){
                    var taskName = getTaskNameFromTaskId(userTasks[i].TaskId);
                    records[i].TaskName = taskName;
                }
            }

            function ermittleProjectNameForRecords(userTasks){
                for(var i = 0; i<userTasks.length; i++){
                    var projectName = getProjectNameFromProjetId(userTasks[i].ProjectId);
                    records[i].ProjectName = projectName;
                }
            }

            function getProjectNameFromProjetId(projectId){
                var projectName = undefined;

                projects.some(function(project){
                    projectName = project.Name;
                    return project.Id === projectId;
                });
                return projectName;
            };

            function getTaskNameFromTaskId(taskid){
                var taskName = undefined;

                tasks.some(function(task){
                    taskName = task.Name;
                    return task.Id === taskid;
                    });

                return taskName;
            };

            _this.readUserTaskForUser = function () {
                var userName = _this.getCurrentUserName();
                var user;

                //TODO kk: Noch ausbauen - Wenn nicht muss die Id in den local Storage geschrieben werden.
                userIntegrationService.readByUserName(userName)
                 .then(function(result){
                 user = result;
                 _this.workingHoursPerDay = user.WorkingHoursPerDay;
                 userIntegrationService.readUserForId(user.Id)
                 .then(function(result){
                         records = result.UserTasks;
                         ermittleTaskNameForRecords(result.UserTasks);
                         ermittleProjectNameForRecords(result.UserTasks);
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
                        return color(d.data.TaskName);
                    }
                );

                path.on('mouseover', function (d) {
                    var percent, total;
                    total = d3.sum(records.map(function (d) {
                        return d.Time;
                    }));
                    percent = Math.round(1000 * d.data.Time / total) / 10;

                    //TODO kk: Noch angular model verwenden
                    $('#labelLabel').text('Task: ' + d.data.TaskName);
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
            readProjects();
            readTasks();
        }]);
})();

