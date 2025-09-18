        // Chart instances
        let revenueTrendChart, paymentMethodsChart, geographicChart, successRateChart, hourlyVolumeChart;
        
        // Data for different time periods
        const analyticsData = {
            '7d': {
                revenue: [12000, 15000, 13000, 18000, 16000, 22000, 25000],
                previousRevenue: [10000, 12000, 11000, 15000, 14000, 18000, 20000],
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                successRate: [98.5, 99.1, 98.8, 99.3, 99.0, 99.2, 99.4],
                hourlyVolume: [5, 3, 2, 1, 2, 4, 8, 15, 25, 35, 45, 52, 58, 62, 55, 48, 42, 38, 32, 28, 22, 18, 12, 8]
            },
            '30d': {
                revenue: [85000, 92000, 88000, 95000, 102000, 98000, 105000, 112000, 108000, 115000, 122000, 118000, 125000, 132000, 128000, 135000, 142000, 138000, 145000, 152000, 148000, 155000, 162000, 158000, 165000, 172000, 168000, 175000, 182000, 178000],
                previousRevenue: [75000, 82000, 78000, 85000, 92000, 88000, 95000, 102000, 98000, 105000, 112000, 108000, 115000, 122000, 118000, 125000, 132000, 128000, 135000, 142000, 138000, 145000, 152000, 148000, 155000, 162000, 158000, 165000, 172000, 168000],
                labels: Array.from({length: 30}, (_, i) => `Day ${i + 1}`),
                successRate: Array.from({length: 30}, () => 98.5 + Math.random() * 1.5),
                hourlyVolume: [8, 5, 3, 2, 3, 6, 12, 22, 38, 52, 68, 78, 85, 92, 88, 82, 75, 68, 58, 48, 38, 28, 18, 12]
            }
        };
        
        // Initialize all charts
        function initializeCharts() {
            initRevenueTrendChart();
            initPaymentMethodsChart();
            initGeographicChart();
            initSuccessRateChart();
            initHourlyVolumeChart();
        }
        
        // Revenue Trend Chart
        function initRevenueTrendChart() {
            const ctx = document.getElementById('revenueTrendChart').getContext('2d');
            const data = analyticsData['7d'];
            
            revenueTrendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Current Period',
                        data: data.revenue,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }, {
                        label: 'Previous Period',
                        data: data.previousRevenue,
                        borderColor: '#D1D5DB',
                        backgroundColor: 'rgba(209, 213, 219, 0.1)',
                        borderWidth: 2,
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
        
        // Payment Methods Chart
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
        
        // Geographic Chart
        function initGeographicChart() {
            const ctx = document.getElementById('geographicChart').getContext('2d');
            
            geographicChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['US', 'UK', 'DE', 'CA', 'FR'],
                    datasets: [{
                        label: 'Revenue',
                        data: [45230, 28150, 19840, 15620, 12340],
                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'],
                        borderRadius: 6
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
                    }
                }
            });
        }
        
        // Success Rate Chart
        function initSuccessRateChart() {
            const ctx = document.getElementById('successRateChart').getContext('2d');
            const data = analyticsData['7d'];
            
            successRateChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Success Rate',
                        data: data.successRate,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
                            min: 97,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Hourly Volume Chart
        function initHourlyVolumeChart() {
            const ctx = document.getElementById('hourlyVolumeChart').getContext('2d');
            const data = analyticsData['7d'];
            
            hourlyVolumeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Array.from({length: 24}, (_, i) => i + ':00'),
                    datasets: [{
                        label: 'Transactions',
                        data: data.hourlyVolume,
                        backgroundColor: '#3B82F6',
                        borderRadius: 4
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
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // Update charts based on time period
        function updateCharts(period) {
            const data = analyticsData[period] || analyticsData['7d'];
            
            // Update revenue trend chart
            revenueTrendChart.data.labels = data.labels;
            revenueTrendChart.data.datasets[0].data = data.revenue;
            revenueTrendChart.data.datasets[1].data = data.previousRevenue;
            revenueTrendChart.update('active');
            
            // Update success rate chart
            successRateChart.data.labels = data.labels;
            successRateChart.data.datasets[0].data = data.successRate;
            successRateChart.update('active');
            
            // Update hourly volume chart
            hourlyVolumeChart.data.datasets[0].data = data.hourlyVolume;
            hourlyVolumeChart.update('active');
        }
        
        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeCharts();
            
            // Time period filter handlers
            document.querySelectorAll('.filter-button').forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    document.querySelectorAll('.filter-button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update charts
                    const period = this.dataset.period;
                    updateCharts(period);
                });
            });
            
            // Export report button
            document.querySelector('button:contains("Export Report")').addEventListener('click', function() {
                alert('Demo: Would generate and download analytics report');
            });
            
            // Navigation handlers
            document.querySelectorAll('nav a').forEach(link => {
                link.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#') {
                        e.preventDefault();
                        const linkText = this.textContent.trim();
                        if (linkText !== 'Analytics') {
                            alert(`Demo: Would navigate to ${linkText} page`);
                        }
                    }
                });
            });
            
            // View All button handler
            document.querySelector('button:contains("View All")').addEventListener('click', function() {
                alert('Demo: Would show detailed product performance page');
            });
        });