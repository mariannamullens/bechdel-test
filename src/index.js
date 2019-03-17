import * as d3 from 'd3';
import CalendarChart from './classes/calendar';
import PackCircle from './classes/packCircle';
import './assets/packCircle.css';

document.addEventListener("DOMContentLoaded", function (event) {
  let dataset = d3.csv("./movies.csv", function (d) {
    return {
      pass: d.binary === "FAIL" ? false : true,
      year: d.year,
      title: d.title.length > 24 ? `${d.title.slice(0, 23)}...` : d.title,
      budget: +d.domgross,
      decade: `${d.year.slice(0, 3)}0`,
    };
  });

  dataset.then(res => {
    let pc = new PackCircle(res);
  });

  document.getElementById("info").addEventListener("click", () => {
    let el = document.getElementById("overlay");

    if (el.className === "overlay") {
      el.classList.remove("overlay");
    } else {
    el.classList.add("overlay");
    }
  });
});

console.log("this should not be broken");