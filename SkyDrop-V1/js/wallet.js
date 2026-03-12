document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Total Balance
    const balance = await WalletDB.getCoins();
    document.getElementById('total-coins').innerText = balance;

    // 2. Load History
    const historyData = await WalletDB.getHistory();
    renderHistory(historyData);
});

function renderHistory(items) {
    const listContainer = document.getElementById('history-list');
    
    // Agar history khali hai
    if (items.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-5">
                <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" width="80" class="opacity-25 mb-3">
                <p class="text-muted">No transactions yet.<br>Complete a quiz to earn coins!</p>
            </div>
        `;
        return;
    }

    // List items generate karein
    const html = items.map(item => `
        <div class="history-card animate__animated animate__fadeInUp">
            <div>
                <div class="history-title">${item.game}</div>
                <div class="history-date">${item.date}</div>
            </div>
            <div class="reward-amount">+${item.coins}</div>
        </div>
    `).join('');

    listContainer.innerHTML = html;
}
