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
    angle: 334.90,
    radius: 24622,
    color: "#84B9CD",
    timePeriod: 164.8,
    theta: 0
}];

var sunCenter = [window.innerWidth / 2, window.innerWidth / 4];

var margin = {
        top: -5,
        right: -5,
        bottom: -5,
        left: -5
    },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;