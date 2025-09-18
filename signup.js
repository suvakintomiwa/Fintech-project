        let currentStep = 1;
        const totalSteps = 3;

        // Hide splash screen and show main content
        function hideSplash() {
            document.getElementById('splashScreen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('splashScreen').classList.add('hidden');
                document.getElementById('mainContent').classList.remove('hidden');
            }, 800);
        }

        // Auto-hide splash screen after 3 seconds
        setTimeout(hideSplash, 3000);

        // Step navigation
        function nextStep() {
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    document.getElementById(`step${currentStep}`).classList.add('hidden');
                    currentStep++;
                    document.getElementById(`step${currentStep}`).classList.remove('hidden');
                    updateProgress();
                }
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                document.getElementById(`step${currentStep}`).classList.add('hidden');
                currentStep--;
                document.getElementById(`step${currentStep}`).classList.remove('hidden');
                updateProgress();
            }
        }

        function updateProgress() {
            const progressBars = document.querySelectorAll('.progress-bar');
            const stepIndicators = document.querySelectorAll('.step-indicator');
            
            stepIndicators.forEach((indicator, index) => {
                indicator.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    indicator.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    indicator.classList.add('active');
                }
            });

            progressBars.forEach((bar, index) => {
                if (index < currentStep - 1) {
                    bar.style.width = '100%';
                } else {
                    bar.style.width = '0%';
                }
            });
        }

        // Age-based parent email field toggle
        document.getElementById('age').addEventListener('input', function() {
            const age = parseInt(this.value);
            const parentEmailField = document.getElementById('parentEmailField');
            const parentEmailInput = document.getElementById('parentEmail');
            
            if (age && age < 18) {
                parentEmailField.classList.add('show');
                parentEmailInput.required = true;
            } else {
                parentEmailField.classList.remove('show');
                parentEmailInput.required = false;
                parentEmailInput.value = '';
                clearValidation('parentEmail');
            }
        });

        // Password strength checker
        document.getElementById('password').addEventListener('input', function() {
            const password = this.value;
            const strengthBar = document.getElementById('strengthBar');
            const strengthText = document.getElementById('strengthText');
            
            let strength = 0;
            let strengthLabel = 'Weak';
            let color = '#EF4444';
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            switch (strength) {
                case 0:
                case 1:
                    strengthLabel = 'Weak';
                    color = '#EF4444';
                    break;
                case 2:
                case 3:
                    strengthLabel = 'Medium';
                    color = '#F59E0B';
                    break;
                case 4:
                case 5:
                    strengthLabel = 'Strong';
                    color = '#10B981';
                    break;
            }
            
            strengthBar.style.width = `${(strength / 5) * 100}%`;
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = strengthLabel;
        });

        // Form validation
        function validateCurrentStep() {
            let isValid = true;
            
            if (currentStep === 1) {
                isValid &= validateField('fullName', 'Please enter your full name');
                isValid &= validateField('address', 'Please enter your address');
                isValid &= validateField('postalCode', 'Please enter a valid postal code');
                isValid &= validateAge();
            } else if (currentStep === 2) {
                isValid &= validateEmail();
                isValid &= validatePhone();
                if (document.getElementById('parentEmail').required) {
                    isValid &= validateParentEmail();
                }
            } else if (currentStep === 3) {
                isValid &= validatePassword();
                isValid &= validateConfirmPassword();
                isValid &= validateTerms();
            }
            
            return isValid;
        }

        function validateField(fieldId, message) {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            if (!value) {
                showError(fieldId, message);
                return false;
            }
            
            clearValidation(fieldId);
            return true;
        }

        function validateAge() {
            const age = parseInt(document.getElementById('age').value);
            
            if (!age || age < 13 || age > 120) {
                showError('age', 'Please enter a valid age (13-120)');
                return false;
            }
            
            clearValidation('age');
            return true;
        }

        function validateEmail() {
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showError('email', 'Please enter your email address');
                return false;
            }
            
            if (!emailRegex.test(email)) {
                showError('email', 'Please enter a valid email address');
                return false;
            }
            
            clearValidation('email');
            return true;
        }

        function validateParentEmail() {
            const parentEmail = document.getElementById('parentEmail').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!parentEmail) {
                showError('parentEmail', 'Parent email is required for users under 18');
                return false;
            }
            
            if (!emailRegex.test(parentEmail)) {
                showError('parentEmail', 'Please enter a valid parent email address');
                return false;
            }
            
            clearValidation('parentEmail');
            return true;
        }

        function validatePhone() {
            const phone = document.getElementById('phoneNumber').value.trim();
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            
            if (!phone) {
                showError('phoneNumber', 'Please enter your phone number');
                return false;
            }
            
            clearValidation('phoneNumber');
            return true;
        }

        function validatePassword() {
            const password = document.getElementById('password').value;
            
            if (!password) {
                showError('password', 'Please enter a password');
                return false;
            }
            
            if (password.length < 8) {
                showError('password', 'Password must be at least 8 characters long');
                return false;
            }
            
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                showError('password', 'Password must contain uppercase, lowercase, and numbers');
                return false;
            }
            
            clearValidation('password');
            return true;
        }

        function validateConfirmPassword() {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!confirmPassword) {
                showError('confirmPassword', 'Please confirm your password');
                return false;
            }
            
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                return false;
            }
            
            clearValidation('confirmPassword');
            return true;
        }

        function validateTerms() {
            const terms = document.getElementById('terms').checked;
            
            if (!terms) {
                showError('terms', 'You must agree to the terms and conditions');
                return false;
            }
            
            clearValidation('terms');
            return true;
        }

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.add('input-invalid');
            field.classList.remove('input-valid');
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }

        function clearValidation(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = document.getElementById(fieldId + 'Error');
            
            field.classList.remove('input-invalid');
            field.classList.add('input-valid');
            errorElement.classList.add('hidden');
        }

        // Form submission
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateCurrentStep()) {
                // Simulate form submission
                const formData = new FormData(this);
                const userData = Object.fromEntries(formData);
                
                // Show success message
                alert('Account created successfully! Welcome to PayFlow!');
                
                // Redirect to dashboard or sign in page
                window.location.href = 'signin.html';
            }
        });

        // Real-time validation
        document.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim()) {
                    // Validate specific field based on current step
                    const fieldId = this.id;
                    
                    switch (fieldId) {
                        case 'email':
                            validateEmail();
                            break;
                        case 'parentEmail':
                            if (this.required) validateParentEmail();
                            break;
                        case 'phoneNumber':
                            validatePhone();
                            break;
                        case 'password':
                            validatePassword();
                            break;
                        case 'confirmPassword':
                            validateConfirmPassword();
                            break;
                        case 'age':
                            validateAge();
                            break;
                        default:
                            if (this.required && !this.value.trim()) {
                                showError(fieldId, 'This field is required');
                            } else {
                                clearValidation(fieldId);
                            }
                    }
                }
            });
        });