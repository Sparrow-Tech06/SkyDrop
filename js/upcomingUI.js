document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Feature version config
    const FEATURES = {
        newFeature: "2.1"
    };

    // 🔹 Get Android UI version
    let uiVersion = "";

    if (window.Android && Android.getUiVersion) {
        uiVersion = Android.getUiVersion();
    }

    // 🔹 Normalize version
    function normalizeVersion(v) {
        return v.split('.').map(Number).join('.');
    }

    // 🔹 Get all elements with class
    const elements = document.querySelectorAll(".newFeature");

    // 🔹 Apply strict match
    if (
        normalizeVersion(uiVersion) === normalizeVersion(FEATURES.newFeature)
    ) {
        elements.forEach(el => {
            el.style.display = "block";
        });
    }

});
