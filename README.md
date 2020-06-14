# whois

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

const whoisData = await whois.lookup("violetnorth.com", {timeout: 30000});
// {
//   'domain name': 'violetnorth.com',
//   'registry domain id': '2396951823_domain_com-vrsn',
//   'registrar whois server': 'whois.google.com',
//   'registrar url': 'http://domains.google.com',
//   'updated date': 1590792811000,
//   'creation date': 1559250753000,
//    ...
// }
```

### License

---

Released under the [MIT License](https://github.com/violetnorth/whois/blob/master/LICENSE).