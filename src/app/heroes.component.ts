import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from "./hero.service";

@Component({
  selector: 'my-heroes',
  // templateUrl: './app.component.html',
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)" [class.selected]="hero === selectedHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
      <h2>
        {{selectedHero.name | uppercase}} is my hero
      </h2>
      <button (click)="gotoDetail()">View Details</button>
    </div>
    `,
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero : Hero;

  constructor(
    private router: Router,
    private heroService: HeroService
  ) { };

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  };
  ngOnInit(): void {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
