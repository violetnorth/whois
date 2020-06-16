"use strict";

const Whois = require("./whois");
const Parser = require("./parser");

const WHOIS_IANA_SERVER = "whois.iana.org";

exports.lookup = (domain, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Trim and check the provided domain before
      // getting refer and doing the actual WHOIS lookup.
      domain = domain.trim().toLowerCase();
      if (!domain) {
        reject("Domain provided is undefined or empty");
        return
      }

      let data = await Whois.lookup(domain, WHOIS_IANA_SERVER, opts);
      
      const regex = new RegExp("refer:(.*?)\n");
      const matches = regex.exec(data);

      if (matches && matches.length >= 2) {
        const refer = matches[1].trim();
        data = await Whois.lookup(domain, refer, opts);
      }
      
      if (!data.length) {
        reject(`Whois returned empty response for ${domain}`);
        return;
      }

      const dataParsed = Parser.parse(data);
      resolve(dataParsed);

    } catch (err) {
      reject(err);
    }
  });
};
