class CurrencyConverter {
    constructor() {
        this.exchangeRates = {};
        this.baseCurrency = 'USD';
        this.lastUpdate = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadExchangeRates();
        this.updatePopularConversions();
        this.performInitialConversion();
    }

    setupEventListeners() {
        // Éléments DOM
        this.amountInput = document.getElementById('amount');
        this.fromCurrencySelect = document.getElementById('from-currency');
        this.toCurrencySelect = document.getElementById('to-currency');
        this.convertBtn = document.getElementById('convert-btn');
        this.swapBtn = document.getElementById('swap-btn');
        this.resultSection = document.getElementById('result-section');
        this.resultAmount = document.getElementById('result-amount');
        this.resultRate = document.getElementById('result-rate');
        this.updateTime = document.getElementById('update-time');
        this.loadingOverlay = document.getElementById('loading-overlay');

        // Événements
        this.amountInput.addEventListener('input', () => this.performConversion());
        this.fromCurrencySelect.addEventListener('change', () => this.performConversion());
        this.toCurrencySelect.addEventListener('change', () => this.performConversion());
        this.convertBtn.addEventListener('click', () => this.performConversion());
        this.swapBtn.addEventListener('click', () => this.swapCurrencies());

        // Conversion automatique lors de la saisie
        let timeout;
        this.amountInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.performConversion(), 500);
        });
    }

    async loadExchangeRates() {
        try {
            this.showLoading(true);
            
            // Utilisation de l'API gratuite ExchangeRate-API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des taux de change');
            }

            const data = await response.json();
            this.exchangeRates = data.rates;
            this.lastUpdate = new Date();
            
            // Ajout du taux de base (USD)
            this.exchangeRates.USD = 1;
            
            this.updateLastUpdatedTime();
            console.log('Taux de change chargés:', this.exchangeRates);
            
        } catch (error) {
            console.error('Erreur:', error);
            this.showError('Impossible de charger les taux de change. Utilisation de taux fictifs pour la démonstration.');
            this.loadFallbackRates();
        } finally {
            this.showLoading(false);
        }
    }

    loadFallbackRates() {
        // Taux fictifs pour la démonstration (basés sur des approximations récentes)
        this.exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.73,
            JPY: 110.5,
            CAD: 1.25,
            CHF: 0.92,
            AUD: 1.35,
            CNY: 6.45,
            INR: 74.5,
            BRL: 5.2,
            RUB: 75.0,
            KRW: 1150,
            MXN: 20.5,
            SGD: 1.35,
            HKD: 7.8,
            NZD: 1.45,
            SEK: 8.5,
            NOK: 8.8,
            DKK: 6.2,
            PLN: 3.8,
            CZK: 21.5,
            HUF: 300,
            TRY: 8.5,
            ZAR: 15.2,
            THB: 32.5,
            MYR: 4.15,
            IDR: 14250,
            PHP: 50.5,
            VND: 23000,
            EGP: 15.7,
            NGN: 410,
            BDT: 85.2,
            PKR: 155,
            SAR: 3.75,
            AED: 3.67,
            QAR: 3.64,
            KWD: 0.30,
            BHD: 0.38,
            OMR: 0.38,
            JOD: 0.71,
            LBP: 1500,
            ILS: 3.2,
            CLP: 750,
            COP: 3800,
            ARS: 95,
            PEN: 3.8,
            UYU: 42.5,
            BOB: 6.9,
            PYG: 6800,
            CRC: 620,
            GTQ: 7.7,
            HNL: 24.2,
            NIO: 35.2,
            DOP: 58.5,
            JMD: 150,
            TTD: 6.8,
            BBD: 2.0,
            XCD: 2.7,
            BZD: 2.0,
            GYD: 208,
            SRD: 21.5,
            BMD: 1.0,
            KYD: 0.83,
            FJD: 2.1,
            WST: 2.6,
            TOP: 2.3,
            VUV: 110,
            SBD: 8.2,
            PGK: 3.5,
            KMF: 440,
            MUR: 40.5,
            SCR: 13.5,
            MVR: 15.4,
            LKR: 200,
            NPR: 120,
            MMK: 1650,
            LAK: 9500,
            KHR: 4100,
            MNT: 2850,
            KZT: 430,
            UZS: 10500,
            TJS: 11.3,
            TMT: 3.5,
            GEL: 3.1,
            AMD: 520,
            AZN: 1.7,
            BYN: 2.5,
            MDL: 17.8,
            UAH: 27.5,
            RSD: 100,
            BGN: 1.66,
            RON: 4.1,
            HRK: 6.3,
            ALL: 105,
            MKD: 52,
            BAM: 1.66,
            MAD: 9.0,
            TND: 2.8,
            DZD: 135,
            LYD: 4.5,
            SDG: 55,
            ETB: 45,
            KES: 110,
            TZS: 2300,
            UGX: 3500,
            RWF: 1000,
            BIF: 2000,
            DJF: 178,
            SOS: 580,
            GHS: 6.0,
            XOF: 550,
            XAF: 550,
            CDF: 2000,
            ZMW: 18.5,
            MWK: 820,
            ZWL: 350,
            NAD: 15.2,
            BWP: 11.0,
            LSL: 15.2,
            SZL: 15.2,
            MOP: 8.0,
            TWD: 28.0,
            BND: 1.35
        };
        this.lastUpdate = new Date();
        this.updateLastUpdatedTime();
    }

    performConversion() {
        const amount = parseFloat(this.amountInput.value) || 0;
        const fromCurrency = this.fromCurrencySelect.value;
        const toCurrency = this.toCurrencySelect.value;

        if (amount <= 0) {
            this.hideResult();
            return;
        }

        const convertedAmount = this.convertCurrency(amount, fromCurrency, toCurrency);
        const rate = this.getExchangeRate(fromCurrency, toCurrency);

        this.displayResult(amount, fromCurrency, convertedAmount, toCurrency, rate);
    }

    convertCurrency(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return amount;
        }

        // Conversion via USD comme devise de base
        const fromRate = this.exchangeRates[fromCurrency];
        const toRate = this.exchangeRates[toCurrency];

        if (!fromRate || !toRate) {
            return amount; // Retourne le montant original si les taux ne sont pas disponibles
        }

        // Conversion: montant -> USD -> devise cible
        const amountInUSD = amount / fromRate;
        const convertedAmount = amountInUSD * toRate;

        return convertedAmount;
    }

    getExchangeRate(fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return 1;
        }

        const fromRate = this.exchangeRates[fromCurrency];
        const toRate = this.exchangeRates[toCurrency];

        if (!fromRate || !toRate) {
            return 1;
        }

        return toRate / fromRate;
    }

    displayResult(originalAmount, fromCurrency, convertedAmount, toCurrency, rate) {
        this.resultAmount.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
        this.resultRate.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        
        this.resultSection.classList.add('show');
        
        // Animation d'apparition
        this.resultSection.style.animation = 'none';
        setTimeout(() => {
            this.resultSection.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }

    hideResult() {
        this.resultSection.classList.remove('show');
    }

    swapCurrencies() {
        const fromCurrency = this.fromCurrencySelect.value;
        const toCurrency = this.toCurrencySelect.value;

        this.fromCurrencySelect.value = toCurrency;
        this.toCurrencySelect.value = fromCurrency;

        this.performConversion();
    }

    updatePopularConversions() {
        const popularPairs = [
            { from: 'USD', to: 'EUR', name: 'USD → EUR' },
            { from: 'EUR', to: 'USD', name: 'EUR → USD' },
            { from: 'USD', to: 'GBP', name: 'USD → GBP' },
            { from: 'USD', to: 'JPY', name: 'USD → JPY' },
            { from: 'EUR', to: 'GBP', name: 'EUR → GBP' },
            { from: 'USD', to: 'CAD', name: 'USD → CAD' }
        ];

        const container = document.getElementById('popular-conversions');
        const grid = container.querySelector('.conversion-grid');
        grid.innerHTML = '';

        popularPairs.forEach(pair => {
            const rate = this.getExchangeRate(pair.from, pair.to);
            const convertedAmount = this.convertCurrency(1, pair.from, pair.to);
            
            const item = document.createElement('div');
            item.className = 'conversion-item';
            item.innerHTML = `
                <div class="pair">${pair.name}</div>
                <div class="rate">${convertedAmount.toFixed(4)} ${pair.to}</div>
                <div class="change">1 ${pair.from} = ${rate.toFixed(4)} ${pair.to}</div>
            `;

            // Ajouter un événement pour utiliser cette conversion
            item.addEventListener('click', () => {
                this.fromCurrencySelect.value = pair.from;
                this.toCurrencySelect.value = pair.to;
                this.amountInput.value = '1';
                this.performConversion();
                
                // Scroll vers le convertisseur
                document.querySelector('.converter-card').scrollIntoView({
                    behavior: 'smooth'
                });
            });

            grid.appendChild(item);
        });
    }

    performInitialConversion() {
        // Effectuer une conversion initiale avec les valeurs par défaut
        setTimeout(() => {
            this.performConversion();
        }, 100);
    }

    updateLastUpdatedTime() {
        if (this.lastUpdate) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            this.updateTime.textContent = this.lastUpdate.toLocaleString('fr-FR', options);
        }
    }

    showLoading(show) {
        if (show) {
            this.loadingOverlay.classList.add('show');
        } else {
            this.loadingOverlay.classList.remove('show');
        }
    }

    showError(message) {
        // Créer une notification d'erreur
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc3545;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
            z-index: 1001;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Méthode pour rafraîchir les taux de change
    async refreshRates() {
        await this.loadExchangeRates();
        this.updatePopularConversions();
        this.performConversion();
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    const converter = new CurrencyConverter();
    
    // Rafraîchir les taux toutes les 30 minutes
    setInterval(() => {
        converter.refreshRates();
    }, 30 * 60 * 1000);
    
    // Ajouter un raccourci clavier pour la conversion (Entrée)
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            converter.performConversion();
        }
    });
});

// Fonction utilitaire pour formater les nombres
function formatNumber(number, decimals = 2) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(number);
}

// Fonction pour obtenir le nom complet de la devise
function getCurrencyName(code) {
    const currencyNames = {
        'USD': 'Dollar US',
        'EUR': 'Euro',
        'GBP': 'Livre Sterling',
        'JPY': 'Yen Japonais',
        'CAD': 'Dollar Canadien',
        'CHF': 'Franc Suisse',
        'AUD': 'Dollar Australien',
        'CNY': 'Yuan Chinois'
    };
    return currencyNames[code] || code;
} 