import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../services/helper.service';

@Directive({
  selector: '[appLoader]',
  standalone: true
})
export class LoaderDirective implements OnChanges {
  @Input() appLoader!: boolean | null;
  private readonly id: string;
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly helper: HelperService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.id = helper.uuid();
  }

  private updateLoader(): void {
    this.appLoader ? this.createLoader() : this.removeLoader();
  }

  private createLoader(): void {
    if (this.getLoader()) {
      return;
    }

    const container = this.getContainer();
    if (!container) {
      return;
    }
    const coords = container.getBoundingClientRect();
    const wrapper = this.renderer.createElement('div');
    this.renderer.setAttribute(wrapper, 'app-loader', this.id);
    this.renderer.setStyle(wrapper, 'position', 'absolute');
    this.renderer.setStyle(wrapper, 'top', `${coords.top}px`);
    this.renderer.setStyle(wrapper, 'bottom', '0');
    this.renderer.setStyle(wrapper, 'left', `${coords.left}px`);
    this.renderer.setStyle(wrapper, 'right', '0');
    this.renderer.setStyle(wrapper, 'display', 'flex');
    this.renderer.setStyle(wrapper, 'justify-content', 'center');
    this.renderer.setStyle(wrapper, 'align-items', 'center');
    this.renderer.setStyle(wrapper, 'z-index', '55555');
    this.renderer.setStyle(wrapper, 'background', '#00000040');
    (wrapper as HTMLElement).innerHTML = `
      <svg
        class="preloader__image"
        xmlns="${location.protocol}//www.w3.org/2000/svg"
        xmlns:xlink="${location.protocol}//www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        width="100px"
        height="100px"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#3b82f6"
          stroke-width="5"
          r="20"
          stroke-dasharray="94.24777960769379 33.41592653589793"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="0.6s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
      `;

    this.renderer.appendChild(container, wrapper);
  }

  private removeLoader(): void {
    const container = this.getContainer();
    const loader = this.getLoader();
    if (loader && container) {
      container.removeChild(loader);
    }
  }

  private getLoader(): HTMLElement | null {
    return this.document.querySelector(`[app-loader="${this.id}"]`);
  }

  private getContainer(): HTMLElement | null {
    return this.el.nativeElement?.closest('.app-container');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLoader();
  }
}
