var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";

var finGate = JingtumSDK.FinGate;

finGate.setTest(true);
var Wallet = JingtumSDK.Wallet;
var wallet = finGate.createWallet();
wallet.setTest(true);
console.log(wallet);
finGate.activeWallet(new Wallet(gift_secret, gift_account), wallet);

var coinsWallet = new Wallet(coins_secret, coins_address);
coinsWallet.setTest(true);
var paymentOperation = new JingtumSDK.PaymentOperation(coinsWallet);
paymentOperation.setDestAmount({
    value: "0.01",
    currency: 'SWT'
});
paymentOperation.setDestination(wallet.address);
paymentOperation.submit(function (err, result) {
    console.log(err, result);
});
coinsWallet.getBalance(null, function (err, result) {
    console.log(err, result);
});