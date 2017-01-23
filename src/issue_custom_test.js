var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var coinsCode = "00000005";
var coinsSecret = "b33802b7f345fc44e6bd1d3b11c86b412de9ec38";

var coins_issuer = "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS";

var coins = "8200000005000020170006000000000020000001";
var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";

JingtumSDK.FinGate.setConfig(coinsCode, coinsSecret);
JingtumSDK.FinGate.issueCustomTum({
    currency: coins,
    amount: "1.00",
    account: gift_account
}, function (err, result) {
    console.log(err, result);
});