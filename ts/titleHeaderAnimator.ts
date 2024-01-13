// タイプライター風アニメーション
export class TypeWriterAnimator {

    static readonly BLINK_INTERVAL: number = 500;
    static readonly TITLE_TEXT: string = 'Portfolio';

    async play(textElement: HTMLElement | null): Promise<void> {
        if (!textElement) return;
        textElement.textContent = '';
        await this.playCursorWaitAnimation(textElement, 2000, TypeWriterAnimator.BLINK_INTERVAL);
        await this.playTypeWriterAnimation(textElement, TypeWriterAnimator.TITLE_TEXT);
        this.addBlinkUnderscore(textElement, TypeWriterAnimator.BLINK_INTERVAL);
    }

    addBlinkUnderscore(parentElement: HTMLElement, blinkInterval: number): HTMLSpanElement {
        const spanElement: HTMLSpanElement = document.createElement('span');
        spanElement.textContent = '_';
        parentElement.appendChild(spanElement);
    
        setInterval(function () {
            spanElement.style.visibility = spanElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, blinkInterval);
    
        return spanElement;
    }
    
    async playCursorWaitAnimation(textElement: HTMLElement, duration: number, blinkInterval: number): Promise<void> {
        const underscoreElement: HTMLSpanElement = this.addBlinkUnderscore(textElement, blinkInterval);
        await this.sleep(duration);
        underscoreElement.remove();
    }
    
    async playTypeWriterAnimation(textElement: HTMLElement, text: string): Promise<void> {
        for (let i = 0; i < text.length; i++) {
            textElement.innerHTML += text.charAt(i);
            await this.sleep(100);
        }
    }

    sleep(msec: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, msec));
    }
}