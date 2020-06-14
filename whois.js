"use strict";

const Net = require("net");

const WHOIS_PORT = "43";

exports.lookup = (domain, server, {timeout = 30000} = {}) => {
  return new Promise((resolve, reject) => {
    let data = "";

    let socket = new Net.Socket();
    socket.setTimeout(timeout);

    socket.connect(WHOIS_PORT, server, function() {
      socket.write(`${domain}\r\n`);
    });

    socket.on("data", chunk => {
      data += chunk.toString();
    });

    socket.on("error", err => {
      reject(err);
      return;
    });

    socket.on("close", function() {
      resolve(data.trim());
      return;
    });

    socket.on("end", function() {
      resolve(data.trim());
      return;
    });

    socket.on("timeout", () => {
      reject(`whois lookup timed out for ${domain}`);
      return;
    });
  });
}