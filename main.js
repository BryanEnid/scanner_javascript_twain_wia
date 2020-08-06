// var app = require('express')();
let http = require("http");
let fs = require("fs-extra");
let url = require("url");
var pathModule = require("path");
const { exec } = require("child_process");
let PORT = 3031;

http
  .createServer(async (req, res) => {
    // Permission to access and fetch files from local machine
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.setHeader("Access-Control-Allow-Credentials", true);

    // HTTP Queries ex. "localhost:3031/?scan=true"
    let { ui, document, image, scan } = url.parse(req.url, true).query;

    // HTTP request is asking for a image
    if (req.headers["content-type"] == "image/jpeg") {
      // Get a list of the file names in "/Output" folder
      const files_names = await fs.readdir(pathModule.normalize(`${process.cwd()}/Output/`));
      // Filter files other than .jpf files
      const jpg_file_names = files_names.filter((item) => item.includes("jpg"));

      try {
        // Send the first jpg file in "/Output" folder
        const jpg_file = await fs.readFile(pathModule.normalize(`${process.cwd()}/Output/${jpg_file_names[0]}`));
        res.setHeader("Content-Type", "image/jpeg");
        res.writeHead(200);
        // It need to be binary so you can parse it as a blob object (https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
        res.end(jpg_file, "binary");
        return;
      } catch (err) {
        console.error(err.message);
        res.writeHead(202, "Process was interrupted, please try again");
        res.end();
        return;
      }
    }
    // HTTP request is asking for a pdf file
    else if (req.headers["content-type"] == "application/pdf" || document == "true") {
      try {
        // Send the Output.pdf file from "/Output" folder
        let doc = await fs.readFile(pathModule.normalize(`${process.cwd()}/Output/output.pdf`));
        res.setHeader("Content-Type", "application/pdf");
        res.writeHead(200);
        // It need to be binary so you can parse it as a blob object (https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
        res.end(doc, "binary");
        return;
      } catch (err) {
        console.error(err.message);
        res.writeHead(202, "Process was interrupted, please try again");
        res.end();
        return;
      }
    }

    // HTTP request is asking to open the Scanner Settings UI
    if (ui == "true") {
      console.log(`Scanner UI (Options)- ${new Date().toLocaleTimeString()} : ${new Date().toLocaleDateString()} `);
      // Run batch script to open it minimized
      exec("cd commands && settings.bat", (err, stdout, stderr) => {
        res.writeHead(204);
        res.end();
        return;
      });
    }
    // HTTP request is asking to run scanner
    else if (ui == "false" && scan == "true") {
      console.log(`Running Scanner - ${new Date().toLocaleTimeString()} : ${new Date().toLocaleDateString()} `);
      // Run batch script to open it minimized
      exec("cd commands && start.bat", (err, stdout, stderr) => {
        if (err) {
          console.error(err.message);
          res.writeHead(202, "Process was interrupted, please try again");
          res.end();
          return;
        }
        res.writeHead(200);
        res.end();
        return;
      });
    }
  })
  .listen(PORT, "localhost", () => {
    console.error(`Running on Port: ${PORT}`);
  });
