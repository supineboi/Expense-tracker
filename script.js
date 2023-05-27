$('form').submit( (event) => {

    // prevent default refreshing a page after click on submit button
    event.preventDefault();
// ================================== THREE FUNCTIONS =========================================
    // -------------------------------------------------------------------------------------
    // ADDING ITEMS FUNCTION ====================================
    function addItem (className){
        $('.history').prepend(`<li class="${className}"><span>${item}</span><span>${sign}${amount}</span></li>`);

        // hide error
        $('.error').addClass('hide');
        $('.error').removeClass('show');
    }

    // CALCULATING TOTAL INCOME OR EXPENSE FUNCTION ======================
    function addIncomeExpense(className){
        let current = parseFloat($(className).text());
        let final = current + amount;

        final = final.toFixed(2);
        $(className).text(final);
    }

    // CALCULATING TOTAL BALANCE (after minus expense in a income) =====================
    function balance(){
        let income = parseFloat($('.total-income').text());
        let expense = parseFloat($('.total-expense').text());

        let totalBalance = income - expense;
        $('.balance span').text(totalBalance);
    }

    // -------------------------------------------------------------------------------------
// =============================================================================================

    let item = event.target['item'].value;  // ITEM     
    let amount = event.target['amount'].value; // AMOUNT
    let sign = amount[0]; // EXPENSE OR INCOME


    $('.item').val('');
    $('.amount').val('');

    let pattern = /^[+-]?[0-9]+\.?[0-9]*$/; // PATTERN FOR NUMBERS ONLY (float or integer) 
    let isNumber = pattern.test(amount);

    // 2 digits only after decimal

    if(amount[0] == '+' || amount[0] == '-')
    amount = parseFloat(amount.slice(1,)).toFixed(2);
    
    else
    amount = parseFloat(amount).toFixed(2);
    
    amount = parseFloat(amount);

    if(sign == '+' && isNumber && amount>0){
        // green color for income
        addItem('incomeLi');
        addIncomeExpense('.total-income');
        balance();
    }
    
    else if(sign == '-' && isNumber && amount>0){
        // red color for expense
        addItem('expenseLi');
        addIncomeExpense('.total-expense');
        balance();
    }

    // show error
    else{
        let anError = '';

        if(!isNumber){
            anError = "Enter a valid amount!";
        }
        else if(amount <= 0){
            anError = "Enter amount must be greater than 0!";
        }
        
        else{
            anError = "Please use + or - before amount!";
        }

        $('.error').addClass('show');
        $('.error').removeClass('hide');
        $('.error').text(anError);
    }

})