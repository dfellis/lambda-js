# lambda-js

## Quick install instructions

For Node.js

    npm install lambda-js

For browsers, just copy ``./lib/lambda.min.js`` (generated by [UglifyJS](https://github.com/mishoo/UglifyJS/))and include it in a ``<script>`` tag.

For developers, ``npm test`` to check your changes (using [nodeunit](https://github.com/caolan/nodeunit/)) haven't broken existing functionality. Literate programming documentation can be found inside of the ``/docs`` directory, generated by [docco](http://jashkenas.github.com/docco/).

## Syntactic sugar for lambda one-liners without a performance penalty

Until ECMAScript 6 gives us the fat-arrow syntax for one-liners in functional style evaluation,

```js
[1,2,3,4,5,6,7,8,9,10]
	.map(x => x*2)
	.reduce((sum, val) => sum + val);
```

Such one-liners include a lot of ugly noise:

```js
[1,2,3,4,5,6,7,8,9,10]
	.map(function(x) { return x*2 })
	.reduce(function(sum, val) { return sum + val });
```

Javascript allows us to define functions on-the-fly,

```js
var adder = new Function("a,b", "return a+b");
```

And with that capability, and caching already-constructed lambdas so there's no performance penalty beyond the initial construction, we can have nice one-liners even before ES6:

```js
var l = require('lambda-js');

[1,2,3,4,5,6,7,8,9,10]
	.map(l("x", "x*2"))
	.reduce(l("sum, val", "sum + val"));
```

## License (MIT)

Copyright (C) 2012 by David Ellis

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
