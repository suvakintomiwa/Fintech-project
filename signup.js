// signup.js
// Step 1 → Step 2
    document.getElementById('step1Form').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('step1Form').style.display = 'none';
      document.getElementById('step2Form').style.display = 'block';
      document.getElementById('step1').className = 'step completed';
      document.getElementById('step2').className = 'step active';
    });

    // Step 2 → Step 3
    document.getElementById('step2Form').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('step2Form').style.display = 'none';
      document.getElementById('step3Form').style.display = 'block';
      document.getElementById('step2').className = 'step completed';
      document.getElementById('step3').className = 'step active';
    });

    // Step 3 → Dashboard
    document.getElementById('step3Form').addEventListener('submit', function(e) {
      e.preventDefault();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;

      if (!password || !confirmPassword || !terms) {
        alert('Please fill in all required fields and accept the terms');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const successMessage = document.getElementById('successMessage');
      const form = document.getElementById('step3Form');
      form.style.display = 'none';
      successMessage.style.display = 'block';

      document.getElementById('step3').className = 'step completed';

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    });