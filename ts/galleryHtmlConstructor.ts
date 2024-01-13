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
    src: string;
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
        const cardBlockHtml: string = this.generateCardBlockHtml(media);
        const cardBlockElement: HTMLElement = document.createElement('div');
        cardBlockElement.innerHTML = cardBlockHtml.trim();
        return cardBlockElement.firstChild as HTMLElement;
    }
    
    generateCardBlockHtml(media: Media): string {
        return `
    <div class="col s7">
        <div class="card">
            <div class="card-image">
                ${this.generateMediaHtml(media)}
            </div>
        </div>
    </div>
    `;
    }
    
    generateMediaHtml(media: Media): string {
        switch (media.type) {
            case MediaType.Image:
                return this.generateImageHtml(media.src);
            case MediaType.Video:
                return this.generateVideoHtml(media.src);
            case MediaType.Page:
                return this.generatePageHtml(media.src);
        }
    }
    
    generateVideoHtml(src: string): string {
        return `
    <video class="materialboxed" src="${src}" autoplay muted loop></video>
     `;
    }
    
    generateImageHtml(src: string): string {
        return `
    <img class="materialboxed" src="${src}"></img>
    `;
    }
    
    generatePageHtml(src: string): string {
        return `
    <iframe id="iframe-self-page" frameborder="no"></iframe>
    `;
    }
}