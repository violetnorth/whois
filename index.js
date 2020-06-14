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

      const referData = await Whois.lookup(domain, WHOIS_IANA_SERVER, opts);
      const regex = new RegExp("refer:(.*?)\n");
      const matches = regex.exec(referData);

      if (!matches || matches.length < 2) {
        reject(`IANA whois returned no refer data for ${domain}`);
        return;
      }

      const refer = matches[1].trim();
      if (!refer) {
        reject(`IANA whois returned no refer data for ${domain}`);
        return;
      }

      const whoisDataRaw = await Whois.lookup(domain, refer, opts);
      if (!whoisDataRaw.length) {
        reject(`Whois returned empty response for ${domain}`);
        return;
      }

      const whoisData = Parser.parse(whoisDataRaw);
      if (!Object.keys(whoisData).length) {
        reject(`Unknown whois data for ${domain}: ${whoisDataRaw}`);
        return;
      }

      resolve(whoisData);

    } catch (err) {
      reject(err);
    }
  });
};
