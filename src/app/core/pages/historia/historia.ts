import { AfterViewInit, Component, ElementRef } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-historia',
  templateUrl: './historia.html',
  styleUrl: './historia.css',
})
export class HistoriaPage implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const codeBlocks = this.elementRef.nativeElement.querySelectorAll<HTMLElement>('code[data-code-highlight]');
    codeBlocks.forEach((codeBlock) => hljs.highlightElement(codeBlock));
  }

}
