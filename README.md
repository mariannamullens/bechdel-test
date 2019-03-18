# BECHDEL-WALLACE VISUALIZATION

The Bechdel (or Bechdel-Wallace) Test, named after graphic novelist Alison Bechdel, measures the representation of women in film and other media. The test's three measures, 1) the movie has to have at least two women in it,
2) who talk to each other, and 3) about something besides a man, remains an absurdly low bar that many movies still fail to clear. This project was inspired by the many people I run into that still don't know about the test - I wanted to create a very simple page that explained the test and its limitations, and to present FiveThirtyEight's dataset in a way that exposed the frequency of failure.

Visit the [live site](https://mariannamullens.github.io/bechdel-test/).

## Features

Using D3 and Javascript I created a visualization by decade of those movies that passed and failed the Bechdel Test. Circle size is based on the film's domestic gross.

The main feature of the site is a zoomable circle pack based on this [D3 tutorial](https://observablehq.com/@d3/zoomable-circle-packing).

Part of the challenge of the project was getting the dataset into a hierarchical format that played nicely with the circle pack. The D3 methods d3.nest and d3.hierarchy allowed me to move from a .csv to a circle pack without having to manipulate the raw data first.

## Feature Backlog

While I was able to create the Zoomable circle pack, a stretch goal was to display more film information on each circle (currently each circle only displays the movie). The original dataset has data points like budget and gross domestic product, but additional information could also be pulled from IMDB's datasets or API.