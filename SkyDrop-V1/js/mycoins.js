const DB_NAME = 'QuizWalletDB';
const DB_VERSION = 1;

const WalletDB = {
    async init() {
        return new Promise((resolve) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('wallet')) db.createObjectStore('wallet', { keyPath: 'id' });
                if (!db.objectStoreNames.contains('history')) db.createObjectStore('history', { autoIncrement: true });
            };
            request.onsuccess = () => resolve(request.result);
        });
    },

    async getCoins() {
        const db = await this.init();
        return new Promise((resolve) => {
            const tx = db.transaction('wallet', 'readonly');
            const req = tx.objectStore('wallet').get('user');
            req.onsuccess = () => resolve(req.result ? req.result.coins : 0);
        });
    },

    async addReward(amount, quizName) {
        const db = await this.init();
        const tx = db.transaction(['wallet', 'history'], 'readwrite');
        
        // Update Balance
        const wallet = tx.objectStore('wallet');
        const userReq = wallet.get('user');
        userReq.onsuccess = () => {
            let data = userReq.result || { id: 'user', coins: 0 };
            data.coins += amount;
            wallet.put(data);
        };

        // Update History
        const history = tx.objectStore('history');
        history.add({
            game: quizName,
            coins: amount,
            date: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        });
    },

    async getHistory() {
        const db = await this.init();
        return new Promise((resolve) => {
            const tx = db.transaction('history', 'readonly');
            const req = tx.objectStore('history').getAll();
            req.onsuccess = () => resolve(req.result.reverse());
        });
    }
};

// Global function as per requirements
async function mycoin(quizTitle) {
    await WalletDB.addReward(10, quizTitle);
}
