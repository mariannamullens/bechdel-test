import * as d3 from 'd3';
import CalendarChart from './classes/calendar';
import PackCircle from './classes/packCircle';

let dataset = d3.csv("/movies.csv", function(d) {
  return {
    pass: d.binary === "FAIL" ? false : true,
    year: d.year,
    title: d.title,
    budget: +d.domgross,
    decade: `${d.year.slice(0,3)}0`,
  };
});

dataset.then( res => {
  let pc = new PackCircle(res);
});

// dataset.then(res => {
//   years = d3.nest()
//     .key(d => d.decade)
//     .key(d => d.year)
//     .entries(res);

//   let hier = d3.nest()
//     .key(() => 'key')
//     .entries(years);

//   console.log(hier);

//   root = d3.hierarchy(hier[0], d => d.values);
//   console.log('root', root);

//   let packLayout = d3.pack()
//     .size([600,600])
//     .padding(2)
//     (root.sum(d => d.budget));

//   let allNodes = root.descendants();
//   console.log('decendants', allNodes);

//   const canvas = d3.select(".canvas")
//     .append("svg")
//     .attr("height", 1000)
//     .attr("width", 1000);

//   let nodes = canvas.selectAll("circle")
//     .data(allNodes)
//     .enter()
//     .append("circle")
//     .attr("cx", d => d.x)
//     .attr("cy", d => d.y)
//     .attr("r", d => d.r)
//     .attr("stroke", d => !d.parent ? "white" : "white")
//     .attr("fill", d => d.children ? "black" : d.data.pass ? "white" : "red");
// });

console.log("working");