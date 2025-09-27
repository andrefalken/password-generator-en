class PasswordGenerator {
    constructor() {
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.quantityInput = document.getElementById('quantity');
        this.passwordOutput = document.getElementById('passwordOutput');
        this.passwordLength = document.getElementById('passwordLength');
        this.generationTime = document.getElementById('generationTime');

        this.initEvents();
    }

    initEvents() {
        this.generateBtn.addEventListener('click', () => this.generatePassword());
        this.copyBtn.addEventListener('click', () => this.copyPassword());
        this.quantityInput.addEventListener('change', () => this.updateLengthDisplay());

        // Generate on Enter key in quantity field
        this.quantityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.generatePassword();
        });

        // Initial display
        this.updateLengthDisplay();
    }

    async generatePassword() {
        const quantity = parseInt(this.quantityInput.value);

        if (quantity < 8 || quantity > 50) {
            alert('Please enter a number between 8 and 50');
            return;
        }

        this.setLoading(true);
        const startTime = performance.now();

        try {
            const response = await fetch('/generate_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `quantity=${quantity}`
            });

            const data = await response.json();

            if (response.ok) {
                this.passwordOutput.value = data.password;
                this.passwordLength.textContent = `${data.length} characters`;

                const endTime = performance.now();
                this.generationTime.textContent = `Generated in ${(endTime - startTime).toFixed(0)}ms`;
            } else {
                throw new Error(data.error);
            }

        } catch (error) {
            alert('Error generating password: ' + error.message);
            console.error('Generation error:', error);
        } finally {
            this.setLoading(false);
        }
    }

    copyPassword() {
        if (!this.passwordOutput.value) {
            alert('No password to copy! Generate one first.');
            return;
        }

        this.passwordOutput.select();
        this.passwordOutput.setSelectionRange(0, 99999); // For mobile devices

        try {
            navigator.clipboard.writeText(this.passwordOutput.value);
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
            }, 2000);
        } catch (error) {
            // Fallback for older browsers
            document.execCommand('copy');
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                this.copyBtn.textContent = 'Copy';
            }, 2000);
        }
    }

    setLoading(loading) {
        this.generateBtn.disabled = loading;
        this.generateBtn.textContent = loading ? 'Generating...' : 'Generate Password';
    }

    updateLengthDisplay() {
        this.passwordLength.textContent = `${this.quantityInput.value} characters`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
});