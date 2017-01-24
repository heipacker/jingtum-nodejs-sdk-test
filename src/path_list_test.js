var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var coins_issuer = "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS";

var coins = "8200000005000020170006000000000020000001";
var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";

var Wallet = JingtumSDK.Wallet;
var coinsWallet = new Wallet(coins_secret, coins_address);
coinsWallet.setTest(true);
coinsWallet.getPathList(gift_account, {
    currency: coins,
    issuer: coins_issuer,
    value: '0.02'
}, null, function (err, result) {
    if (err) {
        throw new Error(err.message);
    }
    console.log(err, result);
});
