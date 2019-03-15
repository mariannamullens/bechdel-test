import * as d3 from 'd3';

class PackCircle {
  constructor(dataset) {
    this.dataset = dataset;
    this.buildChart();
  }

  buildChart() {

    let hier = d3.nest()
      .key(() => 'key')
      .key(d => d.decade)
      .key(d => d.year)
      .entries(this.dataset);

    // let hier = d3.nest()
    //   .key(() => 'key')
    //   .entries(years);

    let root = d3.hierarchy(hier[0], d => d.values);
    let focus = root;
    let view;

    let packLayout = d3.pack()
      .size([1000, 1000])
      .padding(2)
      (root.sum(d => d.budget));

    let allNodes = root.descendants();

    const canvas = d3.select(".canvas")
      .append("svg")
      .attr("height", 1000)
      .attr("width", 1000);

    let nodes = canvas.selectAll("g")
      .data(allNodes)
      .enter()
      .append("g")
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')');

    let circles = nodes
      .append("circle")
      .attr("r", d => d.r)
      .attr("stroke", d => !d.parent ? "white" : "white")
      .attr("fill", d => d.children ? "black" : d.data.pass ? "white" : "red")
      .on("click", function(d) { 
        d3.select(this)
          .attr("r", d.r * 3)
          .attr("z-index", 3)

        console.log(d.children)

        d3.select(d.children)
          .attr("r", d => console.log(d))
          .attr("z-index", 3)
          .attr("fill", "green")
         });

    let text = nodes
      .append("text")
      .text( d=> 'hey')

    // let nodes = canvas.selectAll("circle")
    //   .data(allNodes)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", d => d.x)
    //   .attr("cy", d => d.y)
    //   .attr("r", d => d.r)
    //   .attr("stroke", d => !d.parent ? "white" : "white")
    //   .attr("fill", d => d.children ? "black" : d.data.pass ? "white" : "red");
  }

  // zoom(d, canvas) {
  //   let view;
  //   const transition = canvas.transition()
  //     .duration(d3.event.altKey ? 7500 : 750)
  //     .tween("zoom", d => {
  //       const i = d3.interpolateZoom(view, [d.x, d.y, d.r * 2]);
  //       return t => zoomTo(i(t));
  //     });
  // }
};

export default PackCircle;