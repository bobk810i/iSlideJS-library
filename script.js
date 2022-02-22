const options = {
    indicator_radius: 40,
    bar_radius: 40,
    dividers: 'dot',
    icons_size: 30,
    position: 'left',
    z_index: 2,
    smooth_scrolling: true,
    scrolling_offset: 50,
    icons: {
        section1: 'air',
        section2: 'portrait',
        section3: 'landscape',
        section4: 'close',
    },
}

let obiekt = new iSlide('.demoMenuObject', options);

obiekt.mount();

// No need to put "iSlide" class on elements - just the data-islide-name
