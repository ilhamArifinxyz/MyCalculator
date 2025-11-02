document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    // Fungsi untuk mengupdate layar
    function updateDisplay() {
        display.value = currentInput;
    }

    // Fungsi untuk menangani input angka dan titik
    function handleNumber(value) {
        if (value === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    // Fungsi untuk menangani operator
    function handleOperator(value) {
        if (operator !== null && previousInput !== '') {
            calculate(); // Hitung dulu jika ada operasi tertunda
        }
        previousInput = currentInput;
        operator = value;
        currentInput = '0'; // Siapkan untuk input angka berikutnya
    }

    // Fungsi untuk menghitung
    function calculate() {
        if (operator === null || previousInput === '') return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Tidak bisa membagi dengan 0");
                    handleClear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }

    // Fungsi untuk 'Clear' (C)
    function handleClear() {
        currentInput = '0';
        previousInput = '';
        operator = null;
    }

    // Fungsi untuk 'Delete' (DEL)
    function handleDelete() {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
    }

    // Fungsi untuk persen (%)
    function handlePercent() {
        currentInput = (parseFloat(currentInput) / 100).toString();
    }

    // Event listener utama untuk semua tombol
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                handleClear();
            } else if (value === 'DEL') {
                handleDelete();
            } else if (value === '%') {
                handlePercent();
            } else if (value === '=') {
                calculate();
            } else {
                // Ini untuk operator (+, -, *, /)
                handleOperator(value);
            }
            
            updateDisplay();
        });
    });

    // Inisialisasi layar
    updateDisplay();
});