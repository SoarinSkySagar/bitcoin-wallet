var mnemonics = document.querySelector("#mnemonics");
var xprv = document.querySelector("#xprv");
var xpub = document.querySelector("#xpub");
var balance = document.querySelector("#balance");
var path = document.querySelector("#path");
var prv = document.querySelector("#prv");
var pub = document.querySelector("#pub");
var qr = document.querySelector("#qr");
var addressDisplay = document.querySelector("#address");
var btn = document.querySelector("#btn");
var mp = document.querySelector("#m-p");
const errorText = document.getElementById("errorText");

var mnemonic = window.bsvMnemonic;
var mnemonic1 = mnemonic.fromRandom();
mp.innerHTML = mnemonic1.toString();

var hdPrivateKey = bsv.HDPrivateKey.fromSeed(mnemonic1.toSeed());
xprv.innerHTML = hdPrivateKey.toString();

var hdPublicKey = bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey);
xpub.innerHTML = hdPublicKey.toString();

var privateKey = hdPrivateKey.privateKey;
prv.innerHTML = privateKey;

var publicKey = bsv.PublicKey.fromPrivateKey(privateKey);
pub.innerHTML = publicKey;

// Support only on bip-44 pattern
function testPath(value) {
  const regexBip44 = /^m(\/\d+\'?)+$/;

  if (regexBip44.test(value)) {
    errorText.textContent = "";
    return true;
  } else {
    errorText.textContent = "invalid format.";
    return false;
  }
};

path.addEventListener("input", () => {
  testPath(path.value);
});

btn.addEventListener("click", () => {
  var path_value = path.value;
  if (testPath(path_value)) {
    var privateKeyStandard1 = hdPrivateKey.deriveChild(path_value);

    var privateKey = privateKeyStandard1.privateKey;
    var publicKey = privateKeyStandard1.publicKey;

    prv.innerHTML = privateKey;
    pub.innerHTML = publicKey;

    var address = bsv.Address.fromPublicKey(publicKey).toString();
    addressDisplay.innerHTML = address;

    var addressCode = "bitcoinsv:" + address;
    qr.innerHTML = "";
    new QRCode(qr, addressCode);

    var config = {
      method: "get",
      url:
        "https://api.whatsonchain.com/v1/bsv/main/address/" +
        address +
        "/balance",
    };
    axios(config).then((response) => {
      let data = JSON.stringify(response.data);
      balance.innerHTML = data;
    });
  }
});

var address = bsv.Address.fromPublicKey(publicKey).toString();
addressDisplay.innerHTML = address;

var addressCode = "bitcoinsv:" + address;
new QRCode(qr, addressCode);

var config = {
  method: "get",
  url:
    "https://api.whatsonchain.com/v1/bsv/main/address/" + address + "/balance",
};
axios(config).then((response) => {
  let data = JSON.stringify(response.data);
  balance.innerHTML = data;
});
