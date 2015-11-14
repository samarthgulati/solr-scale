var calcScaleConfig = function() {
    var config = {};
    config.distanceScale = (2.1 * (toScale.planets[7].majorAxis + toScale.planets[7].offset + toScale.planets[7].radius)) / window.innerWidth;
    config.sunScale = config.sizeScale = config.distanceScale;
    config.timeScale = 1;
    config.year = 365;

    return config;
};

var toScale = {
    sun: {
        radius: 696342,
        color: "#F6C651"
    },
    planets: [{
        name: "Mercury",
        majorAxis: 115818100,
        minorAxis: 57909050,
        offset: 69816900,
        angle: 285.55,
        radius: 2439.7,
        color: "#C7B9B3",
        timePeriod: 0.240846,
        theta: 0,
        orbitColor: "#C7B9B3"
    }, {
        name: "Venus",
        majorAxis: 216416000,
        minorAxis: 108208000,
        offset: 108939000,
        angle: 94.13,
        radius: 6051.8,
        color: "#D97F86",
        timePeriod: 0.615198,
        theta: 0,
        orbitColor: "#D97F86"
    }, {
        name: "Earth",
        majorAxis: 299025000,
        minorAxis: 149598261,
        offset: 151930000,
        angle: 100.46,
        radius: 6371,
        color: "#598EBD",
        timePeriod: 1.000017421,
        theta: 0,
        orbitColor: "#598EBD"
    }, {
        name: "Mars",
        majorAxis: 455900000,
        minorAxis: 227939100,
        offset: 249200000,
        angle: 155.60,
        radius: 3389.5,
        color: "#A14631",
        timePeriod: 1.88,
        theta: 0,
        orbitColor: "#A14631"
    }, {
        name: "Jupiter",
        majorAxis: 1557094400,
        minorAxis: 778547200,
        offset: 816520800,
        angle: 104.92,
        radius: 69911,
        color: "#E8AF7B",
        timePeriod: 11.8618,
        theta: 0,
        orbitColor: "#E8AF7B"
    }, {
        name: "Saturn",
        majorAxis: 2866898739,
        minorAxis: 1433449370,
        offset: 1513325783,
        angle: 226.71,
        radius: 58232,
        color: "#DECD45",
        timePeriod: 29.4571,
        theta: 0,
        orbitColor: "#DECD45"
    }, {
        name: "Uranus",
        majorAxis: 5741342800,
        minorAxis: 2870671400,
        offset: 3006224700,
        angle: 11.93,
        radius: 25362,
        color: "#8798BB",
        timePeriod: 84.016846,
        theta: 0,
        orbitColor: "#8798BB"
    }, {
        name: "Neptune",
        majorAxis: 8997085300,
        minorAxis: 4498542600,
        offset: 4537580900,
        angle: 334.90,
        radius: 24622,
        color: "#84B9CD",
        timePeriod: 164.8,
        theta: 0,
        orbitColor: "#84B9CD"
    }],
    config: null,
    description: {
        title: "This, is our Solar System",
        intro: "At first sight, it might not look like it, but if it is drawn it to-scale, then this is the accurate depiction of its size, and the distance of planets from the Sun.",
        detail: ["The planets revolve around the Sun in an elliptical path, where Sun is at one of the focii of the ellipse.", "They are so far off in distance from the Sun, as compared to their size, that they cannot even be seen at this scale. Here, they are depicted with (equal size) circular outlines around them.", "An interesting thing to observe here is the distance of inner Rocky planets as compared to the outer ice/gas giants."],
        instruction: ["Go ahead and click on the Explore button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see the more conventional model depicted in books."]
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
    detail: ["As shown here, in print medium planets are generally depicted to be rotating in circular orbits around the Sun at equal distance from each other.", "Even though planet's size maybe proportional to each other, the scaling is not proportional to Sun's size in the depiction."],
    instruction: ["Go ahead and click on the Explore button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see to-scale model with respect to size."]
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
    instruction: ["Go ahead and click on the Explore button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see how the planets compare to life-size objects."]
};
var sizeSwap = {
    title: "Size Analogy",
    intro: "If the Sun was as \"tall\" as a 5 feet person, then each of the planets would be as big as:",
    detail: ["Mercury - Pearl","Venus - Ring","Earth - Marble","Mars - Rice grain","Jupiter - Cannon-ball","Saturn - Beach-hat","Uranus - Billiard-ball","Neptune - Snooker-ball","","PS: A billiard ball is slightly bigger than a snooker/pool ball"],
    instruction: ["Go ahead and click on the Explore button and explore this scale by scrolling to zoom and dragging to pan around.", "Once, you're done exploring, turn it back off and click the Next button below to see this size analogy with respect a distance analogy."]
};
var mapSwap = {
    title: "Distance Analogy",
    intro: "From our previous analogy, consider the Sun (a 5 feet tall person) at the center of the Michigan Stadium. Then the planet Mercury would be a pearl revolving around it at distance of about 250 yards, at the periphery of the Michigan Stadium.",
    detail: ["Similarly, Venus at size of Ring, at about 400ft would be revolving around the stadium parking lot.", "Earth as a Marble, would be around the Crisler Basketball arena at 544 ft.", "Mars as small as a Rice grain, will be around the S. Main Street", "These finish our inner Rocky planets. The outer gas and ice giants are way off beyond half a mile from the stadium","","Jupiter as a cannon ball shows up passing over Eibel field.","Saturn at about a mile away just passing over Law Quad.", "Uranus twice as far would be around UMHS", "Lastly, Neptune at 3 miles would be passing over School of Music in North Campus."],
    instruction: ["Go ahead and click on the Explore button and explore this scale by scrolling to zoom and dragging to pan around.", "Such is the power of Gravitation, a ball of diameter 5 feet can control a Snooker ball of 2 inches, 3 miles away. "]
};

var mapData = [/*{
    url: "img/map/10z.png",
    side: 3840,
    offset: 1920,
    zoom: 0
}, */{
    url: "img/map/11z.png",
    side: 3840,
    offset: 1920,
    zoom: 0
}, {
    url: "img/map/12z.png",
    side: 1920,
    offset: 960,
    zoom: 0
}, {
    url: "img/map/13z.png",
    side: 960,
    offset: 480,
    zoom: 0
}, {
    url: "img/map/14z.png",
    side: 480,
    offset: 240,
    zoom: 0
}, {
    url: "img/map/15z.png",
    side: 240,
    offset: 120,
    zoom: 0
}, {
    url: "img/map/16z.png",
    side: 120,
    offset: 60,
    zoom: 0
}, {
    url: "img/map/17z.png",
    side: 60,
    offset: 30,
    zoom: 0
}, {
    url: "img/map/18z.png",
    side: 30,
    offset: 15,
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