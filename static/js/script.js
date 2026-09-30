document.addEventListener('DOMContentLoaded', function () {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = tabs.map(function (tab) {
        return document.getElementById(tab.getAttribute('aria-controls'));
    });

    function show(id, updateHash) {
        const index = panels.findIndex(function (panel) { return panel.id === id; });
        if (index === -1) return;

        tabs.forEach(function (tab, i) {
            const active = i === index;
            tab.setAttribute('aria-selected', String(active));
            tab.tabIndex = active ? 0 : -1;
            panels[i].hidden = !active;
            if (!active) {
                panels[i].querySelectorAll('video').forEach(function (video) { video.pause(); });
            }
        });

        if (updateHash) {
            history.replaceState(null, '', '#' + id);
        }
        window.scrollTo({ top: 0 });
    }

    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
            show(panels[i].id, true);
        });

        // Стрелки влево/вправо переключают вкладки, как в обычном tablist
        tab.addEventListener('keydown', function (event) {
            let next;
            if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
            else if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
            else return;
            event.preventDefault();
            tabs[next].focus();
            show(panels[next].id, true);
        });
    });

    // Открываем раздел из адреса, например /#design
    window.addEventListener('hashchange', function () {
        show(location.hash.slice(1) || panels[0].id, false);
    });
    show(location.hash.slice(1) || panels[0].id, false);
});
