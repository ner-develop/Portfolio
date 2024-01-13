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



