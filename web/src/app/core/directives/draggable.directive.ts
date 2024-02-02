import {
  AfterContentInit,
  Directive,
  ElementRef,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

@Directive({
  selector: '[appDraggable], appDraggable',
  standalone: true,
})
export class DraggableDirective implements AfterContentInit {
  private readonly renderer: Renderer2;

  private children!: HTMLElement[];
  private positions: DOMRect[] = [];

  constructor(
    private readonly elementRef: ElementRef,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterContentInit(): void {}
}
