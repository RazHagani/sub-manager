const API_URL = '/api/subscriptions';

const form = document.getElementById('subscription-form');
const tableBody = document.getElementById('subscriptions-body');
const submitButton = document.getElementById('submit-button');
const cancelButton = document.getElementById('cancel-button');

const idField = document.getElementById('subscription-id');
const nameField = document.getElementById('name');
const priceField = document.getElementById('price');
const currencyField = document.getElementById('currency');
const billingCycleField = document.getElementById('billing_cycle');
const renewalDateField = document.getElementById('next_renewal_date');
const autoRenewField = document.getElementById('auto_renew');

async function loadSubscriptions() {
  const response = await fetch(API_URL);
  const subscriptions = await response.json();

  tableBody.innerHTML = '';

  if (subscriptions.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty-state">עדיין אין מנויים. הוסף את הראשון למעלה.</td></tr>';
    return;
  }

  for (const sub of subscriptions) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sub.name}</td>
      <td>${sub.price}</td>
      <td>${sub.currency}</td>
      <td>${sub.billing_cycle}</td>
      <td>${sub.next_renewal_date.slice(0, 10)}</td>
      <td>${sub.auto_renew ? 'כן' : 'לא'}</td>
      <td>
        <button type="button" class="btn-edit" onclick="editSubscription(${sub.id})">ערוך</button>
        <button type="button" class="btn-delete" onclick="deleteSubscription(${sub.id})">מחק</button>
      </td>
    `;
    tableBody.appendChild(row);
  }
}

function resetForm() {
  form.reset();
  idField.value = '';
  submitButton.textContent = 'הוסף מנוי';
  cancelButton.style.display = 'none';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    name: nameField.value,
    price: Number(priceField.value),
    currency: currencyField.value,
    billing_cycle: billingCycleField.value,
    next_renewal_date: renewalDateField.value,
    auto_renew: autoRenewField.checked,
  };

  const id = idField.value;
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  resetForm();
  loadSubscriptions();
});

cancelButton.addEventListener('click', resetForm);

async function editSubscription(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const sub = await response.json();

  idField.value = sub.id;
  nameField.value = sub.name;
  priceField.value = sub.price;
  currencyField.value = sub.currency;
  billingCycleField.value = sub.billing_cycle;
  renewalDateField.value = sub.next_renewal_date.slice(0, 10);
  autoRenewField.checked = sub.auto_renew;

  submitButton.textContent = 'עדכן מנוי';
  cancelButton.style.display = 'inline-block';
  form.scrollIntoView({ behavior: 'smooth' });
}

async function deleteSubscription(id) {
  if (!confirm('למחוק את המנוי הזה?')) return;

  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadSubscriptions();
}

loadSubscriptions();
