import * as d3 from 'd3';

class CalendarChart {
  constructor(dataset) {
    this.dataset = dataset;
    this.buildChart();
  }

  buildChart() {
    const canvas = d3.select(".canvas")
      .append("svg")
      .attr("height", 1000)
      .attr("width", 1000);

    let canvas2 = canvas.selectAll("circle")
      .data(this.dataset)
      .enter().append("circle")
      .attr("cx", d => (2019 - d.year) * 5 )
      .attr("cy", d => (2019 - d.year) * 5 )
      .attr("r", 30);

    console.log("yo");
  }
};

export default CalendarChart;