const readline = require("readline");
const fs = require("fs");
const os = require("os");
const util = require("util");
const cardanoSerialization = require("@emurgo/cardano-serialization-lib-nodejs");

function setEnvValue(key, value) {
  const ENV_VARS = fs.readFileSync("./client/.env", "utf8").split(os.EOL);
  const target = ENV_VARS.indexOf(
    ENV_VARS.find((line) => {
      return line.match(new RegExp(key));
    })
  );
  ENV_VARS.splice(target, 1, `${key}=${value}`);
  fs.writeFileSync("./client/.env", ENV_VARS.join(os.EOL));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Type your address which get from nami wallet to become a super user: ",
  function (bech32Address) {
    const address = cardanoSerialization.Address.from_bech32(bech32Address);
    const publicKey = Buffer.from(address.to_bytes(), "hex").toString("hex");
    setEnvValue("REACT_APP_SUPER_USER", publicKey);
    rl.question(
      "Type of development (development or production): ",
      function (type = development) {
        setEnvValue("REACT_APP_ENVIRONMENT", type);
        rl.question("Type name of your company: ", function (companyName) {
          setEnvValue("REACT_APP_COMPANY_NAME", companyName);
          setEnvValue("REACT_APP_KEY", "dapp");
          setEnvValue(
            "REACT_APP_SECRET_KEY",
            require("crypto").randomBytes(48).toString("hex")
          );
          setEnvValue("REACT_APP_AUTH_SERVER", "http://localhost:3000");
          rl.close();
        });
      }
    );
  }
);

rl.on("close", function () {
  console.log("\nSetting proccess end!");
  process.exit(0);
});
