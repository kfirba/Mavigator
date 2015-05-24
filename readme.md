Mavigator
=============

A short and simply script to mark your navigators.

Straight to the point
--------
First ,we will need to structure our navigators, there are absolutely no restrictions to this. Just make your navigator however suits your needs.
```html
<!--
    Feel free to structure it however you want...
-->
<nav class="aNav">
    <ul>
        <li><a href="Home.php">Home</a></li>
        <li><a href="Protfolio.php">Protfolio</a></li>
        <li><a href="Contact.php">Contact</a></li>
    </ul>
</nav>
```

Second, let's pull the script in:
```javascript
<script src="js/mavigator.min.js"></script>
```

And finally:
```javascript
new Mavigator('.aNav', {warnIfLinkWasntFound: true});
```
As default behavior, the code will add the class `active` to the correct `<a>` element inside the navigators.

**note:** the first argument should be a selector only.

Options
--------

There are few options which we can pass to the constructor as the second argument:

|       property       | default value |                          description                         |
|:--------------------:|:-------------:|:------------------------------------------------------------:|
| className            |    "active"   | the class which will be added to the element once found.     |
| classToParent        |     false     | Whether to add the className to the anchor tag or its parent.   |
| warnIfLinkWasntFound |     false     | Whether to warn in the console if no link to mark was found. |


Bugs
--------
If you encounter any kind of bug, please let me know and I will do my best in order to fix it as soon as possible.

Wider support
--------
If you feel that the script lack some feature, please let me know.


License
--------
Copyright (c) 2015 Kfir Ben-Ami (http://domanage.co.il/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
