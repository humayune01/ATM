#! /usr/bin/env node
import inquirer from "inquirer";
let acc_balance = 5000;
let userInput;
async function performTransaction() {
    let transType = await inquirer.prompt({
        name: "transaction_type",
        type: "list",
        choices: ['Balance Inquiry', 'Cash Withdrawal'],
        message: "Please select any one option"
    });
    if (transType.transaction_type == 'Balance Inquiry') {
        console.log(`Here is your account balance $${acc_balance}`);
        let anotherTrans = await inquirer.prompt({
            name: "transaction",
            type: "confirm",
            message: "Do you want to perform another transaction?"
        });
        if (anotherTrans.transaction) {
            await performTransaction();
        }
    }
    else {
        let withdOptions = await inquirer.prompt({
            name: "withdrawal_options",
            type: "list",
            choices: ['1000', '2000', '3000', '4000', '5000', '10000', 'Other Amount'],
            message: "Please select any one option"
        });
        if (acc_balance >= parseInt(withdOptions.withdrawal_options) && parseInt(withdOptions.withdrawal_options) > 0) {
            acc_balance -= parseInt(withdOptions.withdrawal_options);
            console.log("Please take your card.");
            console.log("Please collect your cash.");
            console.log(`Your remaining account balance $${acc_balance}`);
        }
        else {
            if (parseInt(withdOptions.withdrawal_options) > acc_balance) {
                console.log("Sorry, Insufficient balance.");
                let anotherTrans = await inquirer.prompt({
                    name: "transaction",
                    type: "confirm",
                    message: "Do you want to perform another transaction?"
                });
                if (anotherTrans.transaction) {
                    await performTransaction();
                }
            }
            else {
                let otherAmount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Please enter amount: "
                });
                if (acc_balance >= parseInt(otherAmount.amount)) {
                    acc_balance -= parseInt(otherAmount.amount);
                    console.log("Please take your card.");
                    console.log("Please collect your cash.");
                    console.log(`Your remaining account balance $${acc_balance}`);
                }
                else {
                    console.log("Sorry, Insufficient balance.");
                    let anotherTrans = await inquirer.prompt({
                        name: "transaction",
                        type: "confirm",
                        message: "Do you want to perform another transaction?"
                    });
                    if (anotherTrans.transaction) {
                        await performTransaction();
                    }
                }
            }
        }
    }
}
console.log("Welcome to Meezan Bank ATM!");
do {
    userInput = await inquirer.prompt([
        {
            name: "user_id",
            type: "input",
            message: "Please enter your user id to confirm."
        },
        {
            name: "user_pin",
            type: "password",
            message: "Please enter your PIN to confirm."
        }
    ]);
    if (userInput.user_id == 'heymi' && userInput.user_pin == '1234') {
        let accType = await inquirer.prompt({
            name: "account_type",
            type: "list",
            choices: ['Savings', 'Current'],
            message: "Select account type"
        });
        if (accType.account_type == 'Current' || accType.account_type == 'Savings') {
            await performTransaction();
        }
        console.log("Thank you for using Meezan Bank services!");
    }
    else {
        console.log("Invalid User ID or PIN.");
    }
} while (userInput.user_id != 'heymi' || userInput.user_pin != '1234');
