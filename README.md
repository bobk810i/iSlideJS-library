<img src="https://user-images.githubusercontent.com/70112799/155586547-842f3ffc-a45c-432f-ac18-0dbbc54a8ea3.png" style="width: 180px;"></img>

### iSlide JS - JavaScript ES6 sliding menu bar library.

## Getting started

Download **iSlide** folder from this repository.
Include `js` and `css` file inside your HTML.

```html
<!-- Head section -->
<link rel="stylesheet" href="/iSlide/iSlide-style.css" />

<!-- Script section -->
<script src="/iSlide/iSlide-script.js"></script>
```

Create a `div` inside `body` section with a specyfied _class_ or _id_:

```html
<div id="iSlide"></div>
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
    ...
}
```

Avalible options:

- `option1: [string]` - demo

### Icons:

### Methods:

## Bug fix

## License
