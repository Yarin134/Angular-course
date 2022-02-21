import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";


@Directive({
    selector : '[appDropdown]'
})

export class DropdownDirective {

constructor(private elRef:ElementRef , private renderer:Renderer2) {}

isClicked = false

@HostBinding('class') elementClass:string = '';


@HostListener('click') dropdownClicked() {      
    this.isClicked = !this.isClicked  
    if(this.isClicked){
        this.renderer.addClass(this.elRef.nativeElement , 'open')
    } else{
        this.renderer.removeClass(this.elRef.nativeElement , 'open')   // using the renderer
    }
    // if(this.isClicked === true)
    // {
    //     this.elementClass = 'open'
    // }
    // else                                            // using the @HostBinding
    // {
    //     this.elementClass = ''
    // }

    }
}