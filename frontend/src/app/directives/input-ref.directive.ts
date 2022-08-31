import { Directive, HostListener, OnInit, Optional } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[inputRef]'
})
export class InputRefDirective implements OnInit{
    @HostListener('input', ['$event.value'])
    onClick(value: number) {
      this.ngControl?.control?.setValue(value, { emitEvent: false });
    }
  
    constructor(@Optional() private ngControl: NgControl) {}
  
    ngOnInit(): void {
      this.ngControl?.valueChanges?.subscribe(value => this.ngControl?.control?.setValue(value, { emitEvent: false })
      )
    }

}