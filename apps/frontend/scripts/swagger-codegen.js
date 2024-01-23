import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import AdmZip from "adm-zip";
import { rimraf } from "rimraf";
// import fetch from "node-fetch";
import { mkdir } from "node:fs/promises";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

// ===============================================
//      TO GEN API FROM SWAGGER YAML (Node 18 +)
// ===============================================
// 對於產出之 api 需再進行加工

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const appsPath = __filename
  .replaceAll("\\", "/")
  .split("frontend/scripts/swagger-codegen.js")[0];

console.log(appsPath);
const yamlPath = `${appsPath}backend/swagger.yaml`;

const unzipDirectory = async (inputFilePath, outputDirectory) => {
  const zip = new AdmZip(inputFilePath);
  return new Promise((resolve, reject) => {
    zip.extractAllToAsync(outputDirectory, true, (error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(`Extracted to "${outputDirectory}" successfully`);
        resolve();
      }
    });
  });
};

const swaggerCodegen = async () => {
  try {
    // read swagger yaml
    const parseObject = yaml.load(fs.readFileSync(yamlPath, "utf8"));

    const { code, link } = await fetch(
      "https://generator.swagger.io/api/gen/clients/typescript-fetch",
      {
        method: "POST",
        body: JSON.stringify({ spec: parseObject }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      },
    ).then(function (response) {
      return response.json();
    });

    // download zip
    // see: https://stackoverflow.com/questions/37614649/how-can-i-download-and-save-a-file-using-the-fetch-api-node-js

    const swaggerCodegenZipFile = await fetch(link);

    const swaggerTempFolderPath = `${appsPath}/frontend/src/swagger-temp`;
    const swaggerFolderPath = `${appsPath}/frontend/src/swagger`;

    if (!fs.existsSync(swaggerTempFolderPath)) {
      await mkdir(swaggerTempFolderPath);
    }

    const fileName = `${code}.zip`;
    const destination = path.resolve(swaggerTempFolderPath, fileName);
    const fileStream = fs.createWriteStream(destination, { flags: "wx" });

    await finished(
      Readable.fromWeb(swaggerCodegenZipFile.body).pipe(fileStream),
    );

    // unzip
    await unzipDirectory(destination, swaggerTempFolderPath);

    // copy file which we need
    if (!fs.existsSync(swaggerFolderPath)) {
      await mkdir(swaggerFolderPath);
    }

    ["api.ts", "configuration.ts", "custom.d.ts"].forEach((fileName) => {
      fs.createReadStream(
        `${swaggerTempFolderPath}/typescript-fetch-client/${fileName}`,
      ).pipe(fs.createWriteStream(`${swaggerFolderPath}/${fileName}`));
    });

    // remove temp folder
    rimraf(swaggerTempFolderPath);
  } catch (e) {
    console.log(e);
    console.log(
      "Please check the Node version is >= 18, or update to newest version",
    );
  }
};

swaggerCodegen();
