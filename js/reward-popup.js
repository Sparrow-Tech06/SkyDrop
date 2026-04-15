(function() {
  if (window.__rewardPopupLoaded) return;
  window.__rewardPopupLoaded = true;

  let queue = [];
  let active = false;

  function init() {
    const overlay = document.createElement("div");
    overlay.id = "rewardOverlay";

    overlay.innerHTML = `
      <div class="reward-box">
        <div class="reward-content">
          <img id="rIcon" class="r-icon" src="" alt="reward">
          <h3 id="rTitle"></h3>
         <!-- <p id="rSub"></p> -->
          <button id="rClose">Done</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // MODERN & SLIM STYLES
    const style = document.createElement("style");
    style.innerHTML = `
      #rewardOverlay {
        position: fixed; inset: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(3px);
        display: flex; justify-content: center; align-items: center;
        z-index: 99999;
        opacity: 0; visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      #rewardOverlay.active { opacity: 1; visibility: visible; }

      .reward-box {
        background: #fff ;
        padding: 30px 24px;
        border-radius: 20px;
        text-align: center;
        color: #ffffff;
        width: 95%;
        max-width: 360px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        transform: scale(0.8);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      #rewardOverlay.active .reward-box { transform: scale(1); }

      .r-icon { 
        width: 64px; height: 64px; 
        margin-bottom: 16px;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
      }

      #rTitle { 
        margin: 0 0 8px 0; font-size: 1.25rem; 
        font-weight: 600; letter-spacing: -0.5px;
      }

      #rSub { 
        margin: 0 0 24px 0; font-size: 0.9rem; 
        color: #a0a0a0; line-height: 1.4;
      }

      #rClose {
        width: 100%;
        background: #ffffff;
        color: #000000;
        border: none;
        padding: 12px;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: transform 0.1s, background 0.2s;
      }
      #rClose:active { transform: scale(0.96); background: #e0e0e0; }
    `;
    document.head.appendChild(style);

    // CLOSE LOGIC
    document.getElementById("rClose").onclick = () => {
      overlay.classList.remove("active");
      active = false;
      // Wait for animation to finish before showing next
      setTimeout(showNext, 300);
    };

    function showNext() {
      if (queue.length === 0) return;

      const d = queue.shift();
      document.getElementById("rIcon").src = d.icon || "";
      document.getElementById("rTitle").innerText = d.title || "Reward Unlocked!";
      document.getElementById("rSub").innerText = d.subtitle || "";

      overlay.classList.add("active");
      active = true;
    }

    // GLOBAL CALLBACK
    window.onRewardUnlocked = function(data) {
      if (!data) return;
      queue.push(data);
      if (!active) showNext();
    };
  }

  // Init on load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
