const markerOptions = ({fillColor, tier}) => ({ 
  radius: 6, 
  fillColor, 
  tier,
  color: "#666", 
  weight: 1, 
  opacity: 0.8, 
  fillOpacity: 0.7 });

const toolTip = name => L.tooltip({ opacity: 0.7 }).setContent(name);

const map = L.map('map', {
  zoom: 13, 
  minZoom: 13, 
  maxZoom: 18, 
  center: [48.858217, 2.274852], 
  maxBounds: L.latLngBounds(
    L.latLng(48.80993843039284,2.42069331467708), 
    L.latLng(48.90647632023956, 2.24692255999388)
  ) 
});

L.tileLayer('./1943mapdesat/{z}/{x}/{y}.png', {
  attribution: '<a href="http://map.princeton.edu/search/viewer/#/2A3A6937-9E78-4896-B594-F48FE1A492F9" target="_blank">1944, Great Britain War Office</a>, ℅ <a href="http://map.princeton.edu" target="_blank">Princeton Univ. Lib.</a>',
  tms: true,
  maxZoom: 18,
  maxNativeZoom: 16
}).addTo(map);

// regular and addition for type.

const additions = L.layerGroup(data.filter(e => e.type === "addition").map(element => 
  L.circleMarker(element.coordinates, markerOptions({fillColor: "#e41a1c", tier: element.rank})).bindPopup(`
    <h2>${element.name}</h2>
    <p>${element.addresses}</p>
    `).bindTooltip(toolTip(element.name))
));
additions.addTo(map);

console.log(additions);

const regulars = L.layerGroup(data.filter(e => e.type === "regular").map(element => 
  L.circleMarker(element.coordinates, markerOptions({ fillColor: "#377eb8", tier: element.rank} )).bindPopup(`
    <h2>${element.name}</h2>
    <p>${element.addresses}</p>
    `).bindTooltip(toolTip(element.name))
));
regulars.addTo(map);

const layers = [additions, regulars];

const handleTooltips = () => {
  layers.forEach( layer => {
    const features = Object.keys(layer._layers);
    features.forEach(feature => {
      if(map.getZoom() - layer._layers[feature].options.tier >= 13){
        layer._layers[feature].openTooltip();
      } else {
        layer._layers[feature].closeTooltip();
      }
    });
  });
};

map.on('zoomend', handleTooltips);

console.log(map.getZoom());

map.setZoom(14);
