/**
 * Created by Kiwi on 29.09.15.
 */

(function(){
    'use strict';
    angular.module('zeiterfassung.graphicService', [])

        .factory('GraphicService', function(){

            var drawChartwithD3 = function (records) {
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

            return {
                createGraphic: drawChartwithD3
            }
        });
})();
