let myMap;
const init = () => {
    myMap = new ymaps.Map("map", {
        center: [51.530777, 46.035694],
        zoom: 11,
        controls: [],
    });

    let coords = [
        [51.550777, 46.055694],
        [51.540777, 46.075694],
        [51.530777, 46.045694],
        [51.479213, 46.085694],
    ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: './img/decor/marker.png',
            iconImageSize: [46, 57],
            iconImageOffset: [-35, -52]
        });

    for (let i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);
