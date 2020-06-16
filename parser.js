"use strict";

const WhoisDataFormat = {
  "Domain Name": {
    "type": String,
    "possibleKeys": [
      "domain name",
      "domain",
    ],
  },

  "Registry Domain ID": {
    "type": String,
    "possibleKeys": [
      "registry domain id",
    ],
  },

  "Registrar WHOIS Server": {
    "type": String,
    "possibleKeys": [
      "registrar whois server",
    ],
  },

  "Registrar URL": {
    "type": String,
    "possibleKeys": [
      "registrar url",
    ],
  },

  "Creation Date": {
    "type": Date,
    "possibleKeys": [
      "creation date",
      "registered on",
    ],
  },

  "Updated Date": {
    "type": Date,
    "possibleKeys": [
      "updated date",
      "last-updated",
    ],
  },

  "Registry Expiry Date": {
    "type": Date,
    "possibleKeys": [
      "registry expiry date",
      "expire-date",
      "expires on",
    ],
  },

  "Registrar": {
    "type": String,
    "possibleKeys": [
      "registrar",
    ],
  },

  "Registrar IANA ID": {
    "type": Number,
    "possibleKeys": [
      "registrar iana id"
    ],
  },

  "Domain Status": {
    "type": Array,
    "possibleKeys": [
      "domain status"
    ],
  },

  "Registrant Organization": {
    "type": String,
    "possibleKeys": [
      "registrant organization"
    ],
  },

  "Registrant Street": {
    "type": Array,
    "possibleKeys": [
      "registrant street"
    ],
  },

  "Registrant City": {
    "type": String,
    "possibleKeys": [
      "registrant city"
    ],
  },

  "Registrant State/Province": {
    "type": Number,
    "possibleKeys": [
      "registrant state/province"
    ],
  },

  "Registrant Country": {
    "type": String,
    "possibleKeys": [
      "registrant country",
    ],
  },

  "Registrant Postal Code": {
    "type": String,
    "possibleKeys": [
      "registrant postal code",
    ],
  },

  "Registrant Email": {
    "type": String,
    "possibleKeys": [
      "registrant email",
      "e-mail",
    ],
  },

  "Registrant Phone": {
    "type": String,
    "possibleKeys": [
      "registrant phone",
    ],
  },

  "Registrant Fax": {
    "type": String,
    "possibleKeys": [
      "registrant fax",
    ],
  },

  "Admin Email": {
    "type": String,
    "possibleKeys": [
      "admin email",
      "e-mail",
    ],
  },

  "Tech Email": {
    "type": String,
    "possibleKeys": [
      "tech email",
      "e-mail",
    ],
  },

  "Name Server": {
    "type": Array,
    "possibleKeys": [
      "name server",
      "nameserver",
      "nserver",
      "domain nameservers",
      "nserver",
    ],
  },

  "DNSSEC": {
    "type": String,
    "possibleKeys": [
      "dnssec",
    ],
  },

  "Billing Email": {
    "type": String,
    "possibleKeys": [
      "billing email",
    ],
  },

  "Registrar Abuse Contact Email": {
    "type": String,
    "possibleKeys": [
      "registrar abuse contact email",
    ],
  },

  "Registrar Abuse Contact Phone": {
    "type": String,
    "possibleKeys": [
      "registrar abuse contact phone",
    ],
  },

  "URL of the ICANN Whois Inaccuracy Complaint Form": {
    "type": String,
    "possibleKeys": [
      "url of the icann whois inaccuracy complaint form",
    ],
  },
};

exports.parse = data => {
  // whoisData is the object to be returned, it follows
  // the same keys as the template only lowercase.
  const whoisData = {};

  for (let line of data.split("\n")) {
    line = line.trim().toLowerCase();

    if (!line || line.startsWith("%") || line.startsWith("#") || line.startsWith(">")) {
      continue;
    }

    const lineSplit = line.split(":");
    if (lineSplit.length < 2) {
      continue;
    }

    const key = lineSplit[0].trim();
    const val = lineSplit.slice(1, lineSplit.length).join(":").trim();

    for (const whoisKey of Object.keys(WhoisDataFormat)) {
      if (WhoisDataFormat[whoisKey].possibleKeys.includes(key)) {
        if (WhoisDataFormat[whoisKey].type === Array) {
          if (!whoisData[key]) {
            whoisData[key] = [];
          }
          whoisData[key].push(val);
        } else if (WhoisDataFormat[whoisKey].type === Date) {
          whoisData[key] = Date.parse(val);
        } else {
          whoisData[key] = val;
        }
      }
    }
  }

  whoisData.raw = data.trim();
  return whoisData;
};