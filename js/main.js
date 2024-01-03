(function () {

    document.addEventListener('DOMContentLoaded', function () {
        main();
    });
      
    async function main()
    {
        const titleElement = document.getElementById('title');
        const githubElement = document.getElementById('github');
        const zennElement = document.getElementById('zenn');
        const titleText = 'Portfolio';
        const blinkCusrsorInterval = 500;

        await playCursorWaitAnimation(titleElement, 2000, blinkCusrsorInterval);
        await playTypeWriterAnimation(titleElement, titleText);
        addBlinkUnderscore(titleElement, blinkCusrsorInterval);
    }


    function sleep(msec){
        return new Promise(resolve => setTimeout(resolve, msec))
    };

    function addBlinkUnderscore(parentElement, blinkInterval) {
        const spanElement = document.createElement('span');
        spanElement.textContent = '_';
        parentElement.appendChild(spanElement);
        setInterval(function() {
            spanElement.style.visibility = (spanElement.style.visibility === 'hidden') ? 'visible' : 'hidden';
        }, blinkInterval);
        return spanElement;
    }

    async function playCursorWaitAnimation(textElement, duration, blinkInterval) {
        const underscoreElement = addBlinkUnderscore(textElement, blinkInterval);
        await sleep(duration);
        underscoreElement.remove();
    }

    async function playTypeWriterAnimation(textElement, text) {
        for (let i = 0; i < text.length; i++) {
            textElement.innerHTML += text.charAt(i);
            await sleep(100);
        }
    }
})();
