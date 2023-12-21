//Заказы
let orders = [];
let closedOrder = [];

let ordersTable;

const addButton = document.getElementById('addButton');
const historyButton = document.getElementById('historyButton');
const firstMain = document.querySelector("main");

function renderOrdersTable(showHistory = false) {
  const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = '';
  
    const ordersToDisplay = showHistory ? closedOrders : orders;

    if (ordersToDisplay.length > 0) {
        const table = document.createElement('table');
        const headerRow = table.insertRow();
        
        const headers = ['ID', 'Номер карты', 'Сумма (руб.)', 'Имя клиента', 'Время добавления', 'Комментарий', ''];
    
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(headerText));
            headerRow.appendChild(th);
        });
    
        ordersToDisplay.forEach(order => {
            const row = table.insertRow();
            Object.keys(order).forEach(key => {
                const cell = row.insertCell();
                if (key === 'timestamp') {
                  cell.appendChild(document.createTextNode(formatTimestamp(order[key])));
                } else {
                  cell.appendChild(document.createTextNode(order[key]));
                }
            });

            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
            ${`<button data-id="${order.id}" onclick="editOrder(this)">Р</button>`}
            ${`<button data-id="${order.id}" onclick="deleteOrder(this)">У</button>`}
            ${`<button data-id="${order.id}" onclick="closeOrder(this)">З</button>`}
          `;
        });

        mainContent.appendChild(table);
    }
} 
function goHome() {
    document.location.href = "index.html";
}
////Добавление заказа
function showAddOrderForm() {
    const addOrderForm = document.querySelector('form');
    addOrderForm.style.display = addOrderForm.style.display == 'block'? 'none' : 'block'; 
    firstMain.style.display = addOrderForm.style.display == 'block'? 'block' : 'none';
}
function addOrder() {
    clearValidationMessages();
  
    const cardNumberInput = document.getElementById('cardNumber');
    const amountInput = document.getElementById('amount');
    const clientNameInput = document.getElementById('clientName');
    const commentInput = document.getElementById('comment');
  
    const cardNumberIsValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumberInput.value);
    const amountIsValid = /^\d{1,6}$/.test(amountInput.value);
    const clientNameIsValid = /^[a-zA-Zа-яА-Я\s]{1,20}$/.test(clientNameInput.value);
    const commentIsValid = commentInput.value.length <= 20;
  
    //Ошибки ввода
    if (!cardNumberIsValid) {
      displayValidationMessage(cardNumberInput, 'Некорректный ввод карты');
    }
    if (!amountIsValid) {
      displayValidationMessage(amountInput, 'Некорректный ввод');
    }
    if (!clientNameIsValid) {
      displayValidationMessage(clientNameInput, 'Некорректный ввод');
    }
    if (!commentIsValid) {
      displayValidationMessage(commentInput, 'Некорректный ввод');
    }
  
    if (cardNumberIsValid && amountIsValid && clientNameIsValid && commentIsValid) {
      const timestamp = new Date();
      
      const newOrder = {
        id: findNextUserId(),
        cardNumber: cardNumberInput.value,
        amount: amountInput.value,
        clientName: clientNameInput.value,
        timestamp,
        comment: commentInput.value,
      };
  
      orders.push(newOrder);
      renderOrdersTable();
  
      document.getElementById('addOrderForm').style.display = 'none';
      firstMain.style.display = document.getElementById('editOrderForm') === null ? 'none' 
                                : document.getElementById('editOrderForm').style.display == 'none'? 'none' : 'block';
      clearFormInputs();
    }
}
function findNextUserId() {
  const allOrders = [...orders];

  for (let i = 1; ; i++) {
      if (!allOrders.some(order => order.id === i)) {
          return i;
      }
  }
}
function formatTimestamp(timestamp) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('ru-RU', options).format(date);
}
function deleteOrder(button) {
  const userId = button.getAttribute('data-id');
  const index = orders.findIndex(order => order.id == userId);
  if (index !== -1) {
      orders.splice(index, 1);
      renderOrdersTable();
  }
}
function updateOrder() {
  clearValidationMessages();
  
  firstMain.style.display = document.getElementById('addOrderForm').style.display == 'none'? 'none' : 'block';

  const editCardNumberInput = document.getElementById('editCardNumber');
  const editAmountInput = document.getElementById('editAmount');
  const editClientNameInput = document.getElementById('editClientName');
  const editCommentInput = document.getElementById('editComment');

  const cardNumberIsValid = /^\d{4} \d{4} \d{4} \d{4}$/.test(editCardNumberInput.value);
  const amountIsValid = /^\d{1,6}$/.test(editAmountInput.value);
  const clientNameIsValid = /^[a-zA-Zа-яА-Я\s]{1,20}$/.test(editClientNameInput.value); 
  const commentIsValid = editCommentInput.value.length <= 20;

  if (!cardNumberIsValid) {
      displayValidationMessage(editCardNumberInput, 'Некорректный ввод карты');
  }

  if (!amountIsValid) {
      displayValidationMessage(editAmountInput, 'Некорректный ввод');
  }

  if (!clientNameIsValid) {
      displayValidationMessage(editClientNameInput, 'Некорректный ввод');
  }

  if (!commentIsValid) {
      displayValidationMessage(editCommentInput, 'Некорректный ввод');
  }

  if (cardNumberIsValid && amountIsValid && clientNameIsValid && commentIsValid) {
      const userId = document.getElementById('editOrderForm').dataset.userId;
      const index = orders.findIndex(order => order.id == userId);

      if (index !== -1) {
          orders[index].cardNumber = editCardNumberInput.value;
          orders[index].amount = editAmountInput.value;
          orders[index].clientName = editClientNameInput.value;
          orders[index].comment = editCommentInput.value;

          document.getElementById('editOrderForm').style.display = 'none';

          clearValidationMessages();

          renderOrdersTable();
      }
  }
} 
function displayValidationMessage(inputElement, message) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
  
    const errorLabel = document.createElement('div');
    errorLabel.className = 'validation-error';
    errorLabel.appendChild(document.createTextNode(message));
  
    errorContainer.appendChild(errorLabel);
    inputElement.insertAdjacentElement('afterend', errorContainer);
}
function clearValidationMessages() {
    const errorContainers = document.querySelectorAll('.error-container');
    errorContainers.forEach(errorContainer => {
      errorContainer.remove();
    });
}
function clearFormInputs() {
    document.getElementById('cardNumber').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('comment').value = '';
}
document.addEventListener("DOMContentLoaded", function () {

  const storedOrders = localStorage.getItem("orders");

  if (storedOrders) {
      orders = JSON.parse(storedOrders);
  }

  renderOrdersTable();
});
window.addEventListener("beforeunload", function () {
  localStorage.setItem("orders", JSON.stringify(orders));
});
function editOrder(button) {
  const userId = button.getAttribute('data-id');
  const orderToEdit = orders.find(order => order.id == userId);

  if (orderToEdit) {
      const editOrderForm = createEditForm(orderToEdit);
      const previousEditForm = document.getElementById('editOrderForm');
      if (previousEditForm) {
          previousEditForm.remove();
      }

      firstMain.appendChild(editOrderForm);
      firstMain.style.display = 'block';
  }
};
function createEditForm(order) {
  const form = document.createElement('form');
  form.id = 'editOrderForm';
  form.dataset.userId = order.id;
  form.style = 'margin-top: 100px; padding: 10px;';

  form.innerHTML = `
  <h2 style="font-size: 20px">Редактировать заказ</h2>
         
  <label for="editCardNumber">Номер карты:</label>
  <input type="text" id="editCardNumber" required data-edit="cardNumber" value="${order.cardNumber}"><br>

  <label for="editAmount">Сумма (руб.):</label>
  <input type="text" id="editAmount" required data-edit="amount" value="${order.amount}"><br>

  <label for="editClientName">Имя клиента:</label>
  <input type="text" id="editClientName" required data-edit="clientName" value="${order.clientName}"><br>

  <label for="editComment">Комментарий:</label>
  <input type="text" id="editComment" data-edit="comment" value="${order.comment}"><br>

  <button type="button" onclick="updateOrder()">Сохранить изменения</button>
  `;

  return form;
};
function closeOrder(button) {
  const userId = button.getAttribute('data-id');
  const orderToClose = orders.find(order => order.id == userId);

  if (orderToClose) {
      orders = orders.filter(order => order.id != userId);

      const closedOrder = { ...orderToClose, id: orderToClose.id };
      closedOrders.push(closedOrder);

      renderOrdersTable();
  }
}

let history = false;

function toggleOrderHistory() {
  
  history = !history;

  if (history) {
      renderOrdersTable(false);
      historyButton.innerText = 'История заказов';
      historyButton.dataset.historyVisible = 'false';
      searchInput.removeAttribute('hidden');
  } else {
      renderOrdersTable(true);
      historyButton.innerText = 'Вернуться';
      historyButton.dataset.historyVisible = 'true';
      searchInput.value = '';
      searchInput.setAttribute('hidden', 'true');
  }
};