"use strict";
var MediaType;
(function (MediaType) {
    MediaType["Image"] = "img";
    MediaType["Video"] = "video";
    MediaType["Page"] = "iframe";
})(MediaType || (MediaType = {}));
document.addEventListener('DOMContentLoaded', main);
async function main() {
    const titleElement = document.getElementById('title');
    const titleText = 'Portfolio';
    const blinkCursorInterval = 500;
    // ページ動的生成
    await constructGallery();
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
    // 画像の拡大の機能
    const materialboxedElements = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxedElements, {});
    // 画像のカルーセル表示の機能
    const carouselElements = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElements, {
        indicators: true,
        fullWidth: true,
    });
    // Tooltipの機能
    const tooltippedElements = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltippedElements, {});
}
function initIframeSelfPage() {
    // iframe倍率の計算
    const iframeElement = document.getElementById('iframe-self-page');
    const screenWidth = window.innerWidth;
    const iframeContainer = iframeElement?.parentElement;
    const iframeWidth = iframeContainer?.clientWidth || 0;
    const iframeHeight = iframeContainer?.clientHeight || 0;
    const iframeZoom = iframeWidth / screenWidth;
    // iframe 設定
    if (iframeElement) {
        iframeElement.style.width = `${iframeWidth}px`;
        iframeElement.style.height = `${iframeHeight}px`;
        iframeElement.src = `index.html?iframe=true&zoom=${iframeZoom}`;
    }
    // 自身がiframeだった場合の設定(URLパラメータで検知)
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
async function constructGallery() {
    constructGalleryContents('coding-gallery', codingGalleryJson.contents);
}
async function loadContentsFromJson(path) {
    const response = await fetch(path);
    const json = await response.json();
    return json.contents;
}
function constructGalleryContents(id, contents) {
    const galleryElement = document.getElementById(id);
    if (!galleryElement)
        return;
    for (const content of contents) {
        constructGalleryContent(galleryElement, content);
    }
}
function constructGalleryContent(parent, content) {
    // カードブロックの生成
    const cardBlockElement = generateCardBlockElement(content.media);
    parent.appendChild(cardBlockElement);
    // 説明ブロックの生成
    const descriptionBlockElement = generateDescriptionBlockElement(content);
    parent.appendChild(descriptionBlockElement);
}
function generateDescriptionBlockElement(content) {
    const block = document.createElement('div');
    block.className = 'col s5';
    // タイトルの生成
    const h3 = document.createElement('h3');
    h3.textContent = content.title;
    block.appendChild(h3);
    // 説明の生成
    for (const description of content.description) {
        const p = document.createElement('p');
        p.textContent = description;
        block.appendChild(p);
    }
    // Githubリンクの生成
    if (content.github) {
        const githubP = document.createElement('p');
        for (let i = 0; i < content.github.length; i++) {
            const link = content.github[i];
            const a = document.createElement('a');
            a.textContent = link.title;
            a.setAttribute('href', link.url);
            githubP.appendChild(document.createTextNode("Github："));
            githubP.appendChild(a);
            if (i < content.github.length - 1) {
                githubP.appendChild(document.createElement("br"));
            }
        }
        block.appendChild(githubP);
    }
    // Zennリンクの生成
    if (content.zenn) {
        const zennP = document.createElement('p');
        for (let i = 0; i < content.zenn.length; i++) {
            const link = content.zenn[i];
            const a = document.createElement('a');
            a.textContent = link.title;
            a.setAttribute('href', link.url);
            zennP.appendChild(document.createTextNode("技術ブログ："));
            zennP.appendChild(a);
            if (i < content.zenn.length - 1) {
                zennP.appendChild(document.createElement("br"));
            }
        }
        block.appendChild(zennP);
    }
    return block;
}
function generateCardBlockElement(media) {
    const cardBlockHtml = generateCardBlockHtml(media);
    const cardBlockElement = document.createElement('div');
    cardBlockElement.innerHTML = cardBlockHtml.trim();
    return cardBlockElement.firstChild;
}
function generateCardBlockHtml(media) {
    return `
<div class="col s7">
    <div class="card">
        <div class="card-image">
            ${generateMediaHtml(media)}
        </div>
    </div>
</div>
`;
}
function generateMediaHtml(media) {
    switch (media.type) {
        case MediaType.Image:
            return generateImageHtml(media.src);
        case MediaType.Video:
            return generateVideoHtml(media.src);
        case MediaType.Page:
            return generatePageHtml(media.src);
    }
}
function generateVideoHtml(src) {
    return `
<video class="materialboxed" src="${src}" autoplay muted loop></video>
 `;
}
function generateImageHtml(src) {
    return `
<img class="materialboxed" src="${src}"></img>
`;
}
function generatePageHtml(src) {
    return `
<iframe id="iframe-self-page" frameborder="no"></iframe>
`;
}
