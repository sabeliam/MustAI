import {Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: 'img[imageFallback]'
})
export class ImageFallbackDirective {
    @Input() imageFallback?: TemplateRef<unknown>;

    constructor(
        private readonly element: ElementRef,
        private readonly viewContainerRef: ViewContainerRef
    ) {
    }

    @HostListener('error')
    onError(): void {
        this.element.nativeElement.parentNode.removeChild(this.element.nativeElement);

        if (this.imageFallback) {
            this.viewContainerRef.createEmbeddedView(this.imageFallback);
        }
    }
}
