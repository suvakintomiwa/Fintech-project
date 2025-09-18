// transactions.js
// JavaScript for handling transaction data, filtering, sorting, pagination, and actions
        // Sample transaction data
        const allTransactions = [
            { id: 'TXN-001', customer: 'john.smith@email.com', customerName: 'John Smith', amount: 1250.00, method: 'bitcoin', status: 'completed', date: '2024-01-15T10:30:00Z', fee: 12.50, hash: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
            { id: 'TXN-002', customer: 'sarah.wilson@email.com', customerName: 'Sarah Wilson', amount: 89.99, method: 'credit_card', status: 'pending', date: '2024-01-15T09:15:00Z', fee: 2.70, card: '**** **** **** 4532' },
            { id: 'TXN-003', customer: 'mike.johnson@email.com', customerName: 'Mike Johnson', amount: 2100.00, method: 'ethereum', status: 'completed', date: '2024-01-14T16:45:00Z', fee: 21.00, hash: '0x742d35cc6e4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c' },
            { id: 'TXN-004', customer: 'alex.brown@email.com', customerName: 'Alex Brown', amount: 45.00, method: 'credit_card', status: 'failed', date: '2024-01-14T14:20:00Z', fee: 1.35, card: '**** **** **** 8901', error: 'Insufficient funds' },
            { id: 'TXN-005', customer: 'emma.davis@email.com', customerName: 'Emma Davis', amount: 750.00, method: 'bitcoin', status: 'completed', date: '2024-01-14T11:30:00Z', fee: 7.50, hash: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
            { id: 'TXN-006', customer: 'david.lee@email.com', customerName: 'David Lee', amount: 320.50, method: 'bank_transfer', status: 'pending', date: '2024-01-13T15:10:00Z', fee: 5.00, account: '****1234' },
            { id: 'TXN-007', customer: 'lisa.garcia@email.com', customerName: 'Lisa Garcia', amount: 1500.00, method: 'ethereum', status: 'completed', date: '2024-01-13T12:45:00Z', fee: 15.00, hash: '0x742d35cc6e4c4c4c4c4c4c4c4c4c4c4c4c4c4c4c' },
            { id: 'TXN-008', customer: 'robert.taylor@email.com', customerName: 'Robert Taylor', amount: 99.99, method: 'credit_card', status: 'completed', date: '2024-01-12T18:20:00Z', fee: 3.00, card: '**** **** **** 2468' },
            { id: 'TXN-009', customer: 'jennifer.white@email.com', customerName: 'Jennifer White', amount: 275.00, method: 'bitcoin', status: 'pending', date: '2024-01-12T13:55:00Z', fee: 2.75, hash: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
            { id: 'TXN-010', customer: 'michael.clark@email.com', customerName: 'Michael Clark', amount: 850.00, method: 'bank_transfer', status: 'failed', date: '2024-01-11T10:15:00Z', fee: 8.50, account: '****5678', error: 'Account closed' }
        ];

        let filteredTransactions = [...allTransactions];
        let selectedTransactions = new Set();
        let currentPage = 1;
        let itemsPerPage = 20;
        let sortColumn = 'date';
        let sortDirection = 'desc';

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            renderTransactions();
            setupEventListeners();
        });

        function setupEventListeners() {
            // Search input
            document.getElementById('searchInput').addEventListener('input', function() {
                filterTransactions();
            });

            // Filter dropdowns
            ['dateFilter', 'methodFilter', 'amountFilter'].forEach(id => {
                document.getElementById(id).addEventListener('change', filterTransactions);
            });

            // Status filter buttons
            document.querySelectorAll('.filter-button').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    filterTransactions();
                });
            });
        }

        function filterTransactions() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const dateFilter = document.getElementById('dateFilter').value;
            const methodFilter = document.getElementById('methodFilter').value;
            const amountFilter = document.getElementById('amountFilter').value;
            const statusFilter = document.querySelector('.filter-button.active').dataset.status;

            filteredTransactions = allTransactions.filter(transaction => {
                // Search filter
                const matchesSearch = !searchTerm || 
                    transaction.id.toLowerCase().includes(searchTerm) ||
                    transaction.customer.toLowerCase().includes(searchTerm) ||
                    transaction.customerName.toLowerCase().includes(searchTerm) ||
                    transaction.amount.toString().includes(searchTerm);

                // Status filter
                const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

                // Method filter
                const matchesMethod = methodFilter === 'all' || transaction.method === methodFilter;

                // Amount filter
                let matchesAmount = true;
                if (amountFilter !== 'all') {
                    const amount = transaction.amount;
                    switch (amountFilter) {
                        case '0-100':
                            matchesAmount = amount >= 0 && amount <= 100;
                            break;
                        case '100-500':
                            matchesAmount = amount > 100 && amount <= 500;
                            break;
                        case '500-1000':
                            matchesAmount = amount > 500 && amount <= 1000;
                            break;
                        case '1000+':
                            matchesAmount = amount > 1000;
                            break;
                    }
                }

                return matchesSearch && matchesStatus && matchesMethod && matchesAmount;
            });

            currentPage = 1;
            renderTransactions();
        }

        function renderTransactions() {
            const tbody = document.getElementById('transactionsTableBody');
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageTransactions = filteredTransactions.slice(startIndex, endIndex);

            tbody.innerHTML = '';

            pageTransactions.forEach(transaction => {
                const row = createTransactionRow(transaction);
                tbody.appendChild(row);
            });

            updatePagination();
        }

        function createTransactionRow(transaction) {
            const row = document.createElement('tr');
            row.className = 'transaction-row';
            
            const statusClass = `status-${transaction.status}`;
            const methodIcon = getMethodIcon(transaction.method);
            const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            row.innerHTML = `
                <td class="px-6 py-4">
                    <input type="checkbox" class="transaction-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                           value="${transaction.id}" onchange="updateSelection()">
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">${transaction.id}</div>
                    <button class="text-xs text-blue-600 hover:text-blue-500" onclick="toggleDetails('${transaction.id}')">
                        View Details
                    </button>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">${transaction.customerName}</div>
                    <div class="text-sm text-gray-500">${transaction.customer}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm font-semibold text-gray-900">$${transaction.amount.toFixed(2)}</div>
                    <div class="text-xs text-gray-500">Fee: $${transaction.fee.toFixed(2)}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <span class="mr-2">${methodIcon}</span>
                        <span class="text-sm text-gray-900 capitalize">${transaction.method.replace('_', ' ')}</span>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="${statusClass} text-xs px-2 py-1 rounded-full font-medium capitalize">
                        ${transaction.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                    ${formattedDate}
                </td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2">
                        ${transaction.status === 'completed' ? 
                            `<button class="action-button text-orange-600 hover:text-orange-500 text-xs" onclick="refundTransaction('${transaction.id}')">Refund</button>` : 
                            ''}
                        <button class="action-button text-blue-600 hover:text-blue-500 text-xs" onclick="resendReceipt('${transaction.id}')">Receipt</button>
                        <button class="action-button text-gray-600 hover:text-gray-500 text-xs" onclick="toggleDetails('${transaction.id}')">Details</button>
                    </div>
                </td>
            `;

            // Add expandable details row
            const detailsRow = document.createElement('tr');
            detailsRow.id = `details-${transaction.id}`;
            detailsRow.className = 'expandable-row';
            detailsRow.innerHTML = `
                <td colspan="8" class="px-6 py-4 bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Transaction Details</h4>
                            <p class="text-sm text-gray-600">ID: ${transaction.id}</p>
                            <p class="text-sm text-gray-600">Amount: $${transaction.amount.toFixed(2)}</p>
                            <p class="text-sm text-gray-600">Fee: $${transaction.fee.toFixed(2)}</p>
                            <p class="text-sm text-gray-600">Net: $${(transaction.amount - transaction.fee).toFixed(2)}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Customer Info</h4>
                            <p class="text-sm text-gray-600">Name: ${transaction.customerName}</p>
                            <p class="text-sm text-gray-600">Email: ${transaction.customer}</p>
                            <p class="text-sm text-gray-600">Method: ${transaction.method.replace('_', ' ')}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-2">Payment Info</h4>
                            ${transaction.hash ? `<p class="text-sm text-gray-600">Hash: ${transaction.hash.substring(0, 20)}...</p>` : ''}
                            ${transaction.card ? `<p class="text-sm text-gray-600">Card: ${transaction.card}</p>` : ''}
                            ${transaction.account ? `<p class="text-sm text-gray-600">Account: ${transaction.account}</p>` : ''}
                            ${transaction.error ? `<p class="text-sm text-red-600">Error: ${transaction.error}</p>` : ''}
                        </div>
                    </div>
                </td>
            `;

            row.appendChild(detailsRow);
            return row;
        }

        function getMethodIcon(method) {
            const icons = {
                bitcoin: '₿',
                ethereum: 'Ξ',
                credit_card: '💳',
                bank_transfer: '🏦'
            };
            return icons[method] || '💳';
        }

        function toggleDetails(transactionId) {
            const detailsRow = document.getElementById(`details-${transactionId}`);
            detailsRow.classList.toggle('expanded');
        }

        function updateSelection() {
            const checkboxes = document.querySelectorAll('.transaction-checkbox');
            selectedTransactions.clear();
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedTransactions.add(checkbox.value);
                }
            });

            const bulkActions = document.getElementById('bulkActions');
            const selectedCount = document.getElementById('selectedCount');
            
            if (selectedTransactions.size > 0) {
                bulkActions.style.display = 'block';
                selectedCount.textContent = `${selectedTransactions.size} transaction${selectedTransactions.size > 1 ? 's' : ''} selected`;
            } else {
                bulkActions.style.display = 'none';
            }
        }

        function toggleSelectAll() {
            const selectAllCheckbox = document.getElementById('selectAllCheckbox');
            const checkboxes = document.querySelectorAll('.transaction-checkbox');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            
            updateSelection();
        }

        function selectAll() {
            const checkboxes = document.querySelectorAll('.transaction-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = true);
            document.getElementById('selectAllCheckbox').checked = true;
            updateSelection();
        }

        function clearSelection() {
            const checkboxes = document.querySelectorAll('.transaction-checkbox');
            checkboxes.forEach(checkbox => checkbox.checked = false);
            document.getElementById('selectAllCheckbox').checked = false;
            updateSelection();
        }

        function updatePagination() {
            const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
            const pageNumbers = document.getElementById('pageNumbers');
            const prevButton = document.getElementById('prevButton');
            const nextButton = document.getElementById('nextButton');

            // Update buttons
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;

            // Update page numbers
            pageNumbers.innerHTML = '';
            for (let i = 1; i <= Math.min(totalPages, 5); i++) {
                const button = document.createElement('button');
                button.className = `pagination-button px-3 py-1 border border-gray-300 rounded text-sm ${i === currentPage ? 'bg-blue-600 text-white' : ''}`;
                button.textContent = i;
                button.onclick = () => goToPage(i);
                pageNumbers.appendChild(button);
            }
        }

        function goToPage(page) {
            currentPage = page;
            renderTransactions();
        }

        function previousPage() {
            if (currentPage > 1) {
                currentPage--;
                renderTransactions();
            }
        }

        function nextPage() {
            const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTransactions();
            }
        }

        function updateItemsPerPage() {
            itemsPerPage = parseInt(document.getElementById('itemsPerPage').value);
            currentPage = 1;
            renderTransactions();
        }

        function sortTable(column) {
            if (sortColumn === column) {
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                sortColumn = column;
                sortDirection = 'asc';
            }

            filteredTransactions.sort((a, b) => {
                let aValue = a[column];
                let bValue = b[column];

                if (column === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else if (column === 'amount') {
                    aValue = parseFloat(aValue);
                    bValue = parseFloat(bValue);
                } else if (column === 'customer') {
                    aValue = a.customerName;
                    bValue = b.customerName;
                }

                if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            renderTransactions();
        }

        // Action functions
        function exportTransactions() {
            alert('Demo: Would export all transactions to CSV file');
        }

        function bulkExport() {
            alert(`Demo: Would export ${selectedTransactions.size} selected transactions`);
        }

        function bulkRefund() {
            alert(`Demo: Would process refunds for ${selectedTransactions.size} selected transactions`);
        }

        function refundTransaction(id) {
            alert(`Demo: Would process refund for transaction ${id}`);
        }

        function resendReceipt(id) {
            alert(`Demo: Would resend receipt for transaction ${id}`);
        }
