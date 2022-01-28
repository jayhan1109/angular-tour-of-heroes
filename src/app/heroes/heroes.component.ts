import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero.interface';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes.map(hero => {
        return {
          id: hero.payload.doc.id,
          name: hero.payload.doc.data().name
        }
      });
      this.heroService.searchDisabled.next(heroes.length === 0);
    });
  }

  async add(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }

    if (this.heroes.find(hero => hero.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already exist.`);
      return;
    }

    const docId = await this.heroService.addHero({name} as Hero)
    this.heroes.push({id: docId, name})
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id);
    this.heroService.searchDisabled.next(this.heroes.length === 0);
  }
}
