var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var finGate = JingtumSDK.FinGate;

finGate.setTest(true);

var Wallet = JingtumSDK.Wallet;
var wallet = finGate.createWallet();

wallet.setTest(true);
console.log(wallet);
var ret = finGate.activeWallet(new Wallet(gift_secret, gift_account), wallet);
console.log(ret);