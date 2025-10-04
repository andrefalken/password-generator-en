/* Password Generator Class - Main Aplication */
class PasswordGenerator {
    constructor() {
        console.log('🔧 Initializing PasswordGenerator...');
        this.initializeElements();
        this.initEvents();
    }

/* Element Initialization - Finding HTML Elements */
    initializeElements() {
        // Essential elements for core functionality
        this.generateBtn = document.getElementById('generateBtn');
        this.quantityInput = document.getElementById('quantity');
        this.passwordOutput = document.getElementById('passwordOutput');

        // Strength indicator elements (may not exist initially)
        this.passwordLength = document.getElementById('passwordLength');
        this.generationTime = document.getElementById('generationTime');
        this.copyBtn = document.getElementById('copyBtn');

        // Check if essential elements exist
        if (!this.generateBtn || !this.quantityInput || !this.passwordOutput) {
            console.error('❌ Essential elements not found!');
            this.showError('Error: Page elements not loaded correctly.');
            return;
        }

        console.log('✅ All essential elements loaded!');
    }

    /* Event Listeners - User Interaction Handling */
    initEvents() {
        // Generate password when button is clicked
        this.generateBtn.addEventListener('click', () => this.generatePassword());

        // Copy password if copy button exists
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyPassword());
        }

        // Update length display when quantity changes
        this.quantityInput.addEventListener('change', () => this.updateLengthDisplay());

        // Generate password when Enter key is pressed in quantity field
        this.quantityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generatePassword();
        });

        // Initialize length display
        this.updateLengthDisplay();
    }

    /* Password Generation - Main Functionality */

    async generatePassword() {
        console.log('🎯 Generating password...');

        // Get and validate quantity input
        const quantity = parseInt(this.quantityInput.value);

        if (isNaN(quantity) || quantity < 8 || quantity > 50) {
            this.showError('Please enter a number between 8 and 50');
            return;
        }

        // Show loading state and start timer
        this.setLoading(true);
        const startTime = performance.now();

        try {
            console.log('📤 Sending request to server...');

            // Send POST request to Flask backend
            const response = await fetch('/generate_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `quantity=${quantity}`
            });

            console.log('📥 Response received:', response.status);

            // Check if request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse JSON response
            const data = await response.json();
            console.log('📊 Data received:', data);

            // Check for errors in response
            if (data.error) {
                throw new Error(data.error);
            }

            // Update interface with generated password
            this.passwordOutput.value = data.password;

            // Update password length display
            if (this.passwordLength) {
                this.passwordLength.textContent = `${data.length} characters`;
            }

            // Update generation time if element exists
            if (this.generationTime) {
                const endTime = performance.now();
                this.generationTime.textContent = `Generated in ${(endTime - startTime).toFixed(0)}ms`;
            }

            // Update strength indicator (with safety checks)
            this.updateStrengthIndicator(data.password);

            console.log('✅ Password generated successfully!');

        } catch (error) {
            console.error('❌ Error generating password:', error);
            this.showError('Error generating password: ' + error.message);
        } finally {
            this.setLoading(false);
        }
    }

    /* Password Strength Analysis */
    checkPasswordStrength(password) {
        console.log('🔒 Checking password strength...');

        let score = 0;
        const criteria = {
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumbers: false,
            hasSpecialChar: false,
            isLongEnough: false,
            hasGoodLength: false
        };

        // Check criteria using regular expressions
        criteria.hasUpperCase = /[A-Z]/.test(password);        // Uppercase letters
        criteria.hasLowerCase = /[a-z]/.test(password);        // Lowercase letters
        criteria.hasNumbers = /[0-9]/.test(password);          // Numbers
        criteria.hasSpecialChar = /[!@#$%&*_\-+=?]/.test(password); // Special characters
        criteria.isLongEnough = password.length >= 8;          // Minimum length
        criteria.hasGoodLength = password.length >= 12;        // Good length

        // Calculate score based on criteria
        if (criteria.hasUpperCase) score++;
        if (criteria.hasLowerCase) score++;
        if (criteria.hasNumbers) score++;
        if (criteria.hasSpecialChar) score++;
        if (criteria.isLongEnough) score++;
        if (criteria.hasGoodLength) score++;

        // Determine strength level
        let strength, strengthClass, details;

        if (score <= 2) {
            strength = "Weak";
            strengthClass = "strength-weak";
            details = "Add more character types and length";
        } else if (score <= 4) {
            strength = "Medium";
            strengthClass = "strength-medium";
            details = "Good, but could be stronger";
        } else {
            strength = "Strong";
            strengthClass = "strength-strong";
            details = "Excellent password!";
        }

        // Generate detailed criteria information
        const criteriaDetails = this.generateCriteriaDetails(criteria);

        return {
            strength: strength,
            class: strengthClass,
            score: score,
            maxScore: 6,
            details: details,
            criteria: criteriaDetails
        };
    }

    /* Criteria Details Generation */
    generateCriteriaDetails(criteria) {
        let details = [];

        // Check each criterion and create user-friendly messages
        if (criteria.hasUpperCase) {
            details.push("✓ Contains uppercase letters");
        } else {
            details.push("✗ Add uppercase letters");
        }

        if (criteria.hasLowerCase) {
            details.push("✓ Contains lowercase letters");
        } else {
            details.push("✗ Add lowercase letters");
        }

        if (criteria.hasNumbers) {
            details.push("✓ Contains numbers");
        } else {
            details.push("✗ Add numbers");
        }

        if (criteria.hasSpecialChar) {
            details.push("✓ Contains special characters");
        } else {
            details.push("✗ Add special characters");
        }

        if (criteria.hasGoodLength) {
            details.push("✓ Good length (12+ characters)");
        } else if (criteria.isLongEnough) {
            details.push("✓ Minimum length (8+ characters)");
        } else {
            details.push("✗ Too short (min 8 characters)");
        }

        return details;
    }

    /* Strength Indicator Update */
    updateStrengthIndicator(password) {
        try {
            console.log('📊 Updating strength indicator...');

            // Find strength indicator elements
            const strengthContainer = document.querySelector('.password-strength');
            const strengthText = document.getElementById('strengthText');
            const strengthMeter = document.getElementById('strengthMeter');
            const strengthDetails = document.getElementById('strengthDetails');

            // If elements don't exist, ignore silently
            if (!strengthContainer || !strengthText || !strengthMeter) {
                console.log('ℹ️ Strength elements not found - ignoring');
                return;
            }

            // Reset if no password
            if (!password) {
                strengthText.textContent = '-';
                strengthMeter.style.width = '0%';
                if (strengthDetails) strengthDetails.innerHTML = '';
                strengthContainer.className = 'password-strength';
                return;
            }

            // Get strength information
            const strengthInfo = this.checkPasswordStrength(password);

            // Update interface
            strengthText.textContent = strengthInfo.strength;
            strengthContainer.className = `password-strength ${strengthInfo.class}`;

            // Update strength meter width
            if (strengthInfo.class === 'strength-weak') {
                strengthMeter.style.width = '33%';
            } else if (strengthInfo.class === 'strength-medium') {
                strengthMeter.style.width = '66%';
            } else {
                strengthMeter.style.width = '100%';
            }

            // Update criteria details if element exists
            if (strengthDetails && strengthInfo.criteria) {
                strengthDetails.innerHTML = strengthInfo.criteria.map(criteria => {
                    if (criteria.includes('✓')) {
                        return '<div class="strength-criteria criteria-met">' + criteria + '</div>';
                    } else {
                        return '<div class="strength-criteria criteria-missing">' + criteria + '</div>';
                    }
                }).join('');
            }

            console.log('✅ Strength indicator updated!');

        } catch (error) {
            console.error('❌ Error updating indicator:', error);
        }
    }

    /* Password Copy Functionality */
    copyPassword() {
        // Check if there's a password to copy
        if (!this.passwordOutput || !this.passwordOutput.value) {
            this.showError('No password to copy! Generate one first.');
            this.updateStrengthIndicator('');
            return;
        }

        // Select password text
        this.passwordOutput.select();
        this.passwordOutput.setSelectionRange(0, 99999); // For mobile devices

        try {
            // Modern clipboard API
            navigator.clipboard.writeText(this.passwordOutput.value);
            this.showTempMessage('Password copied to clipboard!', 2000);
        } catch (error) {
            // Fallback for older browsers
            document.execCommand('copy');
            this.showTempMessage('Password copied!', 2000);
        }
    }

    /* Utility Functions */
    setLoading(loading) {
        // Disable button and change text during loading
        this.generateBtn.disabled = loading;
        this.generateBtn.textContent = loading ? 'Generating...' : 'Generate Password';
    }

    updateLengthDisplay() {
        // Update the displayed character count
        if (this.passwordLength) {
            this.passwordLength.textContent = `${this.quantityInput.value} characters`;
        }
    }

    showError(message) {
        // Show error message as alert
        alert(message);
    }

    showTempMessage(message, duration) {
        // Create temporary message element
        const tempDiv = document.createElement('div');
        tempDiv.textContent = message;

        // Style the message
        tempDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #27ae60; color: white; padding: 10px 20px; border-radius: 5px; z-index: 1000;';

        // Add to page
        document.body.appendChild(tempDiv);

        // Remove after specified duration
        setTimeout(() => {
            if (tempDiv.parentNode) {
                document.body.removeChild(tempDiv);
            }
        }, duration);
    }
}

/* Application Initialization */
// Safe initialization - wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - initializing application...');
    try {
        // Create PasswordGenerator instance
        new PasswordGenerator();
        console.log('🎉 Application initialized successfully!');
    } catch (error) {
        console.error('💥 Error initializing application:', error);
    }
});