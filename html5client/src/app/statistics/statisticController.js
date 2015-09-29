(function () {
    'use strict';

    angular.module(
        'zeiterfassung.statistics',
        ['zeiterfassung.project.integrationservices', 'zeiterfassung.ui.app.constants',
            'zeiterfassung.task.integrationservices', 'zeiterfassung.userTasks.integrationservices',
            'zeiterfassung.authentication.integrationservices', 'zeiterfassung.users.integrationservices',
            'zeiterfassung.saldoCalculator'])
        .controller('StatisticsController', ['AuthenticationIntegrationService', 'UsersIntegrationService',
        'ProjectIntegrationService', 'TaskIntegrationService', 'SaldoHelper', 'UserTaskIntegrationService',
            'GraphicService',
        function (authenticationIntegrationService, userIntegrationService,
                  projectIntegrationService, taskIntegrationService, saldoHelper,
                    userTaskIntegrationservice, graphicService) {

            var _this = this, records, drawChartwithD3;
            _this.workingHoursPerDay = 0;
            _this.saldo = 0;
            var projects;
            var tasks;
            var pageupdate = false;
            _this.hasMoreThan6records = false;
            _this.ausstehendeFerientage = 25;
            _this.gebrauchteFerienTage = 0;

            _this.usersOverview = [];
            _this.monthOverview = [];

            records = [];

            function readProjects() {
                projectIntegrationService.readProjects()
                    .then(function (result) {
                        projects = result;
                    }, function () {
                        swal("Oops...", "Fehler beim Lesen der Projekte!", "error");
                    });
            }

            function readTasks() {
                taskIntegrationService.readAllTasks()
                    .then(function (result) {
                        tasks = result;
                    }, function () {
                        swal("Oops...", "Fehler beim Lesen der T\u00E4tigkeiten!", "error");
                    });
            }

            function ermittleTaskNameForRecords(userTasks) {
                for (var i = 0; i < userTasks.length; i++) {
                    var taskName = getTaskNameFromTaskId(userTasks[i].TaskId);
                    records[i].TaskName = taskName;
                }
            }

            function ermittleProjectNameForRecords(userTasks) {
                for (var i = 0; i < userTasks.length; i++) {
                    var projectName = getProjectNameFromProjectId(userTasks[i].ProjectId);
                    records[i].ProjectName = projectName;
                }
            }

            function getProjectNameFromProjectId(projectId) {
                var projectName;

                projects.some(function (project) {
                    projectName = project.Name;
                    return project.Id === projectId;
                });
                return projectName;
            }

            function getTaskNameFromTaskId(taskid) {
                var taskName;

                tasks.some(function (task) {
                    taskName = task.Name;
                    return task.Id === taskid;
                });

                return taskName;
            }

            function ermittleFerien() {
                records.forEach(function (record) {
                    if (record.TaskName === "Ferien") {
                        _this.ausstehendeFerientage -= record.Time;
                        _this.gebrauchteFerienTage += record.Time;
                    }
                });
            }

            function reset(){
                pageupdate = true;
                _this.saldo = 0;
                _this.gebrauchteFerienTage = 0;
            }

            _this.isUserAdmin = function () {
                return authenticationIntegrationService.isAdmin();
            };

            _this.deleteUserTask = function(userTaskId){
                userTaskIntegrationservice.deleteUserTask(userTaskId).then(function(){
                    _this.readUserTaskForUser();
                    reset();
                }, function(){
                    swal("Beim Löschen des UserTasks ist ein Fehler aufgetaucht");
                })
            };

            function createMonthOverview(userTasks){
                userTasks.forEach(function(userTask) {
                    var date = new Date(userTask.Date);
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    var userTaskAdded = false;

                    if (_this.monthOverview.length === 0) {
                        _this.monthOverview.push(
                            {
                                month: month,
                                year: year,
                                time: userTask.Time
                            }
                        );
                    }
                    else {
                        _this.monthOverview.forEach(function (entry) {
                            if (entry.month === month && entry.year === year) {
                                entry.time += userTask.Time;
                                userTaskAdded = true;
                            }
                        });
                        if (!userTaskAdded) {
                            _this.monthOverview.push(
                                {
                                    month: month,
                                    year: year,
                                    time: userTask.Time
                                }
                            );
                        }
                    }
                });
            }

            function createUserTasksOverviewForUser() {
                userIntegrationService.readUsers()
                    .then(function (result) {
                        var allUsers = result;
                        userTaskIntegrationservice.readAllUserTasks()
                            .then(function (result) {
                                var userTasks = result;
                                createMonthOverview(userTasks);
                                allUsers.forEach(function (user) {
                                    var loggedTimeByUser = 0;
                                    userTasks.forEach(function (userTask) {
                                        if (user.Id === userTask.UserId) {
                                            loggedTimeByUser += userTask.Time;
                                        }
                                    });
                                    _this.usersOverview.push({
                                        "name": user.FirstName + " " + user.LastName,
                                        "time": loggedTimeByUser
                                    });
                                });
                            }), function () {
                            swal("Oops...", "Fehler beim Lesen der T\u00E4tigkeiten!", "error");
                        };
                    }, function () {
                        swal("Oops...", "Ein Fehler ist aufgetreten!", "error");
                        return undefined;
                    });
            }

            _this.readUserTaskForUser = function () {
                var userName = _this.getCurrentUserName();
                var user;

                userIntegrationService.readByUserName(userName)
                    .then(function (result) {
                        user = result;
                        _this.workingHoursPerDay = user.WorkingHoursPerDay;
                        userIntegrationService.readUserForId(user.Id)
                            .then(function (result) {
                                records = result.UserTasks;

                                if (result.UserTasks.length !== 0) {
                                    ermittleTaskNameForRecords(result.UserTasks);
                                    ermittleProjectNameForRecords(result.UserTasks);
                                    ermittleFerien();
                                    var startdatum = result.UserTasks[0].Date;
                                    _this.saldo = saldoHelper.calculateSaldo(startdatum, _this.workingHoursPerDay, result.UserTasks);
                                    _this.timerecords = records;
                                    console.log("Records nach dem Lesen" + angular.toJson(records));

                                    if(!pageupdate) {
                                        graphicService.createGraphic(records);
                                    }
                                    _this.limittimerecordsTo6();

                                    if (_this.isUserAdmin()) {
                                        createUserTasksOverviewForUser(result.UserTasks);
                                    }


                                }
                            },
                            function () {
                                swal("Oops...", "Beim zweiten Lesen des Benutzers ist ein Fehler aufgetreten!", "error");
                            });
                    },
                    function () {
                        swal("Oops...", "Beim Lesen des Benutzers ist ein Fehler aufgetreten!", "error");
                    });
            };

            _this.getCurrentUserName = function () {
                return authenticationIntegrationService.currentUsername();
            };

            _this.limittimerecordsTo6 = function () {
                if(records.length > 6){
                    _this.hasMoreThan6records = true;
                }
                _this.timerecords = records.slice(0, 6);
            };

            _this.showallrecords = function () {
                _this.timerecords = records;
            };

            _this.readUserTaskForUser();
            readProjects();
            readTasks();
        }
    ]);
})();
