
        class Dashboard {
            constructor() {
                this.currentTab = 'overview';
                this.init();
            }

            init() {
                this.bindEvents();
                this.initializeToggles();
                this.simulateRealTimeUpdates();
            }

            bindEvents() {
                // Navigation
                document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        const tab = e.currentTarget.dataset.tab;
                        this.switchTab(tab);
                    });
                });

                // Form submissions
                document.getElementById('sendPaymentForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleSendPayment();
                });

                document.getElementById('invoiceForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleCreateInvoice();
                });

                // Quick actions
                document.querySelectorAll('.action-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        if (!e.target.closest('form')) {
                            this.handleQuickAction(e.currentTarget);
                        }
                    });
                });
            }

            switchTab(tabName) {
                // Update navigation
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

                // Update content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabName).classList.add('active');

                // Update page title
                const titles = {
                    overview: 'Dashboard Overview',
                    payments: 'Payment Management',
                    wallets: 'Currency & Crypto Wallets',
                    merchant: 'Merchant Tools',
                    analytics: 'Analytics & Insights',
                    security: 'Security & Compliance'
                };
                document.getElementById('pageTitle').textContent = titles[tabName];

                this.currentTab = tabName;
            }

            initializeToggles() {
                document.querySelectorAll('.toggle-switch').forEach(toggle => {
                    toggle.addEventListener('click', () => {
                        toggle.classList.toggle('active');
                    });
                });
            }

            handleSendPayment() {
                const form = document.getElementById('sendPaymentForm');
                const formData = new FormData(form);
                
                // Simulate payment processing
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></span> Processing...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Payment sent successfully!');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }

            handleCreateInvoice() {
                const form = document.getElementById('invoiceForm');
                
                // Simulate invoice creation
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span style="display: inline-block; width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></span> Creating...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Invoice created successfully!');
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }

            handleQuickAction(button) {
                const action = button.querySelector('span:last-child').textContent;
                
                switch(action) {
                    case 'Send':
                        this.switchTab('payments');
                        break;
                    case 'Receive':
                        alert('Receive payment feature - Generate QR code or share wallet address');
                        break;
                    case 'Exchange':
                        alert('Currency exchange feature - Convert between currencies and crypto');
                        break;
                    case 'Invest':
                        alert('Investment feature - Access to DeFi and traditional investment options');
                        break;
                    case 'Copy API Key':
                        navigator.clipboard.writeText('pk_live_51H7z2bKuuiPiPi...');
                        alert('API key copied to clipboard!');
                        break;
                    case 'Documentation':
                        window.open('https://docs.example.com', '_blank', 'noopener,noreferrer');
                        break;
                    default:
                        alert(`${action} feature coming soon!`);
                }
            }

            simulateRealTimeUpdates() {
                // Simulate real-time balance updates
                setInterval(() => {
                    const balanceElement = document.querySelector('.balance-amount');
                    if (balanceElement && this.currentTab === 'overview') {
                        const currentBalance = parseFloat(balanceElement.textContent.replace('$', '').replace(',', ''));
                        const change = (Math.random() - 0.5) * 10; // Random change between -5 and +5
                        const newBalance = currentBalance + change;
                        balanceElement.textContent = `$${newBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    }
                }, 10000); // Update every 10 seconds

                // Simulate new transactions
                setInterval(() => {
                    if (this.currentTab === 'overview') {
                        this.addRandomTransaction();
                    }
                }, 30000); // Add new transaction every 30 seconds
            }

            addRandomTransaction() {
                const transactions = [
                    { type: 'receive', name: 'Sarah Wilson', amount: 750, time: 'Just now' },
                    { type: 'send', name: 'Mike Chen', amount: 320, time: 'Just now' },
                    { type: 'receive', name: 'Emma Davis', amount: 1200, time: 'Just now' }
                ];

                const randomTransaction = transactions[Math.floor(Math.random() * transactions.length)];
                const transactionsList = document.querySelector('.card .transaction-item');
                
                if (transactionsList) {
                    const newTransaction = document.createElement('div');
                    newTransaction.className = 'transaction-item';
                    newTransaction.style.opacity = '0';
                    newTransaction.style.transform = 'translateY(-10px)';
                    
                    newTransaction.innerHTML = `
                        <div class="transaction-info">
                            <div class="transaction-icon ${randomTransaction.type}">${randomTransaction.type === 'receive' ? '📥' : '📤'}</div>
                            <div class="transaction-details">
                                <h4>Payment ${randomTransaction.type === 'receive' ? 'Received' : 'Sent'}</h4>
                                <p>${randomTransaction.type === 'receive' ? 'From' : 'To'}: ${randomTransaction.name} • ${randomTransaction.time}</p>
                            </div>
                        </div>
                        <div class="transaction-amount">
                            <div class="amount" style="color: var(--${randomTransaction.type === 'receive' ? 'success' : 'error'});">${randomTransaction.type === 'receive' ? '+' : '-'}$${randomTransaction.amount.toLocaleString()}.00</div>
                            <span class="status completed">Completed</span>
                        </div>
                    `;
                    
                    transactionsList.parentNode.insertBefore(newTransaction, transactionsList);
                    
                    // Animate in
                    setTimeout(() => {
                        newTransaction.style.transition = 'all 0.3s ease';
                        newTransaction.style.opacity = '1';
                        newTransaction.style.transform = 'translateY(0)';
                    }, 100);
                    
                    // Remove oldest transaction if more than 5
                    const allTransactions = document.querySelectorAll('.transaction-item');
                    if (allTransactions.length > 5) {
                        allTransactions[allTransactions.length - 1].remove();
                    }
                }
            }
        }

        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', () => {
            new Dashboard();
        });

        // Add CSS animation for spinner
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);


        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9831a0e192846349',t:'MTc1ODU0MjI4NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

