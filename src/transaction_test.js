var JingtumSDK = require('jingtum-sdk');

var hash = "7491A297604DACF8E4A8C5BB3777CE21DA40CEE6B8DC89770C80A8EC66BE6B3B";
var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";

var Wallet = JingtumSDK.Wallet;
var wallet = new Wallet(coins_secret, coins_address);
wallet.setTest(true);
wallet.getTransaction(hash, function (err, result) {
    if (err) {
        throw new Error(err.message);
    }
    console.log(result['transaction']['effects']);
});