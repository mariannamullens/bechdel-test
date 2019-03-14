import * as d3 from 'd3';

const square = d3.selectAll("rect");
square.style("fill", "orange");

const dataset = d3.csv("/movies.csv", function(d) {
  return {
    pass: d.binary === "FAIL" ? false : true,
  };
});

dataset.then(res => console.log(res));

console.log("working");