import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AlertService } from './message.service';
import { getDocs, deleteDoc } from 'firebase/firestore';
import { from } from 'rxjs';
import { Character } from '../interfaces/character.interface';
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public totalRecords: number = 0;
  private favorites: any = [];
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  public async addFavorites(character: Character) {
    const userId = this.authService.getUserId();
    if (!userId) {
      throw this.alertService.showMessage(
        'Debes iniciar sesión para realizar esta acción.',
        'warn'
      );
    }
    const ref = collection(this.firestore, 'users');
    return addDoc(ref, {
      userId,
      charactersId: character.id,
      name: character.name,
      mass: character.mass,
      height: character.height,
      gender: character.gender,
      created: character.created,
      birth_year: character.birth_year,
    });
  }
  public async isFavorite(characterId: number): Promise<boolean> {
    const ref = collection(this.firestore, 'users');
    const snapshot = await getDocs(ref);

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data['charactersId'] === characterId) {
        return true;
      }
    }
    return false;
  }
  public getFavorites(page: number = 1, rows: number = 6) {
    return from(
      (async () => {
        const ref = collection(this.firestore, 'users');
        const snapshot = await getDocs(ref);
        this.favorites = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data['charactersId']) {
            this.favorites.push({
              charactersId: data['charactersId'],
              name: data['name'],
              mass: data['mass'],
              height: data['height'],
              gender: data['gender'],
              created: data['created'],
              birth_year: data['birth_year'],
            });
          }
        });
        this.totalRecords = this.favorites.length;
        const start = (page - 1) * rows;
        const end = start + rows;
        const paginatedData = this.favorites.slice(start, end);
        return paginatedData;
      })()
    );
  }

  public async removeFavorites(characterId: number) {
    const userId = this.authService.getUserId();
    if (!userId) {
      throw this.alertService.showMessage(
        'Debes iniciar sesión para realizar esta acción.',
        'warn'
      );
    }
    const ref = collection(this.firestore, 'users');
    const snapshot = await getDocs(ref);
    const [docToDelete] = snapshot.docs;
    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
      this.alertService.showMessage('Personaje eliminado de favoritos.');
    } else {
      this.alertService.showMessage('Personaje no encontrado en favoritos.');
    }
  }

  public hasFavorites(): boolean {
    return this.totalRecords > 0;
  }
}
