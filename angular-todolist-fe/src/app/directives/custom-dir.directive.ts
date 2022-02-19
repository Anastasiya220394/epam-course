import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCustomDir]'
})
export class CustomDirDirective {

  constructor(private elementRef: ElementRef) {}
  @Input('appCustomDir') set flag (bool:boolean) {
    if (bool) {
      this.elementRef.nativeElement.style.textDecoration = "line-through";
    } else {
      this.elementRef.nativeElement.style.textDecoration = "none";
    }
  }
}


