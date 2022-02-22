
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector:'[appPlaceHolder]' // to be an attribute directive
})
export class PlaceHolderDirective{

    constructor(public viewContainerRef:ViewContainerRef) {}

}