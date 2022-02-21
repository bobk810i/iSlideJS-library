const defaults = {
    indicator_radius: 20, //DONE
    bar_radius: 20, //DONE
    position: 'left',
    dividers: 'vertical', //DONE
    icons_size: 20, //DONE
    background_width: 'auto', //DONE
    auto_hide: false,
    z_index: 3, //DONE
    aniamtion_speed: 0.2, //s
    smooth_scrolling: true,
    selection_range: [-70, 100], //px //ZMIENIĆ NA POPRAWNE
    //Colors
    bar_color: '#cccccc', //DONE
    background_color: '#ffffff', //DONE
    icons_color: '#000000', //DONE
    icons_active_color: '#039dfc',
    indicators_color: '#ffffff', //DONE
    indicators_active_color: '#039dfc', //DONE
    dividers_color: '#000000', //DONE
}

const defaultDivider = [3, 20] //width, height

class iSlide {
    constructor(objectClass, options){
        this.objectClass = objectClass;
        this.options = options;
        this.demo(); // function initialization
    }
    demo(){ // function inside class
        document.addEventListener('scroll', (e)=>{
            console.log('scrolled');
        })
    }
    mount(){ // main initialization function
        if(this.options != undefined){ // Check if options exsist
            if(this.options.icons != undefined){ // Check if icons exsist (options, icons - two core elements)
                // Create background
                let slider_background = document.createElement('div'); // Create element
                slider_background.classList.add('iSlide-slider-background'); // Add class
                // Create bar
                let slider_bar = document.createElement('div'); // Create element
                slider_bar.classList.add('iSlide-slider-bar'); // Add class
                slider_background.appendChild(slider_bar); // Append to prevoius element
                // Create icons and dividers
                let slider_points = document.querySelectorAll('.iSlide'); // Select all elements with class "iSlide"
                slider_points.forEach((point)=>{
                    let point_name = point.getAttribute('data-islide-name');
                    let icon = this.options.icons[point_name];
                    let newIcon = document.createElement('i'); // Create element
                    newIcon.classList.add('material-icons'); // Add class
                    newIcon.classList.add('islide-slider-indicator'); // Add class
                    newIcon.innerHTML = icon; // Set icon

                    if(this.options.indicators_color != undefined){ // Adding background color from options
                        newIcon.style.backgroundColor = this.options.indicators_color;
                    }else{
                        newIcon.style.backgroundColor = defaults.indicators_color;
                    }

                    if (this.options.icons_color != undefined){ // Adding icons color from options
                        newIcon.style.color = this.options.icons_color;
                    }else{
                        newIcon.style.color = defaults.icons_color;
                    }

                    slider_bar.appendChild(newIcon); // Append icons to slider bar
                    let divider = document.createElement('div'); // Create element
                    divider.classList.add('islide-slider-divider'); // Add class
                    if(this.options.dividers_color != undefined){ // Dividers color from options
                        divider.style.backgroundColor = this.options.dividers_color;
                    }else{
                        divider.style.backgroundColor = defaults.dividers_color;
                    }
                    slider_bar.appendChild(divider); // Append icons to slider bar
                })
                // Delete last divider from bar
                slider_bar.removeChild(slider_bar.lastChild);

                // Add everything at the top of the objectClass from constructor
                let menuMountObject = document.querySelector(this.objectClass);
                menuMountObject.appendChild(slider_background);

                // Add styles (options)
                if(this.options.indicator_radius != undefined){
                    let icons = document.querySelectorAll('.islide-slider-indicator');
                    icons.forEach((icon)=>{
                        icon.style.borderRadius = this.options.indicator_radius + 'px';
                    })
                }else{
                    let icons = document.querySelectorAll('.islide-slider-indicator');
                    icons.forEach((icon)=>{
                        icon.style.borderRadius = defaults.indicator_radius + 'px';
                    })
                }

                if(this.options.bar_radius != undefined){
                    slider_bar.style.borderRadius = this.options.bar_radius + 'px';
                }else{
                    slider_bar.style.borderRadius = defaults.bar_radius + 'px';
                }

                if(this.options.position != undefined){
                    switch(this.options.position){
                        case 'left':
                            slider_background.style.top = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = '100vh';
                            slider_background.style.width = 'auto';
                            slider_bar.style.flexDirection = 'column';
                            break;
                        case 'right':
                            slider_background.style.top = 0;
                            slider_background.style.right = 0;
                            slider_background.style.height = '100vh';
                            slider_background.style.width = 'auto';
                            slider_bar.style.flexDirection = 'column';
                            break;
                        case 'top':
                            slider_background.style.top = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = 'auto';
                            slider_background.style.width = '100vw';
                            slider_bar.style.flexDirection = 'row';
                            break;
                        case 'bottom':
                            slider_background.style.bottom = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = 'auto';
                            slider_background.style.width = '100vw';
                            slider_bar.style.flexDirection = 'row';
                            break;
                        default: // default 'left'
                            slider_background.style.top = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = '100vh';
                            slider_background.style.width = 'auto';
                            slider_bar.style.flexDirection = 'column';
                            console.warn('iSlide wrong position name');
                    }
                }else{ // default 'left'
                    slider_background.style.top = 0;
                    slider_background.style.left = 0;
                    slider_background.style.height = '100vh';
                    slider_background.style.width = 'auto';
                    slider_bar.style.flexDirection = 'column';
                }

                if(this.options.dividers != undefined){
                    let dividers = document.querySelectorAll('.islide-slider-divider');
                    let size = []; // width, height
                    switch(this.options.dividers){
                        case 'vertical':
                            size[0] = defaultDivider[0] + 'px';
                            size[1] = defaultDivider[1] + 'px';
                            break;
                        case 'horizontal':
                            size[0] = defaultDivider[1] + 'px'; // Swap numbers
                            size[1] = defaultDivider[0] + 'px';
                            break;
                        case 'dot':
                            size[0] = defaultDivider[0] + 'px'; // The same numbers
                            size[1] = defaultDivider[0] + 'px';
                            break;
                        default: // vertical (in case)
                            size[0] = defaultDivider[0] + 'px';
                            size[1] = defaultDivider[1] + 'px';
                    }
                    dividers.forEach((divider)=>{
                        divider.style.width = size[0];
                        divider.style.height = size[1];
                    })
                }else{
                    let dividers = document.querySelectorAll('.islide-slider-divider');
                    dividers.forEach((divider)=>{
                        divider.style.width = defaultDivider[0] + 'px';
                        divider.style.height = defaultDivider[1] + 'px';
                    })
                }

                if(this.options.icons_size != undefined){
                    let icons = document.querySelectorAll('.islide-slider-indicator');
                    icons.forEach((icon)=>{
                        icon.style.fontSize = this.options.icons_size + 'px';
                    })
                }else{
                    let icons = document.querySelectorAll('.islide-slider-indicator');
                    icons.forEach((icon)=>{
                        icon.style.fontSize = defaults.icons_size + 'px';
                    })
                }

                // too complex i think
                // if(this.options.background_width != undefined){
                //     if(this.options.position == 'top' || this.options.position == 'bottom'){ // depending on the position
                //         slider_background.style.width = '100vw';
                //         slider_background.style.height = this.options.background_width;
                //     }else{
                //         slider_background.style.width = this.options.background_width;
                //         slider_background.style.height = '100vh';
                //     }
                // }else{
                //     if(this.options.position == 'left' || this.options.position == 'right'){ // depending on the position
                //         slider_background.style.width = '100vw';
                //         slider_background.style.height = this.options.background_width;
                //     }    
                // }

                if(this.options.z_index != undefined){
                    slider_background.style.zIndex = this.options.z_index;
                }else{
                    slider_background.style.zIndex = defaults.z_index;
                }

                if(this.options.background_shadow != undefined){
                    slider_background.style.boxShadow = this.options.background_shadow + 'px ' + this.options.background_shadow + 'px 10px rgba(0, 0, 0, 0.3)';
                }else{
                    slider_background.style.boxShadow = 'none';
                }

                //Colors
                if(this.options.bar_color != undefined){
                    slider_bar.style.backgroundColor = this.options.bar_color;
                }else{
                    slider_bar.style.backgroundColor = defaults.bar_color;
                }

                if(this.options.background_color != undefined){
                    slider_background.style.backgroundColor = this.options.background_color;
                }else{
                    slider_background.style.backgroundColor = defaults.background_color;
                }
                
                // ==========================================================
            }else{
                console.warn('iSlide icons not defined');
            }
        }else{
            console.warn('iSlide options not defined');
        }
    }
}

// function scrolling(){
//     window.scrollTo(0, 300);
//     console.log('done');
// }



// const stopElements = document.querySelectorAll('.iSlide');
// stopElements.forEach((element)=>{
//     console.log(element.getAttribute('data-islide-name')); // getting attribute
// })

// TODO 
// - SET GOOD DEFAULTS
// - selection range
// - animation speed
// - scrolling offset
// - auto hide