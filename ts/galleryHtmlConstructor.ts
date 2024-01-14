export enum MediaType {
    Image = 'img',
    Video = 'video',
    SelfPage = 'self-page',
}

export interface Link {
    title: string;
    url: string;
}

export interface Media {
    type: MediaType;
    src: string | string[];
    link: Link | null;
}

export interface ContentData {
    contents: Content[];
}

export interface Content {
    title: string;
    description: string[];
    media: Media;
    github: Link[] | null;
    zenn: Link[] | null;
}

export class GalleryHtmlConstructor {
    constructor() {
    }


    async loadContentsFromJson(path: string): Promise<Content[]> {
        const response: Response = await fetch(path);
        const json: ContentData = await response.json();
        return json.contents;
    }
    
    constructGalleryContents(id: string, contents: Content[]): void {
        const galleryElement: HTMLElement | null = document.getElementById(id);
        if (!galleryElement) return;
    
        for (const content of contents) {
            this.constructGalleryContent(galleryElement, content);
        }

        this.initIframeSelfPage();
    }
    
    constructGalleryContent(parent: HTMLElement, content: Content): void {
        // カードブロックの生成
        const cardBlockElement: HTMLDivElement = this.generateCardBlockElement(content.media);
        parent.appendChild(cardBlockElement);
    
        // 説明ブロックの生成
        const descriptionBlockElement: HTMLDivElement = this.generateDescriptionBlockElement(content);
        parent.appendChild(descriptionBlockElement);
    }
    
    generateDescriptionBlockElement(content: Content): HTMLDivElement {
        const block: HTMLDivElement = document.createElement('div');
        block.className = 'col s5';
    
        // タイトルの生成
        const h3: HTMLHeadingElement = document.createElement('h3');
        h3.textContent = content.title;
        block.appendChild(h3);
    
        // 説明の生成
        for (const description of content.description) {
            const p: HTMLParagraphElement = document.createElement('p');
            p.innerHTML = description;
            block.appendChild(p);
        }
    
        // Githubリンクの生成
        if (content.github) {
            const githubP: HTMLParagraphElement = document.createElement('p');
            for (let i = 0; i < content.github.length; i++) {
                const link: Link = content.github[i];
                const a: HTMLAnchorElement = document.createElement('a');
                a.textContent = link.title;
                a.href = link.url;
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
            const zennP: HTMLParagraphElement = document.createElement('p');
            for (let i = 0; i < content.zenn.length; i++) {
                const link: Link = content.zenn[i];
                const a: HTMLAnchorElement = document.createElement('a');
                a.textContent = link.title;
                a.href = link.url;
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
    
    
    generateCardBlockElement(media: Media): HTMLDivElement {
        const blockElement: HTMLDivElement = document.createElement('div');
        blockElement.className = 'col s7';

        if (this.isImageCarousel(media)) {
            const srcList = media.src as string[];
            const mediaElements: HTMLElement[] = srcList.map(src => this.generateMediaElement({type: MediaType.Image, src: src, link: null}));
            const mediaCardElements: HTMLDivElement[] = mediaElements.map(mediaElement => this.generateCardElement(mediaElement));
            const carouselCardElement: HTMLDivElement = this.generateCarouselCardElement(mediaCardElements);
            blockElement.appendChild(carouselCardElement);
        } else {
            const mediaElement: HTMLElement = this.generateMediaElement(media);
            const cardElement: HTMLDivElement = this.generateCardElement(mediaElement);
            blockElement.appendChild(cardElement);
        }
        return blockElement;
    }

    isImageCarousel(media: Media): boolean {
        return media.type == MediaType.Image && Array.isArray(media.src);
    }

    generateCarouselCardElement(cardElements: HTMLElement[]): HTMLDivElement {
        const carouselElement: HTMLDivElement = document.createElement('div');
        carouselElement.className = 'carousel carousel-slider';
        for (const cardElement of cardElements) {
            const carouselItemElement: HTMLElement = document.createElement('div');
            carouselItemElement.className = 'carousel-item';
            carouselItemElement.appendChild(cardElement);
            carouselElement.appendChild(carouselItemElement);
        }
        return carouselElement;
    }
    
    generateCardElement(contentElement: HTMLElement): HTMLDivElement {
        const cardElement: HTMLDivElement = document.createElement('div');
        cardElement.className = 'card';

        const cardImageElement: HTMLDivElement = document.createElement('div');
        cardImageElement.className = 'card-image';

        cardImageElement.appendChild(contentElement);
        cardElement.appendChild(cardImageElement);
        return cardElement;
    }
    
    generateMediaElement(media: Media): HTMLElement {
        if (Array.isArray(media.src)) {
            alert('media.src is array');
            return document.createElement('div');
        }
        switch (media.type) {
            case MediaType.Image:
                return media.link ? this.generateLinkImageElement(media.src, media.link) : this.generateImageElement(media.src);
            case MediaType.Video:
                return this.generateVideoElement(media.src);
            case MediaType.SelfPage:
                return this.generateSelfPageElement();
        }
    }

    generateVideoElement(src: string): HTMLVideoElement {
        const videoElement: HTMLVideoElement = document.createElement('video');
        videoElement.className = 'materialboxed';
        videoElement.src = src;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        return videoElement;
    }

    generateImageElement(src: string): HTMLImageElement {
        const imageElement: HTMLImageElement = document.createElement('img');
        imageElement.className = 'materialboxed';
        imageElement.src = src;
        return imageElement;
    }

    generateLinkImageElement(src: string, link: Link): HTMLAnchorElement {
        const linkElement: HTMLAnchorElement = document.createElement('a');
        linkElement.className = 'tooltipped';
        linkElement.href = link.url;
        linkElement.setAttribute('data-position', 'top');
        linkElement.setAttribute('data-tooltip', link.title);

        const imageElement: HTMLImageElement = document.createElement('img');
        imageElement.src = src;
        linkElement.appendChild(imageElement);

        return linkElement;
    }
    
    /**
     * 少し特殊。自身のページを表示するための専用iframe要素を生成する。
     * @returns iframe要素
     */
    generateSelfPageElement(): HTMLIFrameElement {
        const pageElement: HTMLIFrameElement = document.createElement('iframe');
        pageElement.id = 'iframe-self-page';
        return pageElement;
    }

    /**
     * 特殊処理。自身のページを表示する専用iframeタグを初期化する
     */
    initIframeSelfPage(): void {
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
}