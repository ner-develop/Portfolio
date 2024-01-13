import { GalleryHtmlConstructor, ContentData } from "./galleryHtmlConstructor";
import { TypeWriterAnimator } from "./titleHeaderAnimator";
import codingGalleryJson from "../data/coding-gallery.json";
import blogGalleryJson from "../data/blog-gallery.json";
import artGalleryJson from "../data/art-gallery.json";



document.addEventListener('DOMContentLoaded', main);

async function main(): Promise<void> {
    // animation
    const typeWriterAnimator: TypeWriterAnimator = new TypeWriterAnimator();
    const typeWriterAnimation = typeWriterAnimator.play(document.getElementById('title'));

    // initialize
    const initializeProcess = initializePage();

    await Promise.all([typeWriterAnimation, initializeProcess]);
}

async function initializePage(): Promise<void> {
    // ページ動的生成
    await constructGallery();

    // ページ初期化
    initIframeSelfPage();
    initBackgroundColorChanger();
    initMaterializeWeb();
}


/**
 * スクロール時に背景色を変更する
 */
function initBackgroundColorChanger(): void {
    const bodyElement: HTMLBodyElement | null = document.querySelector('body');
    if (!bodyElement) return;

    const initialClassNameOfBody: string | null = bodyElement?.className || '';

    const codingGalleryElement: HTMLElement | null = document.getElementById('coding-gallery');
    const hasCodingGallery: boolean = codingGalleryElement !== null;
    
    const blogGalleryElement: HTMLElement | null = document.getElementById('blog-gallery');
    const hasBlogGallery: boolean = blogGalleryElement !== null;

    const artGalleryElement: HTMLElement | null = document.getElementById('art-gallery');
    const hasArtGallery: boolean = artGalleryElement !== null;

    function setBackgroundColorByScrollPosition(): void {
        let windowHeight: number = window.innerHeight;
        let offset: number = windowHeight * 0.5;
        let scrollPosition: number = window.scrollY;

        // 画面サイズが変動した場合に対応するため、スクロールごとに取得する
        let codingGalleryTop: number = hasCodingGallery ? scrollPosition + codingGalleryElement!.getBoundingClientRect().top : 0;
        let blogGalleryTop: number = hasBlogGallery ? scrollPosition + blogGalleryElement!.getBoundingClientRect().top : 0;
        let artGalleryTop: number = hasArtGallery ? scrollPosition + artGalleryElement!.getBoundingClientRect().top : 0;

        if (scrollPosition < codingGalleryTop - offset) {
            bodyElement!.className = `${initialClassNameOfBody} color-section1`;
        } else if (scrollPosition < blogGalleryTop - offset) {
            bodyElement!.className = `${initialClassNameOfBody} color-section2`;
        } else if (scrollPosition < artGalleryTop - offset) {
            bodyElement!.className = `${initialClassNameOfBody} color-section3`;
        } else {
            bodyElement!.className = `${initialClassNameOfBody} color-section4`;
        }
    }

    setBackgroundColorByScrollPosition();
    window.addEventListener('scroll', setBackgroundColorByScrollPosition);
}

/**
 * Materialize Webの初期化
 */
function initMaterializeWeb(): void {
    // 画像の拡大の機能を有効化
    const materialboxedElements: NodeListOf<Element> = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(materialboxedElements, {});

    // 画像のカルーセル表示の機能を有効化
    const carouselElements: NodeListOf<Element> = document.querySelectorAll('.carousel');
    M.Carousel.init(carouselElements, {
        indicators: true,
        fullWidth: true,
    });

    // Tooltipの機能を有効化
    const tooltippedElements: NodeListOf<Element> = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltippedElements, {});
}

/**
 * 特殊処理。自身のページを表示する専用iframeタグを初期化する
 */
function initIframeSelfPage(): void {
    const selfPageElement: HTMLElement | null = document.getElementById('iframe-self-page');
    if (!selfPageElement) return;

    // iframe倍率の計算
    const iframeElement: HTMLIFrameElement = selfPageElement as HTMLIFrameElement;
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

async function constructGallery(): Promise<void> {
    const galleryHtmlConstructor: GalleryHtmlConstructor = new GalleryHtmlConstructor();    

    const codingGalleryData: ContentData = codingGalleryJson as ContentData;
    galleryHtmlConstructor.constructGalleryContents('coding-gallery', codingGalleryData.contents);

    const blogGalleryData: ContentData = blogGalleryJson as ContentData;
    galleryHtmlConstructor.constructGalleryContents('blog-gallery', blogGalleryData.contents);

    const artGalleryData: ContentData = artGalleryJson as ContentData;
    galleryHtmlConstructor.constructGalleryContents('art-gallery', artGalleryData.contents);
}



