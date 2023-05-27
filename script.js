var mnemonics = document.querySelector("#mnemonics");
var xprv = document.querySelector("#xprv");
var xpub = document.querySelector("#xpub");
var balance = document.querySelector("#balance");
var path = document.querySelector("#path");
var prv = document.querySelector("#prv");
var pub = document.querySelector("#pub");
var qr = document.querySelector("#qr");
var addressDisplay = document.getElementById("address");

var mnemonic = window.bsvMnemonic;
var mnemonic1 = mnemonic.fromRandom();
mnemonics.innerHTML = mnemonic1.toString();

var hdPrivateKey = bsv.HDPrivateKey.fromSeed(mnemonic1.toSeed());
xprv.innerHTML = hdPrivateKey.toString();

var hdPublicKey = bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey);
xpub.innerHTML = hdPublicKey.toString();

if (path.value == false) {
    var privateKey = hdPrivateKey.privateKey;
    prv.innerHTML = privateKey;

    var publicKey = bsv.PublicKey.fromPrivateKey(privateKey);
    pub.innerHTML = publicKey;
} else {

}

let address = bsv.Address.fromPublicKey(publicKey).toString();
addressDisplay.innerHTML = address;

let addressCode = 'bitcoinsv:' + address;
new QRCode(qr, addressCode);

var config = {
    method: 'get',
    url: "https://api.whatsonchain.com/v1/bsv/main/address/" +
    address + "/balance",
};
axios(config).then((response) => {
   let data = JSON.stringify(response.data);
   balance.innerHTML = data;
});