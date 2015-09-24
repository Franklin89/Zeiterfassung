/**
 * Created by Kiwi on 24.09.15.
 */

(function(){

    angular.module('zeiterfassung.saldoCalculator', [])

        .factory('SaldoHelper', function(){

            function calculateSaldo(startdatum, arbeitsStundenproTag, userTasks){
                var arbeitstage = ermittleDatumsDifferenz(startdatum);
                var sollStunden = ermittleSollStunden(arbeitsStundenproTag, arbeitstage);
                var istStunden = ermittleGeleisteteStunden(userTasks);
                return istStunden - sollStunden;
            }

            function ermittleSollStunden(arbeitsStundenproTag, arbeitstage){
                return arbeitsStundenproTag * arbeitstage;
            }

            function ermittleGeleisteteStunden(userTasks){
                var istStunden = 0;
                userTasks.forEach(function(userTask){
                    istStunden += userTask.Time;
                });
                return istStunden;
            }

            function ermittleDatumsDifferenz(startdatum){
                var startdatumConvertiert = new Date(startdatum);
                var enddatum = new Date();

                var differenzInTagen = Math.floor((enddatum - startdatumConvertiert) / (1000*60*60*24));
                var geradeWochen = parseInt(differenzInTagen/7);
                var arbeitstage;

                arbeitstage = differenzInTagen - (geradeWochen * 2);
                if(enddatum.getDay() == 0){
                    arbeitstage--;
                };

                return arbeitstage;
            }

            return {
                "calculateSaldo": calculateSaldo
            }
        });
})();