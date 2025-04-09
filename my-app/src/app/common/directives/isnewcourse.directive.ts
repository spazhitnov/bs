import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { Course } from '../models/courses.model';

@Directive({
  selector: '[isnewcourse]',
  standalone: true,
})
export class IsnewcourseDirective implements AfterViewInit {
  @Input() course!: Course;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    const el = this.element.nativeElement.children[0];
    if (this.course.creationDate < new Date()) {
      const def: Date = new Date(+new Date() - +this.course.creationDate);
      if (def.getMonth() > 0 || (def.getMonth() === 0 && def.getDate() > 14)) {
        this.renderer.setStyle(el, 'border', '1px solid red');
        this.renderer.setStyle(
          el,
          'boxShadow',
          '0px 0px 2px 2px rgba(255, 0, 0, 0.5)'
        );
      }
    } else if (this.course.creationDate > new Date()) {
      this.renderer.setStyle(el, 'border', '1px solid #3b82f6');
      this.renderer.setStyle(
        el,
        'boxShadow',
        '0px 0px 2px 2px rgba(59, 130, 246, 0.5)'
      );
    }
  }
}
