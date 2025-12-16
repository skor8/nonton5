class RedirectHandler {
    constructor(options = {}) {
        this.options = {
            targetUrl: 'https://gol7082.co',
            delay: 500, // 5 detik
            showCountdown: true,
            enableCancel: true,
            ...options
        };
        
        this.countdown = this.options.delay / 1000;
        this.redirectTimer = null;
        this.isCancelled = false;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupRedirect());
        } else {
            this.setupRedirect();
        }
    }

    setupRedirect() {
        this.startCountdown();
        this.setupEventListeners();
    }

    startCountdown() {
        const countdownElement = document.getElementById('countdown-timer');
        
        this.redirectTimer = setInterval(() => {
            if (this.isCancelled) {
                clearInterval(this.redirectTimer);
                return;
            }
            
            this.countdown--;
            
            if (countdownElement) {
                countdownElement.textContent = this.countdown;
            }
            
            if (this.countdown <= 0) {
                clearInterval(this.redirectTimer);
                this.performRedirect();
            }
        }, 1000);
    }

    setupEventListeners() {
        const redirectNowBtn = document.getElementById('redirect-now-btn');
        if (redirectNowBtn) {
            redirectNowBtn.addEventListener('click', () => {
                this.performRedirect();
            });
        }

        const cancelRedirectBtn = document.getElementById('cancel-redirect-btn');
        if (cancelRedirectBtn) {
            cancelRedirectBtn.addEventListener('click', () => {
                this.cancelRedirect();
            });
        }
    }

    performRedirect() {
        if (this.isCancelled) return;
        window.location.href = this.options.targetUrl;
    }

    cancelRedirect() {
        this.isCancelled = true;
        const banner = document.getElementById('redirect-banner');
        if (banner) {
            banner.innerHTML = `
                <div style="background-color: #28a745; color: white; padding: 10px;">
                    <strong>✅ Redirect dibatalkan</strong><br>
                    Anda tetap berada di halaman ini.
                </div>
            `;
        }
    }
}

// Inisialisasi
const redirectHandler = new RedirectHandler();
redirectHandler.init();
