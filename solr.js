var sun = {
    radius: 24397,
    color: "#F6C651"
};

var planets = [{
    name: "Mercury",
    majorAxis: 115818100,
    minorAxis: 57909050,
    offset: 69816900,
    tilt: "",
    angle: 285.55,
    radius: 2439.7,
    color: "#C7B9B3",
    timePeriod: 0.240846,
    theta: 0
}, {
    name: "Venus",
    majorAxis: 216416000,
    minorAxis: 108208000,
    offset: 108939000,
    tilt: "",
    angle: 94.13,
    radius: 6051.8,
    color: "#D97F86",
    timePeriod: 0.615198,
    theta: 0
}, {
    name: "Earth",
    majorAxis: 299025000,
    minorAxis: 149598261,
    offset: 151930000,
    tilt: "",
    angle: 100.46,
    radius: 6371,
    color: "#598EBD",
    timePeriod: 1.000017421,
    theta: 0
}, {
    name: "Mars",
    majorAxis: 455900000,
    minorAxis: 227939100,
    offset: 249200000,
    tilt: "",
    angle: 155.60,
    radius: 3389.5,
    color: "#A14631",
    timePeriod: 1.88,
    theta: 0
}, {
    name: "Jupiter",
    majorAxis: 1557094400,
    minorAxis: 778547200,
    offset: 816520800,
    tilt: "",
    angle: 104.92,
    radius: 69911,
    color: "#E8AF7B",
    timePeriod: 11.8618,
    theta: 0
}, {
    name: "Saturn",
    majorAxis: 2866898739,
    minorAxis: 1433449370,
    offset: 1513325783,
    tilt: "",
    angle: 226.71,
    radius: 58232,
    color: "#DECD45",
    timePeriod: 29.4571,
    theta: 0
}, {
    name: "Uranus",
    majorAxis: 5741342800,
    minorAxis: 2870671400,
    offset: 3006224700,
    tilt: "",
    angle: 11.93,
    radius: 25362,
    color: "#8798BB",
    timePeriod: 84.016846,
    theta: 0
}, {
    name: "Neptune",
    majorAxis: 8997085300,
    minorAxis: 4498542600,
    offset: 4537580900,
    tilt: "",
    angle: 334.90,
    radius: 24622,
    color: "#84B9CD",
    timePeriod: 164.8,
    theta: 0
}];

var distanceScale = 10000000;
var sizeScale = 10000;
var sunCenter = [(planets[7].radius / sizeScale) + (planets[7].majorAxis / (2 * distanceScale)), (planets[7].radius / sizeScale) + (planets[7].minorAxis / (2 * distanceScale))];
var equidistant = true;
var year = 365;
var timeScale = 10;
var planetsD3 = [];
var orbitsD3 = [];

var getPosition = function(p) {
    var cs, cy, rx, ry;
    if (equidistant) {

    }
};

var addPlanet = function(p, idx) {
    planetsD3[idx] = container
        .append('circle')
        .attr('r', p.radius / sizeScale)
        .attr('cx', p.offset / distanceScale + sunCenter[0] + ((p.majorAxis * Math.cos(p.angle)) / distanceScale))
        .attr('cy', sunCenter[1] + ((p.minorAxis * Math.sin(p.angle)) / distanceScale))
        .attr('fill', p.color)
        .attr('id', p.name);
    orbitsD3[idx] = container
        .append('ellipse')
        .attr('cx', p.offset / distanceScale + sunCenter[0])
        .attr('cy', sunCenter[1])
        .attr('rx', p.majorAxis / distanceScale)
        .attr('ry', p.minorAxis / distanceScale)
        .attr('stroke', p.color)
        .attr('stroke-width', 0.1)
        .attr('fill', 'none');
};

var animate = function() {
    var interval = setInterval(function() {
        for (var p in planetsD3) {
            planets[p].theta += Math.PI / ((year / timeScale) * planets[p].timePeriod);
            planetsD3[p]
                .attr('cx', planets[p].offset / distanceScale + sunCenter[0] + ((planets[p].majorAxis * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale))
                .attr('cy', sunCenter[1] + ((planets[p].minorAxis * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale));
        }
    }, 50);
};

//zoom pan : http://bl.ocks.org/mbostock/6123708

var margin = {top: -5, right: -5, bottom: -5, left: -5},
    width = 2000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var zoom = d3.behavior.zoom()
    .scaleExtent([0.5, 100])
    .on('zoom', zoomed);

var drag = d3.behavior.drag()
    .origin(function(d) {
        return d;
    })
    .on('dragstart', dragstarted)
    .on('drag', dragged)
    .on('dragend', dragended);

var svg = d3.select('#solr').attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')
    .call(zoom);
var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all");

var container = svg.append("g");

var solr = container
    .append('circle')
    .attr('r', sun.radius / sizeScale)
    .attr('cx', sunCenter[0])
    .attr('cy', sunCenter[1])
    .attr('fill', sun.color);

function zoomed() {
  container.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
}

function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed('dragging', true);
}

function dragged(d) {
  d3.select(this).attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed('dragging', false);
}

for (var i in planets) {
    addPlanet(planets[i], i);
}
animate();
