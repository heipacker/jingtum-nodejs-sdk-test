var JingtumSDK = require('jingtum-sdk');

var coins = "8200000005000020170006000000000020000001";
var coins_issuer = "jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS";
var coins_address = "jG4oHTKopzG1JXjCRd23HdXvXBAAvCSSjr";
var coins_secret = "sn5bGPAExY7H4xaDn2PJzoUbzpcbz";

var finGate = JingtumSDK.FinGate;
finGate.setTest(true);
var Wallet = JingtumSDK.Wallet;

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
    var cancelOrderOperation = new JingtumSDK.CancelOrderOperation(coinsWallet, result['sequence']);
    cancelOrderOperation.setValidate(true);
    cancelOrderOperation.submit(function (err, result) {
        console.log("---------------------cancelOrderOperation------------------");
        console.log(result);
        console.log("---------------------cancelOrderOperation------------------");
    });
});
