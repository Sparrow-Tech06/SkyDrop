```js
// rewardController.js

const MAX_DAILY = 10;
const COOLDOWN = 300; // 5 minutes

let watching = false;
let cooldownTimer = null;

// ======================
// STORAGE
// ======================

function getTodayKey() {
    return new Date().toISOString().split("T")[0];
}

function getData() {

    try {

        return JSON.parse(
            localStorage.getItem("rewardData")
        ) || {};

    } catch (e) {

        return {};
    }
}

function saveData(data) {

    localStorage.setItem(
        "rewardData",
        JSON.stringify(data)
    );
}

function getTodayData() {

    const data = getData();

    const today = getTodayKey();

    if (!data[today]) {

        data[today] = {
            count: 0,
            lastTime: 0
        };

        saveData(data);
    }

    return data[today];
}

function updateTodayData(todayData) {

    const data = getData();

    data[getTodayKey()] = todayData;

    saveData(data);
}

// ======================
// TIME FORMAT
// ======================

function formatTime(seconds) {

    const m = Math.floor(seconds / 60);

    const s = seconds % 60;

    return `${m}:${String(s).padStart(2, "0")}`;
}

// ======================
// MAIN FUNCTION
// ======================

function initRewardButton(btnId) {

    const btn = document.getElementById(btnId);

    if (!btn) return;

    // ======================
    // UPDATE UI
    // ======================

    function updateUI() {

        const today = getTodayData();

        const now = Date.now();

        const remainCooldown = Math.floor(
            (today.lastTime + COOLDOWN * 1000 - now) / 1000
        );

        // DAILY LIMIT

        if (today.count >= MAX_DAILY) {

            btn.disabled = true;

            btn.innerText =
                `Daily Limit Reached (${MAX_DAILY}/${MAX_DAILY})`;

            return;
        }

        // COOLDOWN

        if (remainCooldown > 0) {

            btn.disabled = true;

            btn.innerText =
                `Wait ${formatTime(remainCooldown)} (${today.count}/${MAX_DAILY})`;

            clearTimeout(cooldownTimer);

            cooldownTimer = setTimeout(updateUI, 1000);

            return;
        }

        // READY

        btn.disabled = watching;

        btn.innerText = watching
            ? "Loading Ad..."
            : `Get 50 Points (${today.count}/${MAX_DAILY})`;
    }

    // ======================
    // BUTTON CLICK
    // ======================

    btn.addEventListener("click", () => {

        if (watching) return;

        const today = getTodayData();

        // DAILY LIMIT CHECK

        if (today.count >= MAX_DAILY) {

            // CUSTOM FUNCTION

            if (typeof oncoinadded === "function") {

                oncoinadded();
            }

            return;
        }

        // COOLDOWN CHECK

        const now = Date.now();

        if (now < today.lastTime + COOLDOWN * 1000) {

            updateUI();

            return;
        }

        watching = true;

        updateUI();

        // ======================
        // CALL ANDROID
        // ======================

        try {

            if (
                window.Android &&
                typeof Android.showRewardedAd === "function"
            ) {

                Android.showRewardedAd();

            } else {

                watching = false;

                updateUI();
            }

        } catch (e) {

            watching = false;

            updateUI();
        }
    });

    // ======================
    // ANDROID CALLBACK
    // ======================

    window.adCompleteCallback = function(success) {

        watching = false;

        if (success) {

            const today = getTodayData();

            today.count += 1;

            today.lastTime = Date.now();

            updateTodayData(today);

            // ADD COINS

            if (typeof getCoin === "function") {

                getCoin(50, "Reward Ad");
            }
        }

        updateUI();
    };

    // ======================
    // INITIAL UI
    // ======================

    updateUI();
}


