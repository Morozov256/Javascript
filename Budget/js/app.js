var budgetValue=0;
var expensesSumValue=0;
var balanceValue=0;
var expenseTitle="";
var expenseValue=0;
var expenseQuantity=0;
var expenseTotal=0;

const list=document.querySelector('#expense-list');

//enter budget
document.getElementById('budget-form').addEventListener('submit',function(e){
	e.preventDefault();
	budgetValue=document.getElementById('budget-input').value;
	var alrmMsg=document.querySelector(".budget-feedback");
	if (budgetValue === "" || budgetValue < 0){
		alrmMsg.innerText="You should enter posivive value!";
		alrmMsg.style.display='block';
	}else{
		alrmMsg.style.display='none';
		document.getElementById('budget-amount').innerHTML=budgetValue;
		balanceValue=budgetValue-expensesSumValue;
		document.getElementById('balance-amount').innerHTML=balanceValue;
		document.getElementById('budget-input').value="";
	}
});

//enter expense
document.getElementById('expense-form').addEventListener('submit',function(e){
	e.preventDefault();
	expenseTitle=document.getElementById('expense-input').value;
	expenseValue=parseInt(document.getElementById('amount-input').value);
	expenseQuantity=document.getElementById('quantity-input').value;
	var alrmMsg=document.querySelector(".expense-feedback");
	if(expenseTitle === ""){
		alrmMsg.innerText="You should enter title of expence!";
		alrmMsg.style.display='block';
	}else{
		alrmMsg.style.display='none';
		if(expenseValue === "" || expenseValue < 0){
			alrmMsg.innerText="You should enter posivive amount!";
			alrmMsg.style.display='block';
		}else{
			if(expenseQuantity === "" || expenseQuantity < 0){
			alrmMsg.innerText="You should enter posivive quantity!";
			alrmMsg.style.display='block';
			}else{
				expenseTotal=expenseValue*expenseQuantity;
				createTr(expenseTitle,expenseValue,expenseQuantity,expenseTotal);
				expensesSumValue+=expenseTotal;
				balanceValue=budgetValue-expensesSumValue;
				document.getElementById('expense-amount').innerHTML=expensesSumValue;
				document.getElementById('balance-amount').innerHTML=balanceValue;
				document.getElementById('expense-input').value="";
				document.getElementById('amount-input').value="";
				document.getElementById('quantity-input').value=1;
			}
		}
	}
});

//create division for new expense
function createTr(title,value,quantity,total){
	const insBlock=document.createElement('tr');
	insBlock.innerHTML=`
		<td class="name left">`+title+`</td>
		<td class="data right">`+value+`</td>
		<td class="data right">`+quantity+`</td>
		<td class="data right">`+total+`</td>
		<td class="butt">
			<a>
				<img class="edit" src="icons/edit.png">
			</a>
		</td>
		<td class="butt">
			<a>
				<img class='delete' src="icons/delete.png">
			</a>
		</td>
	`;
	list.appendChild(insBlock);
};

//delete division for expense
list.addEventListener('click',function(e){
	if(e.target.className=='delete'){
		var toVal=e.target.parentElement.parentElement.parentElement;
		console.log(toVal);
		expenseValue=parseInt(toVal.getElementsByTagName('td')[3].textContent);
		expensesSumValue-=expenseValue;
		balanceValue=budgetValue-expensesSumValue;
		document.getElementById('expense-amount').innerHTML=expensesSumValue;
		document.getElementById('balance-amount').innerHTML=balanceValue;
		toVal.parentNode.removeChild(toVal);
	}
});

//edit division for expense
list.addEventListener('click',function(e){
	if(e.target.className=='edit'){
		var toVal=e.target.parentElement.parentElement.parentElement;
		expenseTitle=toVal.getElementsByTagName('td')[0].textContent;
		expenseValue=parseInt(toVal.getElementsByTagName('td')[1].textContent);
		expenseQuantity=parseInt(toVal.getElementsByTagName('td')[2].textContent);
		expenseTotal=parseInt(toVal.getElementsByTagName('td')[3].textContent);
		document.getElementById('expense-input').value=expenseTitle;
		document.getElementById('amount-input').value=expenseValue;
		document.getElementById('quantity-input').value=expenseQuantity;
		expensesSumValue-=expenseTotal;
		balanceValue=budgetValue-expensesSumValue;
		document.getElementById('expense-amount').innerHTML=expensesSumValue;
		document.getElementById('balance-amount').innerHTML=balanceValue;
		toVal.parentNode.removeChild(toVal);
	}
});