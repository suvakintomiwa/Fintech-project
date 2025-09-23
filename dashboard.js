
        // Simple script to handle active navigation links
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('.nav-links a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Simulate real-time balance updates
            setInterval(() => {
                const cryptoBalance = document.querySelector('.card:nth-child(2) .balance-amount');
                const amounts = ['$18,245.60', '$18,255.80', '$18,240.20', '$18,260.50'];
                const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
                cryptoBalance.textContent = randomAmount;
            }, 5000);
        });
    