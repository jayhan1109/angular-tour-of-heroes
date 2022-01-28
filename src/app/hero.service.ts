import {Injectable} from '@angular/core';
import {catchError, of, Subject, tap} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from './hero.interface';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  searchDisabled = new Subject<boolean>();

  heroRef: AngularFirestoreCollection<Hero>;

  heroes: Hero[] = [];

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private db: AngularFirestore) {
    this.heroRef = db.collection(this.heroesUrl);
    this.getHeroes().subscribe(heroes => {
      this.heroes = heroes.map(hero => {
        return {
          id: hero.payload.doc.id,
          name: hero.payload.doc.data().name
        }
      });
      this.searchDisabled.next(heroes.length === 0);
    });
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes() {
    this.log('Fetched all heroes');
    return this.heroRef.snapshotChanges();
  }

  getHero(id: string) {
    this.log(`Fetched hero id=${id}`);
    return this.heroRef.doc(id).get();
  }

  updateHero(hero: Hero) {
    this.heroRef.doc(hero.id).update({name: hero.name});
    this.log(`Updated hero id=${hero.id}`);
  }

  async addHero(hero: Hero) {
    const doc = await this.heroRef.add(hero);
    this.log(`Added hero name=${hero.name}`);
    return doc.id
  }

  deleteHero(id: string) {
    this.log(`Deleted hero id=${id}`);
    this.heroRef.doc(id).delete();
  }

  searchHeroes(term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return of(this.heroes.filter(hero => hero.name.includes(term)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
