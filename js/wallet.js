
        let db;
        const request = indexedDB.open("QuizWallet", 1);

        request.onsuccess = function(e) {
            db = e.target.result;
            // Short delay to demonstrate skeleton effect
            setTimeout(() => {
                loadCoins();
                loadHistory();
            }, 800);
        };

        function loadCoins() {
            const tx = db.transaction("wallet", "readonly");
            const store = tx.objectStore("wallet");
            const get = store.get("user");
            get.onsuccess = () => {
                const coins = get.result ? get.result.coins : 0;
                document.getElementById("coinAmount").innerText = coins.toLocaleString();
            };
        }

        function loadHistory() {
            const tx = db.transaction("history", "readonly");
            const store = tx.objectStore("history");
            const items = [];

            store.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;
                if (cursor) {
                    items.push(cursor.value);
                    cursor.continue();
                } else {
                    renderUI(items);
                }
            };
        }

        function renderUI(items) {
            const list = document.getElementById("historyList");
            
            if (items.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <i class="bi bi-emoji-expressionless fs-1"></i>
                        <p class="mt-3">No history found</p>
                    </div>`;
                return;
            }

            items.reverse();

            list.innerHTML = items.map(item => {
                // Get first letter of game name for icon
                const initial = item.game ? item.game.charAt(0).toUpperCase() : 'G';
                return `
                <div class="history-card">
                    <div class="game-icon">${initial}</div>
                    <div class="info-col">
                        <p class="game-name">${item.game}</p>
                        <span class="date-text">${item.date}</span>
                    </div>
                    <div class="amount-col">+${item.coins}</div>
                </div>
                `;
            }).join('');
        }
