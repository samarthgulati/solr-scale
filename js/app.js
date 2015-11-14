//zoom pan : http://bl.ocks.org/mbostock/6123708

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 500])
    .on('zoom', zoomed);

var zoomOff = d3.behavior.zoom()
    .on('zoom', null);

var drag = d3.behavior.drag()
    .origin(function(d) {
        return d;
    })
    .on('dragstart', dragstarted)
    .on('drag', dragged)
    .on('dragend', dragended);

var setStrokeWidths = d3.scale.pow().exponent(0.001).domain([1, 150, 500]).range([1, 0.01, 0.001]);
var setMapZoom = d3.scale.linear().domain([0.25, 500]).range([14.5, 25]);

function zoomed(e, t) {
    if (typeof e == 'undefined' && typeof e == 'undefined') {
        e = d3.event.scale;
        t = d3.event.translate;
        container.attr('transform', 'translate(' + t + ')scale(' + e + ')');
    } else {
        container.transition().duration(1000).ease('cubic-in-out').attr('transform', 'translate(' + t + ')scale(' + e + ')');
    }

    for (var p in planets) {
        orbitsD3[p].attr('stroke-width', setStrokeWidths(e));
        planetsD3[p].select('#' + planets[p].name + '-orbit')
            .attr('r', 10 * setStrokeWidths(e))
            .attr('stroke-width', 2 * setStrokeWidths(e));
    }

    if (range.value == 200) {
        zoom.center([sunCenter[0], sunCenter[1]]);
        if (mapIdx + 1 < mapData.length - 1 && prevZoom < e && e > mapData[mapIdx + 1].zoom) {
            mapIdx++;
            updateMapBgd();
            prevZoom = e;
        } else if (mapIdx > 0 && prevZoom > e && e < mapData[mapIdx].zoom) {
            mapIdx--;
            updateMapBgd();
            prevZoom = e;
        }
    }

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

var exploreBtn = document.getElementById('explore-toggle');
var explore = false;
exploreBtn.onclick = function(e) {
    explore = !explore;
    if (explore) {
        svg.call(zoom);
    } else {
        svg.call(zoomOff);
        zoomed(1, [0, 0]);
        mapIdx = 0;
        updateMapBgd(); 
    }
};

var rangeChangeDuration = 1000;
var rangeChangeAnimation = function(start, end) {
    if (end !== start) {

        var n = Math.abs(rangeChangeDuration / (end - start));

        var timer = setInterval(function() {
            if (end > start) {
                range.stepUp();
                rangeChange();
                if (range.value >= end) {
                    clearInterval(timer);
                }

            } else {
                range.stepDown();
                rangeChange();
                if (range.value <= end) {
                    clearInterval(timer);
                }
            }

        }, n);
    }
};

document.getElementById('toScale').onclick = function() {
    rangeChangeAnimation(range.value, 0);
};
document.getElementById('equidistant').onclick = function() {
    rangeChangeAnimation(range.value, 50);
};
document.getElementById('size').onclick = function() {
    rangeChangeAnimation(range.value, 100);
};
document.getElementById('swap').onclick = function() {
    rangeChangeAnimation(range.value, 150);
};
document.getElementById('map').onclick = function() {
    rangeChangeAnimation(range.value, 200);
};

document.getElementById('next').onclick = function() {
    if (range.value >= 0 && range.value < 50) {
        rangeChangeAnimation(range.value, 50);
    } else if (range.value >= 50 && range.value < 100) {
        rangeChangeAnimation(range.value, 100);
    } else if (range.value >= 100 && range.value < 150) {
        rangeChangeAnimation(range.value, 150);
    } else if (range.value >= 150 && range.value < 200) {
        rangeChangeAnimation(range.value, 200);
    }
};

document.getElementById('prev').onclick = function() {
    if (range.value > 0 && range.value <= 50) {
        rangeChangeAnimation(range.value, 0);
    } else if (range.value > 50 && range.value <= 100) {
        rangeChangeAnimation(range.value, 50);
    } else if (range.value > 100 && range.value <= 150) {
        rangeChangeAnimation(range.value, 100);
    } else if (range.value > 150 && range.value <= 200) {
        rangeChangeAnimation(range.value, 150);
    }
};

document.getElementById('reset').onclick = function() {
    rangeChangeAnimation(range.value, 0);
    next.style.visibility = 'visible';
};

var animate = function() {
    interval = setInterval(function() {
        for (var p in planetsD3) {
            planets[p].theta += Math.PI / ((year / timeScale) * planets[p].timePeriod);
            planetsD3[p].selectAll('circle')
                .attr('cx', offset[p](range.value) / distanceScale(range.value) + sunCenter[0] + ((majorAxis[p](range.value) * Math.cos(planets[p].angle + planets[p].theta)) / distanceScale(range.value)))
                .attr('cy', sunCenter[1] + ((minorAxis[p](range.value) * Math.sin(planets[p].angle + planets[p].theta)) / distanceScale(range.value)));
        }
    }, 60);
};

animate();