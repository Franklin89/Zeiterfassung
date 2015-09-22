/**
 * Created by Kiwi on 22.09.15.
 */

(function(){
    'use strict';

    angular.module('zeiterfassung.userTasks.integrationservices', ['zeiterfassung.ui.app.constants'])

        .factory('UserTaskIntegrationService', ['$http', '$log', '$q', 'REST',
            function($http, $log, $q, REST){

                function createUserTask(userTask) {
                    var dfd = $q.defer();
                    $log.debug('createUserTask: ' + angular.toJson(userTask, true));
                    $http.post(REST.USERTASKS, userTask, {tracker: 'rest'})
                        .success(function(result) {
                            dfd.resolve(result);
                        })
                        .error(function(result, status) {
                            dfd.reject({result: result, status: status});
                        });
                    return dfd.promise;
                };

                return {
                    createUserTask: createUserTask
                };
            }])
})();