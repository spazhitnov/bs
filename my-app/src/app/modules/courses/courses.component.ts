import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent
  implements
    OnInit,
    OnDestroy,
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit
{
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
