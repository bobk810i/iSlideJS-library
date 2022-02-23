var options = {
    indicator_radius: 40,
    bar_radius: 40,
    dividers: 'dot',
    icons_size: 30,
    z_index: 2,
    smooth_scrolling: true,
    auto_hide: false,
    scrolling_offset: 50,
    background_color: '#ff99e6',
    icons: {
        section1: 'air',
        section2: 'portrait',
        section3: 'landscape',
        section4: 'close',
    },
}

let obiekt = new iSlide('.demoMenuObject', options);

obiekt.mount();

obiekt.sliding('.clickButton', false);


// obiekt.hover('section1', (e)=>{
//     console.log('clicked worked!');
//     console.log(e);
// })

// No need to put "iSlide" class on elements - just the data-islide-name

function changeSettings(){
    
}