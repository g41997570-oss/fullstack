/* ----------- Accounts (Database Tables) ----------- */

let userAccount = {
    name: "Customer",
    balance: 5000
};

let merchantAccount = {
    name: "Merchant",
    balance: 10000
};


/* ----------- Display Balances ----------- */

function updateUI() {
    document.getElementById("userBalance").innerText =
        userAccount.balance;

    document.getElementById("merchantBalance").innerText =
        merchantAccount.balance;
}

updateUI();


/* ----------- Transaction Simulation ----------- */

function processPayment() {

    const amount = Number(document.getElementById("amount").value);
    const status = document.getElementById("status");

    if (amount <= 0) {
        status.innerText = "❌ Enter valid amount";
        return;
    }

    /* BEGIN TRANSACTION */
    let tempUserBalance = userAccount.balance;
    let tempMerchantBalance = merchantAccount.balance;

    try {

        // Step 1: Deduct from user
        if (tempUserBalance < amount) {
            throw "Insufficient Balance";
        }

        tempUserBalance -= amount;

        // Step 2: Simulate payment gateway failure randomly
        const paymentSuccess = Math.random() > 0.3; // 70% success

        if (!paymentSuccess) {
            throw "Payment Gateway Failed";
        }

        // Step 3: Add to merchant
        tempMerchantBalance += amount;

        /* COMMIT */
        userAccount.balance = tempUserBalance;
        merchantAccount.balance = tempMerchantBalance;

        status.innerText = "✅ Transaction Successful (COMMIT)";
        status.style.color = "green";

    } catch (error) {

        /* ROLLBACK */
        status.innerText = "❌ Transaction Failed (ROLLBACK): " + error;
        status.style.color = "red";
    }

    updateUI();
}