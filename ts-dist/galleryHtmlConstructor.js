export var MediaType;
(function (MediaType) {
    MediaType["Image"] = "img";
    MediaType["Video"] = "video";
    MediaType["Page"] = "iframe";
})(MediaType || (MediaType = {}));
export class GalleryHtmlConstructor {
    constructor() {
    }
    async loadContentsFromJson(path) {
        const response = await fetch(path);
        const json = await response.json();
        return json.contents;
    }
    constructGalleryContents(id, contents) {
        const galleryElement = document.getElementById(id);
        if (!galleryElement)
            return;
        for (const content of contents) {
            this.constructGalleryContent(galleryElement, content);
        }
    }
    constructGalleryContent(parent, content) {
        // カードブロックの生成
        const cardBlockElement = this.generateCardBlockElement(content.media);
        parent.appendChild(cardBlockElement);
        // 説明ブロックの生成
        const descriptionBlockElement = this.generateDescriptionBlockElement(content);
        parent.appendChild(descriptionBlockElement);
    }
    generateDescriptionBlockElement(content) {
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
    generateCardBlockElement(media) {
        const cardBlockHtml = this.generateCardBlockHtml(media);
        const cardBlockElement = document.createElement('div');
        cardBlockElement.innerHTML = cardBlockHtml.trim();
        return cardBlockElement.firstChild;
    }
    generateCardBlockHtml(media) {
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
    generateMediaHtml(media) {
        switch (media.type) {
            case MediaType.Image:
                return this.generateImageHtml(media.src);
            case MediaType.Video:
                return this.generateVideoHtml(media.src);
            case MediaType.Page:
                return this.generatePageHtml(media.src);
        }
    }
    generateVideoHtml(src) {
        return `
    <video class="materialboxed" src="${src}" autoplay muted loop></video>
     `;
    }
    generateImageHtml(src) {
        return `
    <img class="materialboxed" src="${src}"></img>
    `;
    }
    generatePageHtml(src) {
        return `
    <iframe id="iframe-self-page" frameborder="no"></iframe>
    `;
    }
}
