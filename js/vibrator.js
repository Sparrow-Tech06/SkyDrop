/* Haptic Feedback */
document.querySelectorAll('.back-btn').forEach(item => {

    item.addEventListener('click', () => {

        if (navigator.vibrate) {
            navigator.vibrate(80);
        }

    });

});
