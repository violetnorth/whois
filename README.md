# vn-whois

---

> Whois lookup for any domain.

### Install

---

Install with [npm](https://www.npmjs.com/):

```shell
$ npm install --save @violetnorth/whois
```

### Usage

```javascript
const whois = require("@violetnorth/whois");

const whoisData = await whois.lookup("example.com", {timeout = 10});
```

### License

---

Released under the [MIT License](https://github.com/violetnorth/whois/blob/master/LICENSE).