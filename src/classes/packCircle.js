import * as d3 from 'd3';

class PackCircle {
  constructor(dataset) {
    this.dataset = dataset;
    this.buildChart();
  }

  buildChart() {
    let years = d3.nest()
      .key(d => d.decade)
      .key(d => d.year)
      .entries(this.dataset);

    let hier = d3.nest()
      .key(() => 'key')
      .entries(years);

    let root = d3.hierarchy(hier[0], d => d.values);

    let packLayout = d3.pack()
      .size([600, 600])
      .padding(2)
      (root.sum(d => d.budget));

    let allNodes = root.descendants();

    const canvas = d3.select(".canvas")
      .append("svg")
      .attr("height", 1000)
      .attr("width", 1000);

    let nodes = canvas.selectAll("circle")
      .data(allNodes)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("stroke", d => !d.parent ? "white" : "white")
      .attr("fill", d => d.children ? "black" : d.data.pass ? "white" : "red");
  }
};

export default PackCircle;