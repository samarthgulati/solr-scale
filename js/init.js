var states = [toScale, equidistant, size, size, toScale];
var s = 0;
var planetsD3 = [];
var orbitsD3 = [];
var sunD3;
var scriptState = 1;
var mapIdx = 0;
var prevZoom = 1;
var scriptEl = document.getElementById('script');
var range = document.getElementById('range');
var sunScale = d3.scale.linear().domain([0, 50, 100, 150, 165, 180, 200]).range([states[0].config.sunScale, states[1].config.sunScale, states[2].config.sunScale, states[3].config.sunScale, states[1].config.sunScale, states[1].config.sunScale, states[4].config.sunScale]);
var distanceScale = d3.scale.linear().domain([0, 50, 75, 100, 150, 165, 180, 200]).range([states[0].config.distanceScale, states[1].config.distanceScale, states[1].config.distanceScale, states[2].config.distanceScale, states[3].config.distanceScale, states[1].config.distanceScale, states[1].config.distanceScale, states[4].config.distanceScale]);
var sizeScale = d3.scale.linear().domain([0, 50, 100, 150, 165, 180, 200]).range([states[0].config.sizeScale, states[1].config.sizeScale, states[2].config.sizeScale, states[3].config.sizeScale, states[1].config.sizeScale, states[1].config.sizeScale, states[4].config.sizeScale]);

var year = states[0].config.year;
var timeScale = states[0].config.timeScale;

//http://res.freestockphotos.biz/pictures/8/8999-a-marble-isolated-on-a-white-background-pv.jpg
//https://upload.wikimedia.org/wikipedia/commons/1/11/Snooker_Touching_Ball_Red.png
//https://upload.wikimedia.org/wikipedia/commons/7/78/8_ball_face.jpg
//https://c2.staticflickr.com/8/7623/16937042916_1f0d5765c5_b.jpg
//https://upload.wikimedia.org/wikipedia/commons/7/79/Cannonball_equiped_with_winglets_for_rifled_cannons_circa_1860.jpg
//http://orig07.deviantart.net/c3e5/f/2013/264/f/a/fb213j_tungsten_rings_1__14090_zoom_by_tungstenrepublic-d6naice.jpg
//https://pixabay.com/static/uploads/photo/2012/02/22/09/16/rice-15276_640.jpg

var imgUrl = ['img/pearl.png',
    'img/ring.png',
    'img/marble.png',
    'img/rice-grain.png',
    'img/cannon-ball.png',
    'img/beach-hat.png',
    'img/billiard-ball.png',
    'img/snooker-ball.png'
];

var sunImgUrl = 'img/5ft.png';

var addPlanet = function(p, idx) {
    planetsD3[idx] = container.append('g');
    planetsD3[idx]
        .append('circle')
        .attr('r', p.radius / sizeScale(range.value))
        .attr('cx', p.offset / distanceScale(range.value) + sunCenter[0] + ((p.majorAxis * Math.cos(p.angle)) / distanceScale(range.value)))
        .attr('cy', sunCenter[1] + ((p.minorAxis * Math.sin(p.angle)) / distanceScale(range.value)))
        .attr('fill', p.color)
        .attr('id', p.name);
    planetsD3[idx]
        .append('circle')
        .attr('r', 10)
        .attr('cx', p.offset / distanceScale(range.value) + sunCenter[0] + ((p.majorAxis * Math.cos(p.angle)) / distanceScale(range.value)))
        .attr('cy', sunCenter[1] + ((p.minorAxis * Math.sin(p.angle)) / distanceScale(range.value)))
        .attr('stroke', p.color)
        .attr('stroke-width', 2)
        .attr('id', p.name + '-orbit')
        .attr('fill', 'none');
    planetsD3[idx]
        .append('image')
        .attr('x', planetsD3[i].select('circle').attr('cx') - planetsD3[i].select('circle').attr('r'))
        .attr('y', planetsD3[i].select('circle').attr('cy') - planetsD3[i].select('circle').attr('r'))
        .attr('height', 2 * planetsD3[i].select('circle').attr('r'))
        .attr('width', 2 * planetsD3[i].select('circle').attr('r'))
        .attr('xlink:href', imgUrl[i])
        .attr('opacity', 0)
        .attr('id', planets[i].name + '-img');
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
        .attr('cx', p.offset / distanceScale(range.value) + sunCenter[0])
        .attr('cy', sunCenter[1])
        .attr('rx', p.majorAxis / distanceScale(range.value))
        .attr('ry', p.minorAxis / distanceScale(range.value))
        .attr('stroke', p.color)
        .attr('stroke-width', 1)
        .attr('fill', 'none')
        .attr('class', 'orbit');
};

var svg = d3.select('#solr').attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g');

var rect = svg.append('rect')
    .attr('width', width * 4)
    .attr('height', height * 4)
    .attr('y', -height / 2)
    .attr('x', -width / 2)
    .style('fill', 'rgba(32,32,32,1)')
    .style('pointer-events', 'all');

var container = svg.append('g');

//http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

var mapBgd = container.append('image')
    .attr('xlink:href', mapData[mapIdx].url)
    .attr('height', mapData[mapIdx].side)
    .attr('width', mapData[mapIdx].side)
    .attr('x', sunCenter[0] - mapData[mapIdx].offset)
    .attr('y', sunCenter[1] - mapData[mapIdx].offset)
    .attr('opacity', 0);

var sunD3 = container.append('circle')
    .attr('r', sun.radius / sunScale(range.value))
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

var sunImg = container.append('image')
    .attr('xlink:href', sunImgUrl)
    .attr('height', 2*sun.radius / sunScale(range.value))
    .attr('width', 2*sun.radius / (sunScale(range.value)*2.55))
    .attr('opacity', 0);

for (var i in planets) {
    addPlanet(planets[i], i);
}

var createScript = function(d, i) {
    scriptState = i;
    var script = '';
    if (d.title.length > 0) {
        script = '<h2>' + d.title + '</h2>';
    }
    if (d.intro.length > 0) {
        script = script + '<p>' + d.intro + '</p>';
    }
    if (d.detail.length > 0) {
        for (var i in d.detail) {
            script = script + '<p>' + d.detail[i] + '</p>';
        }
        script = script + '</br>';
    }
    if (d.instruction.length > 0) {
        for (var i in d.instruction) {
            script = script + '<p>' + d.instruction[i] + '</p>';
        }
        script = script + '</br>';
    }
    return script;
};

if (scriptEl.innerHTML.length < 1) {
    scriptEl.innerHTML = createScript(toScale.description, 0);
}
