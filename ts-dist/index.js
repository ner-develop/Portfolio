"use strict";
document.addEventListener('DOMContentLoaded', main);
async function main() {
    const titleElement = document.getElementById('title');
    const titleText = 'Portfolio';
    const blinkCursorInterval = 500;
    // initialize
    initIframeSelfPage();
    initBackgroundColorChanger();
    initMaterializeWeb();
    // animation
    await playCursorWaitAnimation(titleElement, 2000, blinkCursorInterval);
    await playTypeWriterAnimation(titleElement, titleText);
    addBlinkUnderscore(titleElement, blinkCursorInterval);
}
function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
function initBackgroundColorChanger() {
    const bodyElement = document.querySelector('body');
    const initialClassNameOfBody = bodyElement?.className || '';
    const windowHeight = window.innerHeight;
    function setBackgroundColorByScrollPosition() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < windowHeight) {
            bodyElement.className = `${initialClassNameOfBody} color-section1`;
        }
        else {
            bodyElement.className = `${initialClassNameOfBody} color-section2`;
        }
    }
    setBackgroundColorByScrollPosition();
    window.addEventListener('scroll', setBackgroundColorByScrollPosition);
}
function initMaterializeWeb() {
    const materialboxedElements = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxedElements, {});
    const carouselElements = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElements, {
        indicators: true,
        fullWidth: true,
    });
    const tooltippedElements = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltippedElements, {});
}
function initIframeSelfPage() {
    const iframeElement = document.getElementById('iframe-self-page');
    const screenWidth = window.innerWidth;
    const iframeContainer = iframeElement?.parentElement;
    const iframeWidth = iframeContainer?.clientWidth || 0;
    const iframeHeight = iframeContainer?.clientHeight || 0;
    const iframeZoom = iframeWidth / screenWidth;
    // iframe settings
    if (iframeElement) {
        iframeElement.style.width = `${iframeWidth}px`;
        iframeElement.style.height = `${iframeHeight}px`;
        iframeElement.src = `index.html?iframe=true&zoom=${iframeZoom}`;
    }
    // Settings if the page is within an iframe (detected via URL parameters)
    const url = new URL(document.location.href);
    const urlParameters = url.searchParams;
    const pageIsIframe = urlParameters.get('iframe') === 'true';
    if (pageIsIframe && iframeElement) {
        const zoom = parseFloat(urlParameters.get('zoom') || '1');
        document.body.style.zoom = `${zoom}`;
        iframeElement.src = '';
    }
}
function addBlinkUnderscore(parentElement, blinkInterval) {
    if (!parentElement)
        return null;
    const spanElement = document.createElement('span');
    spanElement.textContent = '_';
    parentElement.appendChild(spanElement);
    setInterval(function () {
        spanElement.style.visibility = spanElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, blinkInterval);
    return spanElement;
}
async function playCursorWaitAnimation(textElement, duration, blinkInterval) {
    const underscoreElement = addBlinkUnderscore(textElement, blinkInterval);
    if (underscoreElement) {
        await sleep(duration);
        underscoreElement.remove();
    }
}
async function playTypeWriterAnimation(textElement, text) {
    if (!textElement)
        return;
    for (let i = 0; i < text.length; i++) {
        textElement.innerHTML += text.charAt(i);
        await sleep(100);
    }
}
