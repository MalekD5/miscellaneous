import fs from "fs";
import {diffChars, createPatch, applyPatch} from "diff";
import * as colors from "colors";

const original = `
fs.stat("foo.txt", function (err, stat) {
    if (err == null) {
    console.log("File exists");
    } else if (err.code === "ENOENT") {
    // file does not exist
    fs.writeFile("log.txt", "Some log\n");
    } else {
    console.log("Some other error: ", err.code);
    }
});
`;

const modified = `
fs.stat("data.txt", function (err, stat) {
    if (err == null) {
    console.log("File exists brother");
    } else if (err.code === "ENOENT") {
    // file does not exist
    fs.writeFile("data.txt", "DANMBN Some log\n");
    } else {
    console.log("Some other error, I'm just a girl pls fix: ", err.code);
    }
});
`

function main() {
  if (!fs.existsSync("data.txt")) {
    fs.writeFileSync(
      "data.txt",
      original
    );
  }

  const patch = createPatch("data.txt", original, modified); 

  diffChars(original, modified).forEach((part) => {
    let text = part.added ? part.value.bgGreen :
             part.removed ? part.value.bgRed :
                            part.value;
    process.stderr.write(text);
  });

  const appliedPatch = applyPatch(original, patch);
  console.log("patch", appliedPatch);

  fs.writeFileSync("data.txt", appliedPatch);

}

main();
