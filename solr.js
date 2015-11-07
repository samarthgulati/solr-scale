var sun = {
    radius: 696342,
    color: "#F6C651"
};

var planets = [{
    name: "Mercury",
    majorAxis: 115818100,
    minorAxis: 57909050,
    eqMajorAxis: 2000000000,
    eqMinorAxis: 1000000000,
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
    eqMajorAxis: 3350000000,
    eqMinorAxis: 2350000000,
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
    eqMajorAxis: 4700000000,
    eqMinorAxis: 3700000000,
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
    eqMajorAxis: 6050000000,
    eqMinorAxis: 5050000000,
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
    eqMajorAxis: 7400000000,
    eqMinorAxis: 6400000000,
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
    eqMajorAxis: 8750000000,
    eqMinorAxis: 7750000000,
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
    eqMajorAxis: 10100000000,
    eqMinorAxis: 9100000000,
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
    eqMajorAxis: 11450000000,
    eqMinorAxis: 10450000000,
    offset: 4537580900,
    tilt: "",
    angle: 334.90,
    radius: 24622,
    color: "#84B9CD",
    timePeriod: 164.8,
    theta: 0
}];

var distanceScale = 10000000;
var sunScale = 10000000;
var sizeScale = 10000000;
var sunCenter = [(planets[7].radius / sizeScale) + (planets[7].majorAxis / (2 * distanceScale)), (planets[7].radius / sizeScale) + (planets[7].minorAxis / (2 * distanceScale))];
var equidistant = true;
var year = 365;
var timeScale = 1;
var planetsD3 = [];
var orbitsD3 = [];
var distance = [];
var scale = [];
var offset = [];
var majorAxis = [];
var minorAxis = [];
var interval;
var sunResize;
var posTransition = [];
var angleTransition = [];

for (var p in planets) {
    scale[p] = d3.scale.pow().exponent(0.3).domain([0, 100, 200]).range([planets[p].radius, planets[p].radius * 10000, planets[p].radius * 10000]);
    offset[p] = d3.scale.pow().exponent(0.3).domain([0, 100, 200]).range([planets[p].offset, 0, 0]);
    minorAxis[p] = d3.scale.pow().exponent(0.3).domain([0, 100, 200]).range([planets[p].minorAxis, planets[p].eqMinorAxis, planets[p].eqMinorAxis]);
    majorAxis[p] = d3.scale.pow().exponent(0.3).domain([0, 100, 200]).range([planets[p].majorAxis, planets[p].eqMajorAxis, planets[p].eqMajorAxis]);
}

sunResize = d3.scale.linear().domain([0, 100, 175, 200]).range([sunScale, sunScale / 1000, sunScale / 2500, sunScale / 10000]);
var alpha = d3.scale.pow().exponent(0.3).domain([100, 200]).range([1, 0]);
var sunShift = d3.scale.linear().domain([100, 200]).range([sunCenter[0], -sunCenter[0] / 2]);

var setTransitFunction = function(positions) {

    for (var i in positions) {
        var theta = planets[i].theta+planets[i].angle;
        while (theta > 2 * Math.PI) {
            theta -= 2 * Math.PI;
        }
        angleTransition[i] = d3.scale.linear().domain([100, 175]).range([theta, 2 * Math.PI]);
        //2 * Math.PI - theta;
        /*posTransition[i] = [];
        posTransition[i][0] = d3.scale.pow().exponent(0.3).domain([100, 175]).range([positions[i][0], sunCenter[0] + majorAxis[i](range.value) / distanceScale]);
        posTransition[i][1] = d3.scale.pow().exponent(0.3).domain([100, 175]).range([positions[i][1], sunCenter[1]]);*/
    }
    return angleTransition;
};

/*var reScale = function() {
    var cx, cy, rx, ry;
    if (equidistant) {
        rx = 200 * distanceScale;
        ry = 100 * distanceScale;
        for (var p in planets) {
            planets[p].offset = 0;
            planets[p].majorAxis = rx;
            planets[p].minorAxis = ry;
            orbitsD3[p].attr('cx', sunCenter[0]);
            orbitsD3[p].attr('rx', rx / distanceScale);
            orbitsD3[p].attr('ry', ry / distanceScale);
            rx += 135 * distanceScale;
            ry += 135 * distanceScale;
        }
    }
};*/

var addPlanet = function(p, idx) {
    planetsD3[idx] = container.append('g');
    planetsD3[idx]
        .append('circle')
        .attr('r', p.radius / sizeScale)
        .attr('cx', p.offset / distanceScale + sunCenter[0] + ((p.majorAxis * Math.cos(p.angle)) / distanceScale))
        .attr('cy', sunCenter[1] + ((p.minorAxis * Math.sin(p.angle)) / distanceScale))
        .attr('fill', p.color)
        .attr('id', p.name);
    planetsD3[idx]
        .append('circle')
        .attr('r', 10)
        .attr('cx', p.offset / distanceScale + sunCenter[0] + ((p.majorAxis * Math.cos(p.angle)) / distanceScale))
        .attr('cy', sunCenter[1] + ((p.minorAxis * Math.sin(p.angle)) / distanceScale))
        .attr('stroke', p.color)
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    planetsD3[idx]
        .on("mouseover", function(d) {
            div.transition()
                .duration(100)
                .style("opacity", 0.9);
            div.html(planets[idx].name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    orbitsD3[idx] = container
        .append('ellipse')
        .attr('cx', p.offset / distanceScale + sunCenter[0])
        .attr('cy', sunCenter[1])
        .attr('rx', p.majorAxis / distanceScale)
        .attr('ry', p.minorAxis / distanceScale)
        .attr('stroke', p.color)
        .attr('stroke-width', 1)
        .attr('fill', 'none')
        .attr('class', 'orbit');
};

var animate = function() {
    interval = setInterval(function() {
        for (var p in planetsD3) {
            planets[p].theta += Math.PI / ((year / timeScale) * planets[p].timePeriod);
            planetsD3[p].selectAll('circle')
                .attr('cx', offset[p](range.value) / distanceScale + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale));
        }
    }, 60);
};

//zoom pan : http://bl.ocks.org/mbostock/6123708

var margin = {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

var zoom = d3.behavior.zoom()
    .scaleExtent([0.25, 1000])
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

var rect = svg.append('rect')
    .attr('width', width * 2)
    .attr('height', height * 2)
    .attr('y', -height / 2)
    .style('fill', '#323232')
    .style('pointer-events', 'all');

var container = svg.append('g');

//http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var sunD3 = container
    .append('circle')
    .attr('r', sun.radius / sunScale)
    .attr('cx', sunCenter[0])
    .attr('cy', sunCenter[1])
    .attr('fill', sun.color)
    .on("mouseover", function(d) {
        div.transition()
            .duration(100)
            .style("opacity", 0.9);
        div.html('Sun')
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });

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
var range = document.getElementById('range');
range.oninput = function(e) {
    clearInterval(interval);
    if (range.value <= 100) {
        posTransition = [];
        for (var p in planets) {
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale));
            orbitsD3[p].attr('cx', offset[p](range.value) / distanceScale + sunCenter[0])
                .attr('rx', majorAxis[p](range.value) / distanceScale)
                .attr('ry', minorAxis[p](range.value) / distanceScale);
            var planet = container.select('#' + planets[p].name);
            planet.attr('r', scale[p](range.value) / sizeScale);
        }
        sunD3.attr('r', sun.radius / sunResize(range.value));
        animate();
    } else if (range.value > 100 && range.value < 175 && angleTransition.length > 0) {
        for (var p in planets) {
            //console.log(angleTransition[p](range.value), "this");
            orbitsD3[p].attr('stroke-opacity', alpha(range.value));
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(angleTransition[p](range.value))) / distanceScale))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(angleTransition[p](range.value))) / distanceScale));
        }
        sunD3.attr('r', sun.radius / sunResize(range.value));
        sunD3.attr('cx', sunShift(range.value));
    } else if (range.value >= 175) {
        for (var p in planets) {
            orbitsD3[p].attr('stroke-opacity', alpha(range.value));
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(2*Math.PI)) / distanceScale))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(2*Math.PI)) / distanceScale));
        }
        sunD3.attr('r', sun.radius / sunResize(range.value));
        sunD3.attr('cx', sunShift(range.value));
        //sunD3.attr('cx', );
    }


    if (range.value > 100 && posTransition.length === 0) {
        var positions = [
            [planetsD3[0].select('circle').attr('cx'), planetsD3[0].select('circle').attr('cy')],
            [planetsD3[1].select('circle').attr('cx'), planetsD3[1].select('circle').attr('cy')],
            [planetsD3[2].select('circle').attr('cx'), planetsD3[2].select('circle').attr('cy')],
            [planetsD3[3].select('circle').attr('cx'), planetsD3[3].select('circle').attr('cy')],
            [planetsD3[4].select('circle').attr('cx'), planetsD3[4].select('circle').attr('cy')],
            [planetsD3[5].select('circle').attr('cx'), planetsD3[5].select('circle').attr('cy')],
            [planetsD3[6].select('circle').attr('cx'), planetsD3[6].select('circle').attr('cy')],
            [planetsD3[7].select('circle').attr('cx'), planetsD3[7].select('circle').attr('cy')]
        ];
        angleTransition = setTransitFunction(positions);
    }
};

animate();
//equidistant = true;
//reScale();
