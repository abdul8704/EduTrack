const os = require("os"); // install puppeteer chromium on linux explicity, dont need this for windows...
const { execSync } = require("child_process");

const platform = os.platform(); // 'linux', 'win32', 'darwin', etc.

if (platform === "linux") {
    console.log("Installing Chromium for Puppeteer (Linux)...");
    execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });
} else {
    console.log(`Skipping Puppeteer install for platform: ${platform}`);
}
