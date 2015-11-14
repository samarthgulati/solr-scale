var distance = [];

var scale = [];
var offset = [];
var majorAxis = [];
var minorAxis = [];

var interval;


var angleTransition = [];


for (var p in planets) {
    scale[p] = d3.scale.linear().domain([0, 50, 100, 150, 165, 200]).range([states[0].planets[p].radius, states[1].planets[p].radius, states[2].planets[p].radius, states[3].planets[p].radius, states[4].planets[p].radius, states[4].planets[p].radius]);
    offset[p] = d3.scale.linear().domain([0, 50, 100, 150, 200]).range([states[0].planets[p].offset, states[1].planets[p].offset, states[2].planets[p].offset, states[3].planets[p].offset, states[4].planets[p].offset]);
    minorAxis[p] = d3.scale.linear().domain([0, 50, 75, 100, 150, 200]).range([states[0].planets[p].minorAxis, states[1].planets[p].minorAxis, states[1].planets[p].minorAxis, states[2].planets[p].minorAxis, states[3].planets[p].minorAxis, states[4].planets[p].minorAxis]);
    majorAxis[p] = d3.scale.linear().domain([0, 50, 75, 100, 150, 200]).range([states[0].planets[p].majorAxis, states[1].planets[p].majorAxis, states[1].planets[p].majorAxis, states[2].planets[p].majorAxis, states[3].planets[p].majorAxis, states[4].planets[p].majorAxis]);
}

var planetAlpha = d3.scale.linear().domain([100, 150]).range([1, 0]);
var orbitAlpha = d3.scale.linear().domain([50, 100, 150, 165, 200]).range([1, 0, 0, 1, 1]);

var setTransitFunction = function() {

    for (var i in planets) {
        var theta = planets[i].theta + planets[i].angle;
        while (theta > 2 * Math.PI) {
            theta -= 2 * Math.PI;
        }
        angleTransition[i] = d3.scale.linear().domain([50, 75]).range([theta, 2 * Math.PI]);
    }
    return angleTransition;
};

var rangeChange = function() {
    clearInterval(interval);
    next.disabled = true;

    if (range.value == 0) {
        next.disabled = false;
    }

    if (range.value > 50 && angleTransition.length === 0) {
        angleTransition = setTransitFunction();
    }

    if (range.value <= 50) {
        if (range.value == 50) {
            next.disabled = false;
            scriptEl.innerHTML = createScript(equidistant.description, 1);
        } else if (scriptState !== 0) {
            scriptEl.innerHTML = createScript(toScale.description, 0);
        }

        for (var p in planets) {
            planetsD3[p].selectAll('circle')
                .attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale(range.value)));
            orbitsD3[p].attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0])
                .attr('rx', majorAxis[p](range.value) / distanceScale(range.value))
                .attr('ry', minorAxis[p](range.value) / distanceScale(range.value));
            var planet = container.select('#' + planets[p].name);
            planet.attr('r', scale[p](range.value) / sizeScale(range.value));
            planetsD3[p].select('image').attr('opacity', 0);
        }
        sunD3.attr('r', sun.radius / sunScale(range.value));
        rect.attr('fill-opacity', 1);
        animate();

    } else if (range.value > 50 && range.value <= 75 && angleTransition.length > 0) {
        if (scriptState !== 1) {
            scriptEl.innerHTML = createScript(equidistant.description, 1);
        }

        for (var p in planets) {
            orbitsD3[p].attr('stroke-opacity', orbitAlpha(range.value));
            planetsD3[p].selectAll('circle')
                .attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(angleTransition[p](range.value))) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(angleTransition[p](range.value))) / distanceScale(range.value)));
            planetsD3[p].select('image').attr('opacity', 0);
        }
        rect.attr('fill-opacity', 1);
    } else if (range.value > 75 && range.value <= 100 && angleTransition.length > 0) {
        if (range.value == 100) {
            next.disabled = false;
            scriptEl.innerHTML = createScript(size.description, 2);
        } else if (scriptState !== 1) {
            scriptEl.innerHTML = createScript(equidistant.description, 1);
        }

        for (var p in planets) {
            orbitsD3[p].attr('stroke-opacity', orbitAlpha(range.value));
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(0)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(0)) / distanceScale(range.value)));
            planetsD3[p].select('image').attr('opacity', 0);
        }
        sunD3.attr('r', sun.radius / sunScale(range.value));
        sunImg.attr('height', 2 * sun.radius / sunScale(range.value)).attr('width', 2 * sun.radius / (sunScale(range.value) * 2.55))
            .attr('x', sunCenter[0] - sun.radius / (sunScale(range.value) * 2.55))
            .attr('y', sunCenter[1] - sun.radius / sunScale(range.value));
        rect.attr('fill-opacity', 1);

    } else if (range.value > 100 && range.value <= 150 && angleTransition.length > 0) {
        if (range.value == 150) {
            next.disabled = false;
            scriptEl.innerHTML = createScript(sizeSwap, 3);
        } else if (scriptState !== 2) {
            scriptEl.innerHTML = createScript(size.description, 2);
        }
        for (var p in planets) {
            planetsD3[p].select('circle').attr('fill-opacity', planetAlpha(range.value));
            planetsD3[p].select('image')
                .attr('x', planetsD3[p].select('circle').attr('cx') - planetsD3[p].select('circle').attr('r'))
                .attr('y', planetsD3[p].select('circle').attr('cy') - planetsD3[p].select('circle').attr('r'))
                .attr('height', 2 * planetsD3[p].select('circle').attr('r'))
                .attr('width', 2 * planetsD3[p].select('circle').attr('r'))
                .attr('opacity', 1 - planetAlpha(range.value));
        }
        rect.attr('fill-opacity', 1);
        sunImg.attr('opacity', 1 - planetAlpha(range.value));

    } else if (range.value > 150 && range.value <= 165) {

        if (scriptState !== 3) {
            scriptEl.innerHTML = createScript(sizeSwap, 3);
        }

        for (var p in planets) {
            orbitsD3[p]
                .attr('rx', majorAxis[p](range.value) / distanceScale(range.value))
                .attr('ry', minorAxis[p](range.value) / distanceScale(range.value))
                .attr('stroke-opacity', orbitAlpha(range.value));
            planetsD3[p].select('image').attr('width', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('height', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('x', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(0)) / distanceScale(range.value)))
                .attr('y', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(0)) / distanceScale(range.value)));
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(0)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(0)) / distanceScale(range.value)));
        }
        sunImg.attr('height', 2 * sun.radius / sunScale(range.value)).attr('width', 2 * sun.radius / (sunScale(range.value) * 2.55))
            .attr('x', sunCenter[0] - sun.radius / (sunScale(range.value) * 2.55))
            .attr('y', sunCenter[1] - sun.radius / sunScale(range.value));
        sunD3.attr('r', sun.radius / sunScale(range.value));
    } else if (range.value > 165 && range.value <= 180) {
        if (scriptState !== 3) {
            scriptEl.innerHTML = createScript(sizeSwap, 3);
        }
        for (var p in planets) {
            planetsD3[p].select('image').attr('width', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('height', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('x', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(0)) / distanceScale(range.value)))
                .attr('y', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(0)) / distanceScale(range.value)));
            planetsD3[p].selectAll('circle').attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(0)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(0)) / distanceScale(range.value)));

        }
        sunD3.attr('r', sun.radius / sunScale(range.value));
        sunImg.attr('height', 2 * sun.radius / sunScale(range.value)).attr('width', 2 * sun.radius / (sunScale(range.value) * 2.55))
            .attr('x', sunCenter[0] - sun.radius / (sunScale(range.value) * 2.55))
            .attr('y', sunCenter[1] - sun.radius / sunScale(range.value));
    } else if (range.value > 180 && range.value <= 200) {
        if (mapBgd.attr('opacity') > 0) {
            mapBgd.attr('opacity', 0);
        }
        if (next.style.visibility==='hidden') {
          next.style.visibility = visibile;
        }
        if (range.value == 200) {
            scriptEl.innerHTML = createScript(mapSwap, 2);
            mapBgd.attr('opacity', 0.5);
            next.style.visibility = 'hidden';
        } else if (scriptState !== 3) {
            scriptEl.innerHTML = createScript(sizeSwap, 3);
        }
        for (var p in planets) {
            planetsD3[p].selectAll()
                .attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale(range.value)));
            orbitsD3[p].attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0])
                .attr('rx', majorAxis[p](range.value) / distanceScale(range.value))
                .attr('ry', minorAxis[p](range.value) / distanceScale(range.value))
                .attr('stroke-opacity', orbitAlpha(range.value));

            planetsD3[p].select('image').attr('width', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('height', 2 * scale[p](range.value) / sizeScale(range.value))
                .attr('x', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale(range.value)))
                .attr('y', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale(range.value)));
        }

        sunD3.attr('r', sun.radius / sunScale(range.value));
        sunImg.attr('height', 2 * sun.radius / sunScale(range.value)).attr('width', 2 * sun.radius / (sunScale(range.value) * 2.55))
            .attr('x', sunCenter[0] - sun.radius / (sunScale(range.value) * 2.55))
            .attr('y', sunCenter[1] - sun.radius / sunScale(range.value));
        animate();
    }

};

range.oninput = function(e) {
    rangeChange();
};
