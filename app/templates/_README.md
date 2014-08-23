# <%= props.name %> [![Build Status](https://img.shields.io/travis/<%= props.githubUsername %>/<%= slugname %>.svg?style=flat)](http://travis-ci.org/<%= props.githubUsername %>/<%= slugname %>)

> <%= props.description %>

## Installation

```bash
$ npm install <%= slugname %>
```

```js
var <%= slugname %> = require('<%= slugname %>');
<%= slugname %>.awesome(); // "awesome"
```<% if (props.cli === "yes" || props.cli == "y") { %>

Install with cli command

```sh
$ npm install -g <%= slugname %>
$ <%= slugname %> --help
$ <%= slugname %> --version
```<% } %>

<% if (props.browser === "yes") { %>
```sh
# creates a browser.js
$ grunt browserify
```
<%}%>


## Documentation

_(Coming soon)_


## Examples

_(Coming soon)_

## License

Copyright (c) <%= currentYear %> <%= props.authorName %>  
Licensed under the <%= props.license %> license.
