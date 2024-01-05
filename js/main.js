(function () {

    document.addEventListener('DOMContentLoaded', main);

    async function main()
    {
        const titleElement = document.getElementById('title');
        const titleText = 'Portfolio';
        const blinkCusrsorInterval = 500;

        // initialize
        initBackgroundColorChanger();
        initMaterializeWeb();

        // animation
        await playCursorWaitAnimation(titleElement, 2000, blinkCusrsorInterval);
        await playTypeWriterAnimation(titleElement, titleText);
        addBlinkUnderscore(titleElement, blinkCusrsorInterval);
    }


    function sleep(msec){
        return new Promise(resolve => setTimeout(resolve, msec))
    };

    function initBackgroundColorChanger() {
        const bodyElement = document.querySelector('body');
        const initialClassNameOfBody = bodyElement.className;
        const windowHeight = window.innerHeight;

        function setBackgroundColorByScrollPosition() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < windowHeight) {
                bodyElement.className = `${initialClassNameOfBody} color-section1`;
            } else {
                bodyElement.className = `${initialClassNameOfBody} color-section2`;
            }
        }

        setBackgroundColorByScrollPosition();
        window.addEventListener('scroll', setBackgroundColorByScrollPosition);
    }

    function initMaterializeWeb() {
        // 画像の拡大
        var materialboxedElements = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(materialboxedElements, {});
        // 画像のカルーセル表示
        var carouselElements = document.querySelectorAll('.carousel');
        M.Carousel.init(carouselElements, {
            indicators: true,
        });
        // ToolTips
        var tooltippedElements = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltippedElements, {});
    }

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
