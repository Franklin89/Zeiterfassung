(function() {
    'use strict';

    var timerecordingapp = angular.module('zeiterfassung.ui');

    timerecordingapp.controller('StatisticsController', function() {

        var _this = this, records, drawChartwithD3;

        records = [
            {
                date: '02.01.2015',
                hours: 8,
                task: 'Programmieren',
                project: 'Testproject 1'
            },
            {
                date: '02.01.2015',
                hours: 16,
                task: 'Administratives',
                project: 'Testproject 2'
            },
            {
                date: '02.01.2015',
                hours: 8,
                task: 'Meeting',
                project: 'Testproject 3'
            },
            {
                date: '02.01.2015',
                hours: 8,
                task: 'Programmieren',
                project: 'Testproject 4'
            },
            {
                date: '02.01.2015',
                hours: 8,
                task: 'Programmieren',
                project: 'Testproject'
            },
            {
                date: '02.01.2015',
                hours: 8,
                task: 'Programmieren',
                project: 'Testproject'
            }
        ];

        _this.limittimerecordsTo4 = function() {
            _this.timerecords = records.slice(0, 4);
        };

        _this.showallrecords = function() {
            _this.timerecords = records;
        };

        drawChartwithD3 = function() {
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
                .value(function(d) {
                    return d.hours;
                })
                .sort(null);

            path = svg.selectAll('path')
                .data(pie(records))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', function(d) {
                    return color(d.data.task);
                }
            );

            path.on('mouseover', function(d) {
                var percent, total;
                total = d3.sum(records.map(function(d) {
                    return d.hours;
                }));
                percent = Math.round(1000 * d.data.hours / total) / 10;

                $('#labelLabel').text('Task: ' + d.data.task);
                $('#countLabel').text('Stunden: ' + d.data.hours);
                $('#percentLabel').text(percent + '%');

            });

            legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', function(d, i) {
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
                .text(function(d) {
                    return d;
                });
        };

        drawChartwithD3();
        _this.limittimerecordsTo4();
    });
})();

