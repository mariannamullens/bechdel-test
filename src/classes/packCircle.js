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

    let root = d3.hierarchy(hier[0], d => d.values);

    let packLayout = d3.pack()
      .size([750, 750])
      (root.sum(d => d.budget));

    let allNodes = root.descendants();
    let focus = packLayout;
    let view;

    const canvas = d3.select(".canvas")
      .append("svg")
      .attr("height", 750)
      .attr("width", 750)
      .classed("pack-circle", true);

    let nodes = canvas.selectAll("g")
      .data(allNodes)
      .enter()
      .append("g")
      .attr('transform', d => 'translate(' + [375, 375] + ')')
      .style('text-anchor', 'middle');

    let circles = nodes
      .append("circle")
      .attr("r", d => d.r)
      .attr("stroke", d => !d.children ? "" : "white")
      .attr("fill", d => d.children ? "black" : d.data.pass ? "white" : "red")
      .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

    let text = canvas.append("g")
      .attr('transform', d => 'translate(' + [375, 375] + ')')
      .selectAll("text")
      .data(allNodes)
      .join("text")
      .attr("text-anchor", "middle")
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.title ? d.data.title : d.data.key);

    zoomTo([packLayout.x, packLayout.y, packLayout.r * 2]);

    function zoomTo(v) {
      const k = 750 / v[2];

      view = v;

      text.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      text.attr("font-size", d => `${(d.r / 5) * k}px`);
      circles.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      circles.attr("r", d => d.r * k);
    }

    function zoom(d) {

      focus = d;

      const transition = canvas.transition()
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      text
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus || !d.children ? 1 : 0)
        .on("start", function (d) 
          { if (d.parent === focus || d === focus) this.style.display = "inline"; })
        .on("end", function (d) { if (d.parent !== focus && d !== focus ) this.style.display = "none"; });
    }
  }
};

export default PackCircle;