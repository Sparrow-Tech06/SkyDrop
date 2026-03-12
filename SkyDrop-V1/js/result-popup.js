function showResultPopup(score, total, title) {
    const div = document.createElement('div');
    div.className = 'result-overlay animate__animated animate__fadeIn';
    div.innerHTML = `
        <div class="card border-0 text-center p-4 shadow-lg w-100 animate__animated animate__zoomIn" style="max-width: 400px; border-radius: 30px;">
            <div class="display-1 mb-3">🏆</div>
            <h2 class="fw-bold text-dark">BATTLE FINISHED!</h2>
            <p class="text-muted">${title}</p>
            <div class="bg-light rounded-pill p-3 mb-4">
                <span class="h4 fw-bold text-orange">${score}</span> <small>/ ${total} CORRECT</small>
            </div>
            <div class="h5 text-success fw-bold mb-4">+10 COINS ADDED</div>
            <button onclick="location.href='index.html'" class="btn btn-dark btn-lg w-100 rounded-pill">BACK TO LOBBY</button>
        </div>
    `;
    document.body.appendChild(div);
    
    // Prevent back navigation
    history.pushState(null, null, location.href);
    window.onpopstate = () => location.href = 'index.html';
}
