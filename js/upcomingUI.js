document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Feature version config (manual control)
    const FEATURES = {
        newFeature: "2.1"
    };

    // 🔹 Get Android UI version
    let uiVersion = "";

    if (window.Android && Android.getUiVersion) {
        uiVersion = Android.getUiVersion();
    }

    // 🔹 Normalize version (safe compare)
    function normalizeVersion(v) {
        return v.split('.').map(Number).join('.');
    }

    // 🔹 Apply feature visibility (STRICT MATCH ONLY)
    const el = document.getElementById("newFeature");

    if (
        el &&
        normalizeVersion(uiVersion) === normalizeVersion(FEATURES.newFeature)
    ) {
        el.style.display = "block";
    }

});
