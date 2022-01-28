import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero.interface';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.map(hero => {
          return {
            id: hero.payload.doc.id,
            name: hero.payload.doc.data().name
          }
        }).slice(1, 5);
        this.heroService.searchDisabled.next(heroes.length === 0);
      });

  }

}
