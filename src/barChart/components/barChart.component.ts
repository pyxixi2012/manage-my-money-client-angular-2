import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import * as d3 from 'd3';

@Component({
    selector: 'sd-barchart',
    viewProviders: [],
    moduleId: module.id,
    templateUrl: './barChart.component.html',
    styleUrls: ['./barChart.component.css'],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class BarChartComponent {
    @Input() chartData: any = null;
    ngOnInit() {
        this.render();
    }
    render() {
    this.chartData.sort( (a:any, b:any ) => {
            if (a.amount > b.amount) {
                return 1;
            }
            if (a.amount < b.amount) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        let width = 960;
        let height = 500;
        let x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .5);
        let y = d3.scale.linear()
            .range([height, 0]);
        let xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        let yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10, '%');
        let chart = d3.select('.chart')
                        .attr('width', width)
                        .attr('height', height);
        x.domain(this.chartData.map( (d:any) => { return d.cat_name; }));
        y.domain([0, d3.max(this.chartData, (d:any) => { return d.amount; })]);
        chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        chart.selectAll('.bar')
            .data(this.chartData)
            .enter().append('rect')
            .attr('class', (d:any) => {
                if(d.amount < 0) {
                    return 'bar positive';
                }
                return 'bar negative'; })
            .attr('x', (d:any) => { return x(d.cat_name); })
            .attr('y', (d:any) => {
                let barHeight = d.amount;
                if(barHeight < 0) {
                    barHeight *= -1;
                }
                return y(barHeight); })
            .attr('height', (d:any) => {
                let barHeight = d.amount;
                if(barHeight < 0) {
                    barHeight *= -1;
                }
                return height - y(barHeight); })
            .attr('width', x.rangeBand());
        chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Amount');
    }
}
