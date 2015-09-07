/**
 * Created by U110333 on 25.08.2015.
 */

angular.module('zeiterfassung.ui.app.constants', [])

/**
 * REST URL definitions
 */
    .constant('REST', {
        PROJECTS: 'https://interfaces.azurewebsites.net/api/projects',
        USERS: 'https://interfaces.azurewebsites.net/api/users',
        TASKS: 'https://interfaces.azurewebsites.net/api/tasks',
        USERTASKS: 'https://interfaces.azurewebsites.net/api/usertasks'
    });
