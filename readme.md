Mavigator
=============

A lightweight dead simple script to mark your navigators.

Install
--------
```bash
$ npm install mavigator
```

Usage
--------
```javascript
import Mavigator from 'mavigator';

Mavigator.mark();
```

Yup, for most cases it's that simple.

How does it work?
--------
Mavigator will look for any [anchor tag (`<a>`)](https://developer.mozilla.org/en/docs/Web/HTML/Element/a) inside the specified selector. The default behavior is to look for any `<a>` inside the `html` element. Once it gathers all of the link nodes, it will scan each node and figure out whether it needs to be marked or not.

If needed, you can scope the `<a>` tag scanning to a specific element type such as `<nav>` or to a particular class name. Take a look at the section below and learn what type of selectors you can use.

Taking it seriously
--------
The `Mavigator.mark()` method blueprint is:

```javascript
Mavigator.mark(selector, options);
```

Where `selector` is a string compatible with [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), which means it's really flexible. The default value for this is `html`.

The `options` are as follow:

|    Property   |       Default value      |                                                                                                                                                       Description                                                                                                                                                       |
|:-------------:|:------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|   className   |         "active"         |                                                                                                                                 the class which will be added to the element once found.                                                                                                                                |
|      uri      | window.location.pathname | The uri Mavigator will try to find on anchor tags. The default value is okay in most cases. When you want to mark a link that its uri is ***'/discuss'*** and the uri of the page is something like ***'/discuss/general/how-we-do-x'*** we can use this option to tell Mavigator to look for the ***'/discuss'*** uri. |
| classToParent |           false          |                                                                                                                              Whether to add the className to the anchor tag or its parent.                                                                                                                              |
|      warn     |           false          |                                                                                                                               Whether to warn in the console if no link to mark was found.                                                                                                                              |

Wider support
--------
If you feel that the script lacks some feature, let me know.


License
--------
Mavigator is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).