var JingtumSDK = require('jingtum-sdk');

var gift_secret = 'sha4eGoQujTi9SsRSxGN5PamV3YQ4';//激活账号与充值账号密钥
var gift_account = 'jpLpucnjfX7ksggzc9Qw6hMSm1ATKJe3AF';//激活账号与充值账号

var coins = "8200000005000020170006000000000020000001";
var coins_issuer = "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS";
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
var orderOperation = new JingtumSDK.OrderOperation(coinsWallet);
orderOperation.setValidate(true);
orderOperation.setOrderType("sell");
orderOperation.setTakerPays({
    value: "0.01",
    currency: 'SWT'
});

orderOperation.setTakerGets({
    value: "0.01",
    currency: coins,
    issuer: coins_issuer
});

orderOperation.submit(function (err, result) {
    if (err) {
        throw new Error(err.message);
    }
    if (!result['success']) {
        throw new Error("结果异常");
    }
    console.log(result);
    var hash1 = result['hash'];
    var wallet = new Wallet(gift_secret, gift_account);
    wallet.setTest(true);
    var orderOperation = new JingtumSDK.OrderOperation(wallet);
    orderOperation.setValidate(true);
    orderOperation.setOrderType("buy");
    orderOperation.setTakerPays({
        value: "0.01",
        currency: 'SWT'
    });

    orderOperation.setTakerGets({
        value: "0.01",
        currency: coins,
        issuer: coins_issuer
    });

    orderOperation.submit(function (err, result) {
        if (err) {
            throw new Error(err.message);
        }
        if (!result['success']) {
            throw new Error("结果异常");
        }
        console.log(result);
        var hash2 = result['hash'];

        coinsWallet.getTransaction(hash1, function (err, result) {
            if (err) {
                throw new Error(err.message);
            }
            console.log(result['transaction']['effects']);
            wallet.getTransaction(hash2, function (err, result) {
                if (err) {
                    throw new Error(err.message);
                }
                console.log(result['transaction']['effects']);
            });
        })
    });
});
