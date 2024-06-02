const records = [];

document.getElementById('feeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const studentClass = document.getElementById('class').value;
    const amountPaid = parseFloat(document.getElementById('amountPaid').value);
    const balance = parseFloat(document.getElementById('balance').value);
    const fullFees = parseFloat(document.getElementById('fullFees').value);
    const transportCost = parseFloat(document.getElementById('transportCost').value);

    const record = { name, surname, studentClass, amountPaid, balance, fullFees, transportCost };
    records.push(record);

    addRecordToTable(record);
    document.getElementById('feeForm').reset();
});

function addRecordToTable(record) {
    const tbody = document.getElementById('recordsBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${record.name}</td>
        <td>${record.surname}</td>
        <td>${record.studentClass}</td>
        <td>${record.amountPaid}</td>
        <td>${record.balance}</td>
        <td>${record.fullFees}</td>
        <td>${record.transportCost}</td>
        <td><button onclick="generateReceipt('${record.name}', '${record.surname}', '${record.studentClass}', ${record.amountPaid}, ${record.balance}, ${record.fullFees}, ${record.transportCost})">Generate Receipt</button></td>
    `;

    tbody.appendChild(row);
}

function searchRecords() {
    const query = document.getElementById('search').value.toLowerCase();
    const tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '';

    const filteredRecords = records.filter(record => 
        record.name.toLowerCase().includes(query) || record.surname.toLowerCase().includes(query)
    );

    filteredRecords.forEach(record => addRecordToTable(record));
}

function filterByPercentage() {
    const percentage = document.getElementById('queryPercentage').value;
    if (!percentage) return;

    const tbody = document.getElementById('recordsBody');
    tbody.innerHTML = '';

    const filteredRecords = records.filter(record => {
        const totalFees = record.fullFees + record.transportCost;
        const paidPercentage = (record.amountPaid / totalFees) * 100;
        return paidPercentage >= percentage;
    });

    filteredRecords.forEach(record => addRecordToTable(record));
}

function generateReceipt(name, surname, studentClass, amountPaid, balance, fullFees, transportCost) {
    document.getElementById('receiptName').textContent = name;
    document.getElementById('receiptSurname').textContent = surname;
    document.getElementById('receiptClass').textContent = studentClass;
    document.getElementById('receiptAmountPaid').textContent = amountPaid.toFixed(2);
    document.getElementById('receiptBalance').textContent = balance.toFixed(2);
    document.getElementById('receiptFullFees').textContent = fullFees.toFixed(2);
    document.getElementById('receiptTransportCost').textContent = transportCost.toFixed(2);

    document.getElementById('receipt').classList.remove('hidden');
}

function closeReceipt() {
    document.getElementById('receipt').classList.add('hidden');
}

function downloadReceipt() {
    const receipt = document.getElementById('receipt');
    const opt = {
        margin: 1,
        filename: 'receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(receipt).set(opt).save();
}