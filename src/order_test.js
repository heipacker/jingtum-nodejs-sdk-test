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
    if (result['success'] == 'failed') {
        console.error(result);
        throw new Error("结果异常");
    }
    console.log("---------------------submitOrders1--------------------");
    console.log(result);
    console.log("---------------------submitOrders1--------------------");
    var hash1 = result['hash'];
    coinsWallet.getOrders(hash1, function (err, result) {
        console.log("---------------------getOrders1--------------------");
        console.log(result);
        console.log("---------------------getOrders1--------------------");
    });
    var wallet = new Wallet(gift_secret, gift_account);
    wallet.setTest(true);
    var orderOperation = new JingtumSDK.OrderOperation(wallet);
    orderOperation.setValidate(true);
    orderOperation.setOrderType("sell");
    orderOperation.setTakerPays({
        value: "0.01",
        currency: coins,
        issuer: coins_issuer
    });

    orderOperation.setTakerGets({
        value: "0.01",
        currency: 'SWT'
    });

    orderOperation.submit(function (err, result) {
        if (err) {
            throw new Error(err.message);
        }
        if (result['success'] == 'failed') {
            throw new Error("结果异常");
        }
        console.log("---------------------submitOrders2--------------------");
        console.log(result);
        console.log("---------------------submitOrders2--------------------");
        var hash2 = result['hash'];
        wallet.getOrders(hash2, function (err, result) {
            console.log("---------------------getOrders2--------------------");
            console.log(result);
            console.log("---------------------getOrders2--------------------");
        });
        coinsWallet.getTransaction(hash1, function (err, result) {
            if (err) {
                throw new Error(err.message);
            }
            console.log("---------------------getTransaction1--------------------");
            console.log(result['transaction']['effects']);
            console.log("---------------------getTransaction1--------------------");
            wallet.getTransaction(hash2, function (err, result) {
                if (err) {
                    throw new Error(err.message);
                }
                console.log("---------------------getTransaction2--------------------");
                console.log(result['transaction']['effects']);
                console.log("---------------------getTransaction2--------------------");
            });
        });
    });
});

orderOperation.submit(function (err, result) {
    if (err) {
        throw new Error(err.message);
    }
    if (result['success'] == 'failed') {
        console.error(result);
        throw new Error("结果异常");
    }
    var cancelOrderOperation = new JingtumSDK.CancelOrderOperation(coinsWallet, result['sequence']);
    cancelOrderOperation.submit(function (err, result) {
        console.log("---------------------cancelOrderOperation------------------");
        console.log(result);
        console.log("---------------------cancelOrderOperation------------------");
    });
});
