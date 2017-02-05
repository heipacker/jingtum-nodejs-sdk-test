var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var finGate = JingtumSDK.FinGate;

finGate.setTest(true);

var Wallet = JingtumSDK.Wallet;
var wallet = new Wallet(gift_secret, gift_account);
wallet.setTest(true);
wallet.getBalance(null, function (err, result) {
    console.log("--------------wallet---------------------");
    console.log(result);
    console.log("--------------wallet---------------------");
});

var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";
var wallet1 = new Wallet(coins_secret, coins_address);
wallet1.setTest(true);
wallet1.getBalance(null, function (err, result) {
    console.log("--------------coins_address---------------------");
    console.log(result);
    console.log("--------------coins_address---------------------");
});
wallet1.getBalance({'currency': 'SWT'}, function (err, data) {//获得指定货币余额
    console.log("--------------currency SWT---------------------");
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
    console.log("--------------currency SWT---------------------");
});
var coins = "8200000005000020170006000000000020000001";
wallet1.getBalance({'currency': coins}, function (err, data) {//获得指定货币余额
    console.log("--------------currency coins---------------------");
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
    console.log("--------------currency coins---------------------");
});