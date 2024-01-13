// データをscriptタグで読み込みグローバル変数に格納している
declare const codingGalleryJson: ContentJson;


enum MediaType {
    Image = 'img',
    Video = 'video',
    Page = 'iframe',
}

interface Link {
    title: string;
    url: string;
}

interface Media {
    type: MediaType;
    src: string;
}

interface ContentJson {
    contents: Content[];
}

interface Content {
    title: string;
    description: string[];
    media: Media;
    github: Link[] | null;
    zenn: Link[] | null;
}




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
    constructGalleryContents('coding-gallery', codingGalleryJson.contents);
}

async function loadContentsFromJson(path: string): Promise<Content[]> {
    const response: Response = await fetch(path);
    const json: ContentJson = await response.json();
    return json.contents;
}

function constructGalleryContents(id: string, contents: Content[]): void {
    const galleryElement: HTMLElement | null = document.getElementById(id);
    if (!galleryElement) return;

    for (const content of contents) {
        constructGalleryContent(galleryElement, content);
    }
}

function constructGalleryContent(parent: HTMLElement, content: Content): void {
    // カードブロックの生成
    const cardBlockElement: HTMLElement = generateCardBlockElement(content.media);
    parent.appendChild(cardBlockElement);

    // 説明ブロックの生成
    const descriptionBlockElement: HTMLElement = generateDescriptionBlockElement(content);
    parent.appendChild(descriptionBlockElement);
}

function generateDescriptionBlockElement(content: Content): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.className = 'col s5';

    // タイトルの生成
    const h3: HTMLElement = document.createElement('h3');
    h3.textContent = content.title;
    block.appendChild(h3);

    // 説明の生成
    for (const description of content.description) {
        const p: HTMLElement = document.createElement('p');
        p.textContent = description;
        block.appendChild(p);
    }

    // Githubリンクの生成
    if (content.github) {
        const githubP: HTMLElement = document.createElement('p');
        for (let i = 0; i < content.github.length; i++) {
            const link: Link = content.github[i];
            const a: HTMLElement = document.createElement('a');
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
        const zennP: HTMLElement = document.createElement('p');
        for (let i = 0; i < content.zenn.length; i++) {
            const link: Link = content.zenn[i];
            const a: HTMLElement = document.createElement('a');
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


function generateCardBlockElement(media: Media): HTMLElement {
    const cardBlockHtml: string = generateCardBlockHtml(media);
    const cardBlockElement: HTMLElement = document.createElement('div');
    cardBlockElement.innerHTML = cardBlockHtml.trim();
    return cardBlockElement.firstChild as HTMLElement;
}

function generateCardBlockHtml(media: Media): string {
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

function generateMediaHtml(media: Media): string {
    switch (media.type) {
        case MediaType.Image:
            return generateImageHtml(media.src);
        case MediaType.Video:
            return generateVideoHtml(media.src);
        case MediaType.Page:
            return generatePageHtml(media.src);
    }
}

function generateVideoHtml(src: string): string {
    return `
<video class="materialboxed" src="${src}" autoplay muted loop></video>
 `;
}

function generateImageHtml(src: string): string {
    return `
<img class="materialboxed" src="${src}"></img>
`;
}

function generatePageHtml(src: string): string {
    return `
<iframe id="iframe-self-page" frameborder="no"></iframe>
`;
}

