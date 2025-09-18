// dashboard.js
        // Chart instances
        let revenueChart, paymentMethodsChart;
        
        // Initialize charts when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeCharts();
            
            // Add click handlers for navigation
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault();
                        const linkText = this.textContent.trim();
                        if (linkText !== 'Dashboard') {
                            alert(`Demo: Would navigate to ${linkText} page`);
                        }
                    }
                });
            });
            
            // Add click handlers for action buttons
            document.querySelectorAll('.action-button').forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.textContent.trim();
                    alert(`Demo: Would ${action.toLowerCase()}`);
                });
            });
            
            // Add click handler for new payment button
            document.querySelector('button:contains("New Payment")').addEventListener('click', function() {
                alert('Demo: Would open new payment form');
            });
        });
        
        // Initialize Revenue Chart
        function initRevenueChart() {
            const ctx = document.getElementById('revenueChart').getContext('2d');
            
            revenueChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Revenue',
                        data: [12000, 15000, 13000, 18000, 16000, 22000, 25000],
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'K';
                                }
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            });
        }
        
        // Initialize Payment Methods Chart
        function initPaymentMethodsChart() {
            const ctx = document.getElementById('paymentMethodsChart').getContext('2d');
            
            paymentMethodsChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Bitcoin', 'Credit Cards', 'Ethereum'],
                    datasets: [{
                        data: [45.2, 34.8, 20.0],
                        backgroundColor: ['#F59E0B', '#3B82F6', '#8B5CF6'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    cutout: '70%'
                }
            });
        }
        
        // Initialize all charts
        function initializeCharts() {
            initRevenueChart();
            initPaymentMethodsChart();
        }