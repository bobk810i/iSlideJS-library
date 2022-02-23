const defaults = {
    indicator_radius: 20, //DONE
    bar_radius: 20, //DONE
    position: 'left', //DONE
    dividers: 'vertical', //DONE
    icons_size: 20, //DONE
    background_width: 'auto', //DONE
    z_index: 3, //DONE
    animation_speed: 0.2, //DONE
    smooth_scrolling: 'auto', //DONE
    scrolling_offset: 0, //DONE
    selection_range: [-10, 400], //DONE
    //Colors
    bar_color: 'transparent', //DONE
    background_color: 'transparent', //DONE
    icons_color: '#000000', //DONE
    icons_active_color: '#ffffff', //DONE
    indicators_color: 'transparent', //DONE
    indicators_active_color: '#000000', //DONE
    dividers_color: '#000000', //DONE
}

// TODO:

const defaultDivider = [3, 20] //width, height

class iSlide {
    constructor(objectClass, options){
        this.objectClass = objectClass;
        this.options = options;
        this.icons_sliders = []; // icons and stop objects matched together - global variable
        this.background = null;
        this.position = null;
        this.slideStatus = true;
        this.slideButtonClass = null;
        this.#scrollOnRefresh();
    }

    #findIcon(stopPoint){
        let icon = null;
        this.icons_sliders.forEach((matchPoint)=>{
            if(matchPoint[0] == stopPoint){
                icon = matchPoint[1];
            }
        })
        return icon;
    }

    #matchIcons(stopPoints){
        let list = [];
        stopPoints.forEach((point)=>{
            let nameAttribute = point.getAttribute('data-islide-name');
            let icon = document.getElementById(nameAttribute);
            list.push([point, icon]); // match point and icon
        })
        return list;
    }

    #getOffsetTop(element){ // returns top offset of the element
        let offset_top = element.getBoundingClientRect().top;
        return offset_top;
    }

    #scrollOnRefresh(){ // to move page and set current selection
        window.scrollBy(0, 1);
    }

    #scrollEffect(){ // icons selecting when on the screen
        let sliderStopList = [];
        if(this.options.icons != undefined){ // check if icons are defined
            Object.entries(this.options.icons).forEach((element)=>{ // List through icons to find their names and match them with data-islide-name attribute
                let dataName = element[0];
                let htmlObject = document.querySelector(`[data-islide-name = ${dataName}]`);
                sliderStopList.push(htmlObject);
            })
            document.addEventListener('scroll', (e)=>{ // scroll event to highlight icons
                sliderStopList.forEach((stopElement)=>{
                    let offset = this.#getOffsetTop(stopElement);
                    let icon = this.#findIcon(stopElement); // find an icon to the indicator
                    if(this.options.selection_range != undefined){ // check for the options range
                        
                    }else{
                        if(offset >= defaults.selection_range[0] && offset <= defaults.selection_range[1]){ // set highlight colors
                            // Set icon and indicator active
                            if(this.icons_active_color != undefined){ // check for the options icons_active_color
                                icon.style.color = this.options.icons_active_color;
                            }else{
                                icon.style.color = defaults.icons_active_color;
                            }

                            if(this.options.indicators_active_color != undefined){ // check for the options indicators_active_color
                                icon.style.backgroundColor = this.options.indicators_active_color;
                            }else{
                                icon.style.backgroundColor = defaults.indicators_active_color;
                            }

                        }else{
                            if(this.options.indicators_color != undefined){ // check for the options icons_color
                                icon.style.backgroundColor = this.options.indicators_color;
                            }else{
                                icon.style.backgroundColor = defaults.indicators_color;
                            }

                            if (this.options.icons_color != undefined){ /// check for the options indicators_color
                                icon.style.color = this.options.icons_color;
                            }else{
                                icon.style.color = defaults.icons_color;
                            }
                        }
                    }
                })
            })
        }
    }

    #scrollOnCLick(){
        this.icons_sliders.forEach((iconMatch)=>{
            iconMatch[1].addEventListener('click', (e)=>{
                let htmlWindowPosition = this.#getOffsetTop(document.querySelector('html')); // top offset of the html position
                let elementOffset = (-htmlWindowPosition) + this.#getOffsetTop(iconMatch[0]);
                if(this.options.scrolling_offset != undefined){ //check for the offset top option
                    let scrollPosition = elementOffset - this.options.scrolling_offset;
                    window.scrollTo(0, scrollPosition);
                }else{
                    let scrollPosition = elementOffset - defaults.scrolling_offset;
                    window.scrollTo(0, scrollPosition);
                }
            })
        })
    }

    #hideBar(position){
        switch(position){
            case 'left':
                this.background.style.transform = `translateX(${-this.background.offsetWidth}px)`;
                break;
            case 'right':
                this.background.style.transform = `translateX(${this.background.offsetWidth}px)`;
                break;
            case 'top':
                this.background.style.transform = `translateY(${-this.background.offsetHeight}px)`;
                break;
            case 'bottom':
                this.background.style.transform = `translateY(${this.background.offsetHeight}px)`;
                break;
        }
        this.slideStatus = false;
    }

    #showBar(position){
        if(position == 'left' || position == 'right'){
            this.background.style.transform = `translateX(0px)`;
        }else{
            this.background.style.transform = `translateY(0px)`;
        }
        this.slideStatus = true;
    }

    mount(){ // main initialization function
        if(this.options != undefined){ // Check if options exsist
            if(this.options.icons != undefined){ // Check if icons exsist (options, icons - two core elements)
                // Create background
                let slider_background = document.createElement('div'); // Create element
                slider_background.classList.add('iSlide-slider-background'); // Add class
                if(this.options.animation_speed != undefined){ // Add animation with animation speed
                    slider_background.style.transition = `${this.options.animation_speed}s ease`;
                }else{
                    slider_background.style.transition = `${defaults.animation_speed}s ease`;
                }
                // Create bar
                let slider_bar = document.createElement('div'); // Create element
                slider_bar.classList.add('iSlide-slider-bar'); // Add class
                slider_background.appendChild(slider_bar); // Append to prevoius element
                // Create icons and dividers
                let slider_points = [];
                Object.entries(this.options.icons).forEach((element)=>{ // List through stop points which have matching options icons names
                    let dataName = element[0];
                    let htmlObject = document.querySelector(`[data-islide-name = ${dataName}]`);
                    slider_points.push(htmlObject);
                })
                slider_points.forEach((point)=>{
                    let point_name = point.getAttribute('data-islide-name');
                    let icon = this.options.icons[point_name];
                    let newIcon = document.createElement('i'); // Create element
                    newIcon.classList.add('material-icons'); // Add class
                    newIcon.classList.add('islide-slider-indicator'); // Add class
                    newIcon.innerHTML = icon; // Set icon
                    newIcon.id = point_name; // set id same as point name

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
                this.background = slider_background; // add background to the global variable

                // Set global variable - match icons with stopPoints
                this.icons_sliders = this.#matchIcons(slider_points);

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
                            this.position = 'left'; // Set position variable
                            break;
                        case 'right':
                            slider_background.style.top = 0;
                            slider_background.style.right = 0;
                            slider_background.style.height = '100vh';
                            slider_background.style.width = 'auto';
                            slider_bar.style.flexDirection = 'column';
                            this.position = 'right'; // Set position variable
                            break;
                        case 'top':
                            slider_background.style.top = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = 'auto';
                            slider_background.style.width = '100vw';
                            slider_bar.style.flexDirection = 'row';
                            this.position = 'top'; // Set position variable
                            break;
                        case 'bottom':
                            slider_background.style.bottom = 0;
                            slider_background.style.left = 0;
                            slider_background.style.height = 'auto';
                            slider_background.style.width = '100vw';
                            slider_bar.style.flexDirection = 'row';
                            this.position = 'bottom'; // Set position variable
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
                    this.position = 'left'; // Set position variable
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

                if(this.options.smooth_scrolling != undefined){
                    let html = document.querySelector('html');
                    switch(this.options.smooth_scrolling){
                        case true:
                            html.style.scrollBehavior = 'smooth';
                            break;
                        default:
                            html.style.scrollBehavior = defaults.smooth_scrolling;
                    }
                }else{
                    let html = document.querySelector('html');
                    html.style.scrollBehavior = defaults.smooth_scrolling;
                }

                // Colors
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
        // Run scrolling effect function after mounting
        this.#scrollEffect();
        // Run scroll on click function
        this.#scrollOnCLick();
        // Move a page a bit to refresh listeners
        this.#scrollOnRefresh();
    }

    delete(){ // delete method to remove object
        let islideObject = document.querySelector(this.objectClass);
        islideObject.innerHTML = '';
        this.delete;
    }

    update(){ // update islide
        let islideObject = document.querySelector(this.objectClass);
        islideObject.innerHTML = ''; // clear islide container
        this.mount();
    }

    sliding(objectClass, hide){ // enable sliding
        let button = document.querySelector(objectClass);
        if(this.options.position != undefined){
            switch(this.options.position){
                case 'left':
                    button.addEventListener('click', (e)=>{
                        if(this.slideStatus == true){
                            this.#hideBar('left');
                        }else{
                            this.#showBar('left');
                        }
                    })
                    break;
                case 'right':
                    button.addEventListener('click', (e)=>{
                        if(this.slideStatus == true){
                            this.#hideBar('right');
                        }else{
                            this.#showBar('right');
                        }
                    })
                    break;
                case 'top':
                    button.addEventListener('click', (e)=>{
                        if(this.slideStatus == true){
                            this.#hideBar('top');
                        }else{
                            this.#showBar('top');
                        }
                    })
                    break;
                case 'bottom':
                    button.addEventListener('click', (e)=>{
                        if(this.slideStatus == true){
                            this.#hideBar('bottom');
                        }else{
                            this.#showBar('bottom');
                        }
                    })
                    break;
                default: // default position 'left'
                    button.addEventListener('click', (e)=>{
                        if(this.slideStatus == true){
                            this.#hideBar('left');
                        }else{
                            this.#showBar('left');
                        }
                    })
            }
        }else{ // default position 'left'
            button.addEventListener('click', (e)=>{
                if(this.slideStatus == true){
                    this.#hideBar('left');
                }else{
                    this.#showBar('left');
                }
            })
        }

        if(hide != undefined){ // load hided option
            if(hide){ // hide on load activated if there is 'hide' option and it's true
                this.#hideBar(this.position);
            }
        }

        //Auto hide
        if(this.options.auto_hide != undefined){// Auto hide event listener
            let html = document.querySelector('html');
            html.addEventListener('click', (e)=>{
                let clickObject = e.target.classList;
                let newName = objectClass.replace('.', '');
                if(clickObject.contains('iSlide-slider-background') == false && clickObject.contains(newName) == false){ // check if clicked element is not our background or if element is not a button
                    this.#hideBar(this.position); // close bar
                }
            })
        }
    }

    // Event listeners
    click(icon, functionToActivate){ // click on the icon listener
        this.icons_sliders.forEach((iconSlider)=>{ // list all icons-sliders to find the right one
            if(iconSlider[0].getAttribute('data-islide-name') == icon){
                iconSlider[1].addEventListener('click', (e)=>{ // add event listener
                    functionToActivate(e);
                })
            }
        })
    }

    hover(icon, functionToActivate){ // hover over the icon listener
        this.icons_sliders.forEach((iconSlider)=>{ // list all icons-sliders to find the right one
            if(iconSlider[0].getAttribute('data-islide-name') == icon){
                iconSlider[1].addEventListener('mouseover', (e)=>{ // add event listener
                    functionToActivate(e);
                })
            }
        })
    }

}