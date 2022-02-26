<img src="https://user-images.githubusercontent.com/70112799/155586547-842f3ffc-a45c-432f-ac18-0dbbc54a8ea3.png" style="width: 180px;"></img>

### iSlide JS - JavaScript ES6 sliding menu bar library.

## Getting started

Install the package from NPM...

```npm
npm i @bobk810i/islide-library
```

```html
<link
  rel="stylesheet"
  href="node_modules/@bobk810i/islide-library/iSlide/iSlide-style.css"
/>
<script src="node_modules/@bobk810i/islide-library/iSlide/iSlide-script.js"></script>
```

... or include files from CDN

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@bobk810i/islide-library@1.1.5/iSlide/iSlide-style.css"
/>
<script src="https://cdn.jsdelivr.net/npm/@bobk810i/islide-library@1.1.4/iSlide/iSlide-script.js"></script>
```

Create a `div` at the beginning of the `body` section with a specyfied _class_ or _id_:

```html
<div id="iSlide"></div>
```

Add **points** to the menu by adding `data-islide-name="<name>"` to the html elements:

```html
<section id="section_1" data-islide-name="menuElement1">
  <!-- Section content -->
</section>

<section id="section_2" data-islide-name="menuElement2">
  <!-- Section content -->
</section>
```

Specify the iSlide options - _more info below_

Initialize and mount iSlide object:

```js
const menu = new iSlide("#iSlide", options);
menu.mount();
```

## Documentation

**Documentation website** - comming soon...

### Options:

Options object example:

```js
const options = {
    bar_color: '#ff99ff',
    smooth_scroll: true,
    icons_size: 30,
    icons: {
        menuElement1: 'settings',
        menuElement2: 'info',
        ...
    }
    ...
}
```

Avalible options:

Sizing:

- `indicator_radius: [number]` - icon indicators border radius [default: 20]
- `bar_radius: [number]` - icons container (bar) border radius [default: 20]
- `icons_size: [number]` - icons size [default: 20]

Colors:

- `indicators_color: [string]` - indicators basic color [default: 'transparent']
- `indicators_active_color: [string]` - indicators active color [default: '#000000']
- `bar_color: [string]` - bar color [default: 'transparent']
- `icons_color: [string]` - icons basic color [default: '#000000']
- `icons_active_color: [string]` - icons basic color [default: '#ffffff']
- `background_color: [string]` - menu background color [default: 'transparent']
- `dividers_color: [string]` - indicator dividers color [default: '#000000']

Other:

- `position: [string]` - menu position (left,right,top,bottom) [default: 'left']
- `dividers: [string]` - shape of the dividers (horizontal,vertical,dot) [default: 'vertical']
- `z_index: [number]` - z-index of the menu [default: 3]
- `smooth_scrolling: [boolean]` - enable smooth scrolling to the elements (true) [default: false]
- `scrolling_offset: [number]` - scrolling offset (gap) left at the top [default: 0]
- `animation_speed: [number]` - menu sliding (described in _methods_ below) animation time [default: 0.2]
- **essential** `icons: [object]` - icons defining object (explained in _icons_ below)

### Icons:

It is **essential** to define `icons` object inside `options`.
Object construction:

```js
    const options = {
        <data-islide-name> : '< icon name >',
        ...
    }
```

Icon names:
Library is using [Google Icons](https://fonts.google.com/icons) free icons. Just type the name of the icon inside of `< icon name >` section.
Every `<data-islide-name>` point must have the icon!

### Methods:

- `.mount()` - initialization of the iSlide sliding menu
- `.delete()` - delete iSlide sliding menu
- `.update()` - update iSlide sliding menu after changing options
- `.sliding(<buttonClass>, <hideOnStart>)` - enable sliding mode (< buttonClass > - trigger button, < hideOnStart > - (true) menu hidden on page load)

### Event listeners:

- `.click(<data-islide-name>, function)` - run function after clicking on choosen icon
- `.hover(<data-islide-name>, function)` - run function after hovering over choosen icon

## Bug fix / Improvements

If you will find some bugs to fix, improvements to make or new features to add - feel free to write them in [Issues](https://github.com/bobk810i/iSlideJS-library/issues) tab.

## License

**GPL-3.0 License**
© Copyright 2022-present Jakub Kołodyński - Wszystkie prawa zastrzeżone/All Rights reserved
