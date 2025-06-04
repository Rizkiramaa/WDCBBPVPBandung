document.getElementById('loanForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const borrower = document.getElementById('borrower').value;
  const itemId = document.getElementById('itemId').value;
  const quantity = document.getElementById('quantity').value;
  const loanDate = document.getElementById('loanDate').value;
  const returnDate = document.getElementById('returnDate').value;

  const response = await fetch('/api/loans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId, borrower, quantity, loan_date: loanDate, return_date: returnDate }),
  });

  if (response.ok) {
    alert('Data peminjaman berhasil ditambahkan!');
    e.target.reset();
  } else {
    alert('Gagal menambahkan data peminjaman.');
  }
});
document.getElementById('loanForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const borrower = document.getElementById('borrower').value.trim();
  const itemId = document.getElementById('itemId').value;
  const quantity = document.getElementById('quantity').value;
  const loanDate = document.getElementById('loanDate').value;
  const returnDate = document.getElementById('returnDate').value;

  if (!borrower || !itemId || !quantity || !loanDate || !returnDate) {
    alert('Semua data wajib diisi!');
    return;
  }

  const response = await fetch('/api/loans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId, borrower, quantity, loan_date: loanDate, return_date: returnDate }),
  });

  if (response.ok) {
    alert('Peminjaman berhasil dicatat!');
    e.target.reset();
  } else {
    const data = await response.json();
    alert(data.error || 'Terjadi kesalahan.');
  }
});
