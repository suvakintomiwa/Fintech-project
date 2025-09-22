        class SignupFlow {
            constructor() {
                this.currentStep = 1;
                this.totalSteps = 5;
                this.userData = {};
                this.otpTimer = null;
                this.countdownValue = 60;
                
                this.init();
            }
            
            init() {
                this.updateProgress();
                this.bindEvents();
                this.setupOtpInputs();
            }
            
            bindEvents() {
                // Form submissions
                document.getElementById('basicForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleBasicForm();
                });
                
                document.getElementById('contactForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleContactForm();
                });
                
                document.getElementById('addressForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleAddressForm();
                });
                
                // Age change for parent email
                document.getElementById('age').addEventListener('input', (e) => {
                    this.toggleParentEmail(parseInt(e.target.value));
                });
                
                // Password toggle
                document.getElementById('passwordToggle').addEventListener('click', () => {
                    this.togglePasswordVisibility();
                });
                
                // OTP verification
                document.getElementById('verifyOtp').addEventListener('click', () => {
                    this.verifyOtp();
                });
                
                document.getElementById('resendCode').addEventListener('click', () => {
                    this.resendOtp();
                });
            }
            
            setupOtpInputs() {
                const otpInputs = document.querySelectorAll('.otp-input');
                otpInputs.forEach((input, index) => {
                    input.addEventListener('input', (e) => {
                        if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                            otpInputs[index + 1].focus();
                        }
                    });
                    
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                            otpInputs[index - 1].focus();
                        }
                    });
                });
            }
            
            validateField(fieldId, validationFn, errorMessage) {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(fieldId + 'Error');
                
                if (!validationFn(field.value)) {
                    field.classList.add('error');
                    field.classList.remove('success');
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                    return false;
                } else {
                    field.classList.remove('error');
                    field.classList.add('success');
                    errorElement.style.display = 'none';
                    return true;
                }
            }
            
            handleBasicForm() {
                let isValid = true;
                
                isValid &= this.validateField('firstName', 
                    (value) => value.trim().length >= 2,
                    'First name must be at least 2 characters'
                );
                
                isValid &= this.validateField('lastName',
                    (value) => value.trim().length >= 2,
                    'Last name must be at least 2 characters'
                );
                
                isValid &= this.validateField('age',
                    (value) => parseInt(value) >= 13 && parseInt(value) <= 100,
                    'Age must be between 13 and 100'
                );
                
                if (isValid) {
                    this.userData.firstName = document.getElementById('firstName').value;
                    this.userData.lastName = document.getElementById('lastName').value;
                    this.userData.middleName = document.getElementById('middleName').value;
                    this.userData.age = parseInt(document.getElementById('age').value);
                    
                    this.nextStep();
                }
            }
            
            handleContactForm() {
                let isValid = true;
                
                isValid &= this.validateField('email',
                    (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                    'Please enter a valid email address'
                );
                
                isValid &= this.validateField('phone',
                    (value) => /^\+?[\d\s\-\(\)]{10,}$/.test(value),
                    'Please enter a valid phone number'
                );
                
                // Validate parent email if user is under 18
                if (this.userData.age < 18) {
                    isValid &= this.validateField('parentEmail',
                        (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                        'Parent email is required for users under 18'
                    );
                }
                
                if (isValid) {
                    this.userData.email = document.getElementById('email').value;
                    this.userData.phone = document.getElementById('phone').value;
                    if (this.userData.age < 18) {
                        this.userData.parentEmail = document.getElementById('parentEmail').value;
                    }
                    
                    this.nextStep();
                }
            }
            
            handleAddressForm() {
                let isValid = true;
                
                isValid &= this.validateField('address',
                    (value) => value.trim().length >= 10,
                    'Please enter a complete address'
                );
                
                isValid &= this.validateField('postalCode',
                    (value) => /^[A-Za-z0-9\s\-]{3,10}$/.test(value),
                    'Please enter a valid postal code'
                );
                
                isValid &= this.validateField('password',
                    (value) => value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
                    'Password must be 8+ characters with uppercase, lowercase, and number'
                );
                
                if (isValid) {
                    this.userData.address = document.getElementById('address').value;
                    this.userData.postalCode = document.getElementById('postalCode').value;
                    this.userData.referralCode = document.getElementById('referralCode').value;
                    this.userData.password = document.getElementById('password').value;
                    
                    this.createAccount();
                }
            }
            
            toggleParentEmail(age) {
                const parentEmailGroup = document.getElementById('parentEmailGroup');
                const parentEmailInput = document.getElementById('parentEmail');
                
                if (age < 18) {
                    parentEmailGroup.style.display = 'block';
                    parentEmailInput.required = true;
                } else {
                    parentEmailGroup.style.display = 'none';
                    parentEmailInput.required = false;
                }
            }
            
            togglePasswordVisibility() {
                const passwordInput = document.getElementById('password');
                const passwordIcon = document.querySelector('.password-icon');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    passwordIcon.textContent = '🙉';
                } else {
                    passwordInput.type = 'password';
                    passwordIcon.textContent = '🙈';
                }
            }
            
            createAccount() {
                // Simulate account creation
                const submitBtn = document.querySelector('#addressForm .btn-primary');
                submitBtn.innerHTML = '<div class="loading-spinner"></div>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    this.nextStep();
                    this.startOtpTimer();
                }, 2000);
            }
            
            startOtpTimer() {
                this.countdownValue = 60;
                const countdownElement = document.getElementById('countdown');
                const resendBtn = document.getElementById('resendCode');
                const timerElement = document.getElementById('resendTimer');
                
                resendBtn.classList.add('hidden');
                timerElement.classList.remove('hidden');
                
                this.otpTimer = setInterval(() => {
                    this.countdownValue--;
                    countdownElement.textContent = this.countdownValue;
                    
                    if (this.countdownValue <= 0) {
                        clearInterval(this.otpTimer);
                        timerElement.classList.add('hidden');
                        resendBtn.classList.remove('hidden');
                    }
                }, 1000);
            }
            
            verifyOtp() {
                const otpInputs = document.querySelectorAll('.otp-input');
                const otp = Array.from(otpInputs).map(input => input.value).join('');
                
                if (otp.length !== 6) {
                    alert('Please enter the complete 6-digit code');
                    return;
                }
                
                // Simulate OTP verification
                const verifyBtn = document.getElementById('verifyOtp');
                verifyBtn.innerHTML = '<div class="loading-spinner"></div>';
                verifyBtn.disabled = true;
                
                setTimeout(() => {
                    // For demo, accept any 6-digit code
                    this.nextStep();
                    this.redirectToDashboard();
                }, 2000);
            }
            
            resendOtp() {
                // Simulate resending OTP
                alert('New verification code sent to your email!');
                this.startOtpTimer();
                
                // Clear OTP inputs
                document.querySelectorAll('.otp-input').forEach(input => {
                    input.value = '';
                });
                document.getElementById('otp1').focus();
            }
            
            redirectToDashboard() {
                setTimeout(() => {
                    // Try to redirect to dashboard.html, fallback to alert if file doesn't exist
                    try {
                        window.location.href = 'dashboard.html';
                    } catch (error) {
                        alert('Signup successful! Dashboard page will be available soon.');
                    }
                }, 3000);
            }
            
            nextStep() {
                if (this.currentStep < this.totalSteps) {
                    document.getElementById(`step${this.currentStep}`).classList.remove('active');
                    this.currentStep++;
                    document.getElementById(`step${this.currentStep}`).classList.add('active');
                    this.updateProgress();
                }
            }
            
            updateProgress() {
                const progress = (this.currentStep / this.totalSteps) * 100;
                document.getElementById('progressFill').style.width = `${progress}%`;
            }
        }
        
        // Initialize the signup flow
        document.addEventListener('DOMContentLoaded', () => {
            new SignupFlow();
        });


    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98318e8c63ab71e1',t:'MTc1ODU0MTUzNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
