const API_URL = '/api/customers';

async function fetchCustomers() {
  const res = await fetch(API_URL);
  const customers = await res.json();
  const list = document.getElementById('customerList');
  list.innerHTML = '';

  customers.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${c.name} - ${c.email} - ${c.phone}</span>`;

    // View Note button
    const noteBtn = document.createElement('button');
    noteBtn.textContent = 'View Note';
    noteBtn.onclick = () => showNoteModal(c.name, c.notes);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
      await fetch(API_URL + '/' + c.id, { method: 'DELETE' });
      fetchCustomers();
    };

    li.appendChild(noteBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Show Note Modal
function showNoteModal(name, note) {
  const modal = document.getElementById('noteModal');
  document.getElementById('noteTitle').textContent = `Note for ${name}`;
  document.getElementById('noteText').textContent = note || "No notes available";
  modal.style.display = 'block';
}

// Close Modal
document.getElementById('closeModal').onclick = () => {
  document.getElementById('noteModal').style.display = 'none';
};

window.onclick = function(event) {
  const modal = document.getElementById('noteModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

document.getElementById('customerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const customer = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    notes: document.getElementById('notes').value
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  });
  e.target.reset();
  fetchCustomers();
});

fetchCustomers();
