// Toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', function() {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
      } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
      }
    });

    // Handle form submission
    document.getElementById('signinForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Show success message then redirect
      const successMessage = document.getElementById('successMessage');
      const form = document.getElementById('signinForm');
      
      form.style.display = 'none';
      successMessage.style.display = 'block';
      
      setTimeout(() => {
        window.location.href = "dashboard.html"; // ✅ Redirects now
      }, 2000);
    });

    // Demo login
    document.getElementById('demoLogin').addEventListener('click', function() {
      document.getElementById('email').value = 'demo@payflow.com';
      document.getElementById('password').value = 'demo123';
      
      setTimeout(() => {
        document.getElementById('signinForm').dispatchEvent(new Event('submit'));
      }, 500);
    });

    // Social login buttons
    document.querySelectorAll('button').forEach(button => {
      if (button.textContent.includes('Google') || button.textContent.includes('Microsoft')) {
        button.addEventListener('click', function() {
          alert(`Demo: Would redirect to ${this.textContent.trim()} OAuth`);
        });
      }
    });

    // Forgot password link
    document.querySelector('a[href="#"]').addEventListener('click', function(e) {
      e.preventDefault();
      alert('Demo: Would redirect to password reset page');
    });