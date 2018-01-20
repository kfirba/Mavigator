Mavigator
=============

The easiest way to mark your navigators.

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
The `Mavigator.mark()` method's blueprint is:

```javascript
Mavigator.mark(selector, options);
```

Where `selector` is a string compatible with [`document.querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), which means it's really flexible. The default value for this is `html`.


If you don't wish to override the selector but supply the options object, you can also pass the options as the first argument and the selector will default to `html`:

```javascript
// This will set the `selector` to "html" and use the given options.
Mavigator.mark(options);
```

The `options` are as follow:

| Property | Default value | Description |
|:-------------:|:------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| className | "active" | The class which will be added to the element once found. |
| uri | window.location.pathname | The uri Mavigator will try to find on anchor tags. The default value is okay in most cases. When you want to mark a link that its uri is ***'/discuss'*** and the uri of the page is something like ***'/discuss/general/how-we-do-x'*** we can use this option to tell Mavigator to look for the ***'/discuss'*** uri. |
| classToParent | false | Whether to add the className to the anchor tag or its parent. |
| markTreeDepth | 0 | Tells Mavigator whether it should "expand" the URI to match. The possible values are: <ol> <li>**0** (*default*) - Mark the given URI only.</li> <li> **-1** - Mark every URI segment. For example, given a URI like **/settings/access/auth**, Mavigator will mark the following URIs:     <ol>         <li>/settings/access/auth</li>         <li>/settings/access</li>         <li>/settings</li>     </ol>  </li> <li> **1,2,3,...,n** - Mark every URI segment up to the given value (starting from the "bottom of the tree"). For example, given a URI like **/settings/access/auth** and the value **1**, Mavigator will mark the following URIs:     <ol>         <li>/settings/access/auth</li>         <li>/settings/access - *This URI is **1** level "above" the given URI*</li>     </ol> </li> </ol> |
| warn | false | Whether to warn in the console if no link to mark was found. |

Wider support
--------
If you feel that the script lacks some feature, let me know.


License
--------
Mavigator is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).