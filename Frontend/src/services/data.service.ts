import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { MDemo, MDemoOverview } from '../models/mdemo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  // ✅ Liste aus assets (kein Backend nötig)
  getMDemos(): Observable<MDemoOverview[]> {
    return this.http.get<MDemoOverview[]>('assets/mock-products.json');
  }

  // ✅ Detail aus assets (liefert ALLE Felder wie image/price/weight)
  getMDemo(id: number): Observable<MDemo> {
    return new Observable<MDemo>((subscriber) => {
      this.http.get<any[]>('assets/mock-products.json').subscribe({
        next: (list) => {
          const item = list.find(x => Number(x.id) === Number(id));
          if (!item) {
            subscriber.error('Not found');
            return;
          }

          // ✅ Wichtig: item direkt zurückgeben -> enthält image/price/weight
          subscriber.next(item as MDemo);
          subscriber.complete();
        },
        error: (err) => subscriber.error(err)
      });
    });
  }

  // ✅ Update Dummy (damit nichts kaputt geht)
  updateMDemo(mdemo: MDemo): Observable<any> {
    console.warn('updateMDemo() is mocked (no backend).', mdemo);
    return of({ ok: true });
  }

  // ✅ Add Dummy
  addMDemo(
    name: string,
    age: number,
    minPlayers: number | null,
    maxPlayers: number | null
  ): Observable<MDemo> {
    console.warn('addMDemo() is mocked (no backend).', { name, age, minPlayers, maxPlayers });

    const created: MDemo = {
      id: Date.now(),
      name,
      fDemoId: 1
    };

    return of(created);
  }

  // ✅ Delete Dummy
  deleteMDemo(id: number): Observable<string> {
    console.warn('deleteMDemo() is mocked (no backend). id=', id);
    return of('ok');
  }
}