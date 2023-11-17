import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private tutorials: Tutorial[] = [];

  getAll(): Observable<Tutorial[]> {
    return of(this.tutorials);
  }

  get(id: any): Observable<Tutorial> {
    const tutorial = this.tutorials.find(t => t.id === +id)!;
    return of(tutorial);
  }

  create(data: any): Observable<any> {
    const maxId = this.tutorials.length === 0 ? 0 : Math.max(...this.tutorials.map(t => t.id));

    data.id = maxId + 1;
    this.tutorials.push(data);
    return of(data);
  }

  update(id: any, data: any): Observable<any> {
    const index = this.tutorials.findIndex(t => t.id === +id);
    if (index !== -1) {
      this.tutorials[index] = { ...this.tutorials[index], ...data };
    }
    return of({ updated: true });

  }

  delete(id: any): Observable<any> {
    this.tutorials = this.tutorials.filter(t => t.id !== +id);
    return of({ deleted: true });
  }

  deleteAll(): Observable<any> {
    this.tutorials = [];
    return of({ deletedAll: true });
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    const filteredTutorials = this.tutorials.filter(t => t.title === title);
    return of(filteredTutorials);
  }
}
