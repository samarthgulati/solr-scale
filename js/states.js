var sunCenter = [window.innerWidth / 2, window.innerWidth / 4];

var margin = {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

var calcScaleConfig = function() {
    var config = {};
    config.distanceScale = (2.1 * (toScale.planets[7].majorAxis + toScale.planets[7].offset + toScale.planets[7].radius)) / window.innerHeight;
    config.sunScale = config.sizeScale = config.distanceScale;
    config.timeScale = 1;
    config.year = 365;

    return config;
};

var toScale = {
    sun: sun,
    planets: planets,
    config: null,
    description: {
        title: "This, is our Solar System",
        intro: "At first sight, it might not look like it, but if it is drawn it to-scale, then this is the accurate depiction of its size, and the distance of planets from the Sun.",
        detail: ["The planets revolve around the Sun in a slightly elliptical path, where Sun is at one of the focii of the ellipse. If you zoom in further enough, you can observe that Sun is not at the center.", "The planets are so far off in distance from the Sun, as compared to their size, that they cannot even be seen at this scale. Here, they are depicted with (equal size) circular outlines around them.", "An interesting thing to observe here is the distance of inner Rocky planets as compared to the Outer ice/gas giants. The inner planets group together in the center tightly around the Sun, where as the huge outer planets are spaced out from the Sun."],
        instruction: ["Go ahead and click on the Pan & Zoom toggle button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see the more conventional model depicted in books."]
    }
};

toScale.config = calcScaleConfig();



var equidistant = JSON.parse(JSON.stringify(toScale));

for (var i in equidistant.planets) {
    equidistant.planets[i].offset = 0;
    if (i < 1) {
        equidistant.planets[i].minorAxis = 1500000000;
        equidistant.planets[i].majorAxis = equidistant.planets[i].minorAxis;
    } else {
        equidistant.planets[i].minorAxis = equidistant.planets[i - 1].minorAxis + 1350000000;
        equidistant.planets[i].majorAxis = equidistant.planets[i].minorAxis;
    }
}

var calcEqConfig = function() {
    var config = {};
    config.distanceScale = (4 * equidistant.planets[7].majorAxis) / window.innerWidth;
    var distBwBigPx = (equidistant.planets[5].majorAxis - equidistant.planets[4].majorAxis) / config.distanceScale;
    var radSumBig = equidistant.planets[5].radius + equidistant.planets[4].radius;
    config.sizeScale = (1.2 * radSumBig) / distBwBigPx;
    config.sunScale = (2 * equidistant.sun.radius) / ((equidistant.planets[0].radius / config.sizeScale) + (equidistant.planets[0].majorAxis / config.distanceScale));

    config.timeScale = 1;
    config.year = 365;

    return config;

};

equidistant.description = {
    title: "\"Print model\" of Solar System",
    intro: "To accomodate the Solar system in the print medium, publishers have to compromise accuracy for legibility.",
    detail: ["As shown here, in print medium planets are generally depicted to be revolving in circular orbits around the Sun at equal distance from each other.", "Even though planet's size maybe proportional to each other, the scaling is not proportional to Sun's size in the depiction."],
    instruction: ["Go ahead and click on the Pan & Zoom toggle button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see to-scale model with respect to size."]
};

equidistant.config = calcEqConfig();



var size = JSON.parse(JSON.stringify(equidistant));

var diaSum = 2 * size.sun.radius;

for (var i in size.planets) {
    size.planets[i].angle = 0;
    size.planets[i].theta = 0;
    diaSum += 2 * size.planets[i].radius;
}

size.sun.offset = 0;

var calcSzConfig = function() {
    var config = {};
    config.sizeScale = (2 * diaSum) / window.innerWidth;
    config.sunScale = config.distanceScale = config.sizeScale;

    config.timeScale = 1;
    config.year = 365;

    return config;

};

size.config = calcSzConfig();

var distBwEach = (diaSum / size.config.sizeScale) / 25;

// diaSum/config.sizeScale is the extra space, we take half of it, 
// 8 planets + Sun + left margin = 10

size.sun.offset = (window.innerWidth / 2) - distBwEach;

for (var i in size.planets) {
    if (i < 1) {
        size.planets[i].majorAxis = size.planets[i].radius + distBwEach * size.config.sunScale + sun.radius;
    } else {
        size.planets[i].majorAxis = size.planets[i].radius + size.planets[i - 1].majorAxis + distBwEach * size.config.sunScale;
    }

}

size.description = {
    title: "Size comparison",
    intro: "Here, the Sun and all the planets are scaled down proportionally and are placed horizontally aligned at equal distance from each other.",
    detail: [""],
    instruction: ["Go ahead and click on the Pan & Zoom toggle button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see how the planets compare to life-size objects."]
};
var sizeSwap = {
    title: "Size Analogy",
    intro: "If the Sun was as \"tall\" as a 5 feet person, then each of the planets would be as big as:",
    detail: ["Mercury - Pearl","Venus - Ring","Earth - Marble","Mars - Rice grain","Jupiter - Cannon-ball","Saturn - Beach-hat","Uranus - Billiard-ball","Neptune - Snooker-ball","","PS: A billiard ball is slightly bigger than a snooker/pool ball"],
    instruction: ["Go ahead and click on the Pan & Zoom toggle button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see this size analogy with respect a distance analogy."]
};
var mapSwap = {
    title: "Distance Analogy",
    intro: "From our previous analogy, consider the Sun (a 5 feet tall person) at the center of the Michigan Stadium. Then the planet Mercury would be a pearl revolving around it at distance of about 70 yards, at the periphery of the field.",
    detail: ["- Similarly, Venus at size of a ring, at about 400ft would be revolving around the Stadium's press box seating.", "- Earth as a Marble, would be around the stadium parking lot arena at 540 ft.", "- Mars as small as a Rice grain, will be around the Crisler Basketball arena", "These finish our inner Rocky planets. The outer gas and ice giants are way off beyond half a mile from the stadium","","- Jupiter as a cannon ball shows up passing beyond the Yost Ice Arena.","- Saturn at about a mile away just passing over Hatcher Library.", "- Uranus twice as far would be around UMHS", "- Lastly, Neptune at 3 miles would be passing over Northwood III in North Campus."],
    instruction: ["Go ahead and click on the Pan & Zoom toggle button and explore this scale by scrolling to zoom and dragging to pan around.", "Such is the power of Gravitation, a ball of diameter 5 feet can control a Snooker ball of 2 inches, 3 miles away. "]
};

var mapData = [/*{
    url: "img/map/10z.png",
    side: 3840,
    offset: 1920,
    zoom: 0
}, */{
    url: "img/map/11z.png",
    side: 2560,
    offset: 1280,
    zoom: 0
}, {
    url: "img/map/12z.png",
    side: 1280,
    offset: 640,
    zoom: 0
}, {
    url: "img/map/13z.png",
    side: 640,
    offset: 320,
    zoom: 0
}, {
    url: "img/map/14z.png",
    side: 320,
    offset: 160,
    zoom: 0
}, {
    url: "img/map/15z.png",
    side: 160,
    offset: 80,
    zoom: 0
}, {
    url: "img/map/16z.png",
    side: 80,
    offset: 40,
    zoom: 0
}, {
    url: "img/map/17z.png",
    side: 40,
    offset: 20,
    zoom: 0
}, {
    url: "img/map/18z.png",
    side: 20,
    offset: 10,
    zoom: 0
}];

var calcMapZoom = function() {
    for (var i in mapData) {
        mapData[i].zoom = window.innerWidth / mapData[i].side;
    }
};

var updateMapBgd = function() {
    mapBgd.attr('xlink:href', mapData[mapIdx].url)
        .attr('height', mapData[mapIdx].side)
        .attr('width', mapData[mapIdx].side)
        .attr('x', sunCenter[0] - mapData[mapIdx].offset)
        .attr('y', sunCenter[1] - mapData[mapIdx].offset);
};

calcMapZoom();