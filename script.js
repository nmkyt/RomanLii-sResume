document.addEventListener('DOMContentLoaded', function() {
    const aboutButton = document.getElementById('aboutButton');
    const aboutPortfolio = document.getElementById('aboutPortfolio');
    const designButton = document.getElementById('designButton');
    const illustrationButton = document.getElementById('illustrationButton');
    const designPortfolio = document.getElementById('designPortfolio');
    const illustrationPortfolio = document.getElementById('illustrationPortfolio');

    aboutButton.addEventListener('click', function() {
        designPortfolio.classList.add('hidden');
        illustrationPortfolio.classList.add('hidden');
        aboutPortfolio.classList.remove('hidden');
    });

    designButton.addEventListener('click', function() {
        designPortfolio.classList.remove('hidden');
        aboutPortfolio.classList.add('hidden');
        illustrationPortfolio.classList.add('hidden');
    });

    illustrationButton.addEventListener('click', function() {
        designPortfolio.classList.add('hidden');
        aboutPortfolio.classList.add('hidden');
        illustrationPortfolio.classList.remove('hidden');
    });
});
