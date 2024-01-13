import { GalleryHtmlConstructor, ContentJson } from "./galleryHtmlConstructor";

// データをscriptタグで読み込みグローバル変数に格納している
declare const codingGalleryJson: ContentJson;







document.addEventListener('DOMContentLoaded', main);

async function main(): Promise<void> {
    const titleElement: HTMLElement | null = document.getElementById('title');
    const titleText: string = 'Portfolio';
    const blinkCursorInterval: number = 500;

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

function sleep(msec: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function initBackgroundColorChanger(): void {
    const bodyElement: HTMLBodyElement | null = document.querySelector('body');
    const initialClassNameOfBody: string | null = bodyElement?.className || '';
    const windowHeight: number = window.innerHeight;

    function setBackgroundColorByScrollPosition(): void {
        const scrollPosition: number = window.scrollY;
        if (scrollPosition < windowHeight) {
            bodyElement!.className = `${initialClassNameOfBody} color-section1`;
        } else {
            bodyElement!.className = `${initialClassNameOfBody} color-section2`;
        }
    }

    setBackgroundColorByScrollPosition();
    window.addEventListener('scroll', setBackgroundColorByScrollPosition);
}

function initMaterializeWeb(): void {
    // 画像の拡大の機能
    const materialboxedElements: NodeListOf<Element> = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxedElements, {});

    // 画像のカルーセル表示の機能
    const carouselElements: NodeListOf<Element> = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElements, {
        indicators: true,
        fullWidth: true,
    });

    // Tooltipの機能
    const tooltippedElements: NodeListOf<Element> = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltippedElements, {});
}

function initIframeSelfPage(): void {
    // iframe倍率の計算
    const iframeElement: HTMLIFrameElement | null = document.getElementById('iframe-self-page') as HTMLIFrameElement;
    const screenWidth: number = window.innerWidth;
    const iframeContainer: HTMLElement | null = iframeElement?.parentElement;
    const iframeWidth: number = iframeContainer?.clientWidth || 0;
    const iframeHeight: number = iframeContainer?.clientHeight || 0;
    const iframeZoom: number = iframeWidth / screenWidth;

    // iframe 設定
    if (iframeElement) {
        iframeElement.style.width = `${iframeWidth}px`;
        iframeElement.style.height = `${iframeHeight}px`;
        iframeElement.src = `index.html?iframe=true&zoom=${iframeZoom}`;
    }

    // 自身がiframeだった場合の設定(URLパラメータで検知)
    const url: URL = new URL(document.location.href);
    const urlParameters: URLSearchParams = url.searchParams;
    const pageIsIframe: boolean = urlParameters.get('iframe') === 'true';

    if (pageIsIframe && iframeElement) {
        const zoom: number = parseFloat(urlParameters.get('zoom') || '1');
        (document.body.style as any).zoom = `${zoom}`;
        iframeElement.src = '';
    }
}

function addBlinkUnderscore(parentElement: HTMLElement | null, blinkInterval: number): HTMLSpanElement | null {
    if (!parentElement) return null;

    const spanElement: HTMLSpanElement = document.createElement('span');
    spanElement.textContent = '_';
    parentElement.appendChild(spanElement);

    setInterval(function () {
        spanElement.style.visibility = spanElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, blinkInterval);

    return spanElement;
}

async function playCursorWaitAnimation(textElement: HTMLElement | null, duration: number, blinkInterval: number): Promise<void> {
    const underscoreElement: HTMLSpanElement | null = addBlinkUnderscore(textElement, blinkInterval);
    
    if (underscoreElement) {
        await sleep(duration);
        underscoreElement.remove();
    }
}

async function playTypeWriterAnimation(textElement: HTMLElement | null, text: string): Promise<void> {
    if (!textElement) return;

    for (let i = 0; i < text.length; i++) {
        textElement.innerHTML += text.charAt(i);
        await sleep(100);
    }
}

async function constructGallery(): Promise<void> {
    const galleryHtmlConstructor: GalleryHtmlConstructor = new GalleryHtmlConstructor();    
    galleryHtmlConstructor.constructGalleryContents('coding-gallery', codingGalleryJson.contents);
}



