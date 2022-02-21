const options = {
    indicator_radius: 40,
    bar_radius: 40,
    dividers: 'dot',
    icons_size: 30,
    position: 'left',
    z_index: 2,
    background_shadow: 5,
    icons: {
        section1: 'air',
        section2: 'portrait',
        section3: 'landscape',
        section4: 'close',
    },
}

let obiekt = new iSlide('.demoMenuObject', options);

obiekt.mount();
