import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appHeroes]'
})
export class HeroesDirective {
  @Input() heroName: any;
  @Output() addHeroHandler = new EventEmitter<string>();

  constructor() {}


  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key == "Enter" && this.heroName.value.trim() !== "") {
      this.addHeroHandler.emit(this.heroName.value);
      this.heroName.value = "";
    }
  }
}
