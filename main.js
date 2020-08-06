// var app = require('express')();
let http = require("http");
let fs = require("fs-extra");
let url = require("url");
var pathModule = require("path");
const { exec } = require("child_process");
let PORT = 3031;

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    res.setHeader("Access-Control-Allow-Credentials", true);

    let { ui, document, image, scan } = url.parse(req.url, true).query;

    // Erase old files before sending new files to CLIENT
    path = pathModule.normalize("/Output/output");

    if (req.headers["content-type"] !== "image/jpeg" && req.headers["content-type"] == "application/pdf") {
      fs.removeSync(`${process.cwd()}/Output`);
      fs.ensureDirSync(`${process.cwd()}/Output`);
      console.log(fs.existsSync(pathModule.normalize(`${process.cwd()}/Output`)));
      // fs.rmdirSync(`${process.cwd()}/Output`, { recursive: true });
      // fs.unlink(`${process.cwd()}${path}.jpg`, (err) => {
      //   if (err) {
      //     console.error(err.message);
      //     return;
      //   }
      //   console.log(`successfully deleted ${process.cwd()}${path}.jpg`);
      // });
      // fs.unlink(`${process.cwd()}${path}.pdf`, (err) => {
      //   if (err) {
      //     console.error(err.message);
      //     return;
      //   }
      //   console.log(`successfully deleted ${process.cwd()}${path}.pdf`);
      // });
    }

    if (req.headers["content-type"] == "image/jpeg") {
      console.log("image");
      try {
        const jpg_file = fs.readFileSync(`${process.cwd()}${path}.jpg`);
        res.setHeader("Content-Type", "image/jpeg");
        res.writeHead(200);
        res.end(jpg_file, "binary");
        return;
      } catch (err) {
        console.log("error image");
        // console.error(err.message);
        res.writeHead(202, "Process was interrupted, please try again");
        res.end();
        return;
      }
    } else if (req.headers["content-type"] == "application/pdf" || document == "true") {
      console.log("pdf");
      try {
        res.setHeader("Content-Type", "application/pdf");
        let doc = fs.readFileSync(`${process.cwd()}${path}.pdf`);
        res.writeHead(200);
        res.end(doc, "binary");
        return;
      } catch (err) {
        console.log("error pdf");
        // console.error(err.message);
        res.writeHead(202, "Process was interrupted, please try again");
        res.end();
        return;
      }
    }

    if (ui == "true") {
      console.log("running scanner UI (Options)");
      exec("cd commands && settings.bat", (err, stdout, stderr) => {
        res.writeHead(204);
        res.end();
        return;
      });
    } else if (ui == "false" && scan == "true") {
      console.log("running scanner");
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
