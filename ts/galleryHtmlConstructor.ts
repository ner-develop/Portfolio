export enum MediaType {
    Image = 'img',
    Video = 'video',
    Page = 'iframe',
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
    }
    
    constructGalleryContent(parent: HTMLElement, content: Content): void {
        // カードブロックの生成
        const cardBlockElement: HTMLElement = this.generateCardBlockElement(content.media);
        parent.appendChild(cardBlockElement);
    
        // 説明ブロックの生成
        const descriptionBlockElement: HTMLElement = this.generateDescriptionBlockElement(content);
        parent.appendChild(descriptionBlockElement);
    }
    
    generateDescriptionBlockElement(content: Content): HTMLElement {
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
    
    
    generateCardBlockElement(media: Media): HTMLElement {
        const blockElement: HTMLElement = document.createElement('div');
        blockElement.className = 'col s7';

        if (this.isImageCarousel(media)) {
            const srcList = media.src as string[];
            const mediaElements: HTMLElement[] = srcList.map(src => this.generateMediaElement({type: MediaType.Image, src: src, link: null}));
            const mediaCardElements: HTMLElement[] = mediaElements.map(mediaElement => this.generateCardElement(mediaElement));
            const carouselCardElement: HTMLElement = this.generateCarouselCardElement(mediaCardElements);
            blockElement.appendChild(carouselCardElement);
        } else {
            const mediaElement: HTMLElement = this.generateMediaElement(media);
            const cardElement: HTMLElement = this.generateCardElement(mediaElement);
            blockElement.appendChild(cardElement);
        }
        return blockElement;
    }

    isImageCarousel(media: Media): boolean {
        return media.type == MediaType.Image && Array.isArray(media.src);
    }

    generateCarouselCardElement(cardElements: HTMLElement[]): HTMLElement {
        const carouselElement: HTMLElement = document.createElement('div');
        carouselElement.className = 'carousel carousel-slider';
        for (const cardElement of cardElements) {
            const carouselItemElement: HTMLElement = document.createElement('div');
            carouselItemElement.className = 'carousel-item';
            carouselItemElement.appendChild(cardElement);
            carouselElement.appendChild(carouselItemElement);
        }
        return carouselElement;
    }
    
    generateCardElement(contentElement: HTMLElement): HTMLElement {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        const cardImageElement = document.createElement('div');
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
            case MediaType.Page:
                return this.generatePageElement();
        }
    }

    generateVideoElement(src: string): HTMLElement {
        const videoElement: HTMLElement = document.createElement('video');
        videoElement.className = 'materialboxed';
        videoElement.setAttribute('src', src);
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('loop', '');
        return videoElement;
    }

    generateImageElement(src: string): HTMLElement {
        const imageElement: HTMLElement = document.createElement('img');
        imageElement.className = 'materialboxed';
        imageElement.setAttribute('src', src);
        return imageElement;
    }

    generateLinkImageElement(src: string, link: Link): HTMLElement {
        const linkElement: HTMLElement = document.createElement('a');
        linkElement.className = 'tooltiped';
        linkElement.setAttribute('href', link.url);
        linkElement.setAttribute('data-position', 'top');
        linkElement.setAttribute('data-tooltip', link.title);

        const imageElement: HTMLElement = document.createElement('img');
        imageElement.setAttribute('src', src);
        linkElement.appendChild(imageElement);

        return linkElement;
    }
    
    generatePageElement(): HTMLElement {
        const pageElement: HTMLElement = document.createElement('iframe');
        pageElement.setAttribute('id', 'iframe-self-page');
        pageElement.setAttribute('frameborder', 'no');
        return pageElement;
    }
}