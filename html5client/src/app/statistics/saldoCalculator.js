(function() {
    'use strict';
    angular.module('zeiterfassung.saldoCalculator', [])

        .factory('SaldoHelper', function() {

            function calculateSaldo(startdatum, arbeitsStundenproTag, userTasks) {
                var arbeitstage, sollStunden, istStunden;
                arbeitstage = ermittleDatumsDifferenz(startdatum);
                sollStunden = ermittleSollStunden(arbeitsStundenproTag, arbeitstage);
                istStunden = ermittleGeleisteteStunden(userTasks);
                return istStunden - sollStunden;
            }

            function ermittleSollStunden(arbeitsStundenproTag, arbeitstage) {
                return arbeitsStundenproTag * arbeitstage;
            }

            function ermittleGeleisteteStunden(userTasks) {
                var istStunden = 0;
                userTasks.forEach(function(userTask) {
                    istStunden += userTask.Time;
                });
                return istStunden;
            }

            function ermittleDatumsDifferenz(startdatum) {
                var startdatumConvertiert, enddatum, differenzInTagen, geradeWochen, arbeitstage;
                startdatumConvertiert = new Date(startdatum);
                enddatum = new Date();
                differenzInTagen = Math.floor((enddatum - startdatumConvertiert) / (1000 * 60 * 60 * 24));
                geradeWochen = parseInt(differenzInTagen / 7);

                arbeitstage = differenzInTagen - (geradeWochen * 2);
                if (enddatum.getDay() === 0) {
                    arbeitstage--;
                }

                return arbeitstage;
            }

            return {
                calculateSaldo: calculateSaldo
            };
        });
})();
