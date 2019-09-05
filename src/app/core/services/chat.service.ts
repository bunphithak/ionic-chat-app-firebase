import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chat: Observable<any[]>;
  private activityCollection: AngularFirestoreCollection<any>;
  constructor(
    private afs: AngularFirestore,
  ) {
    this.activityCollection = this.afs.collection<any>('chat');
  }

  joinGroup(data: any): Promise<DocumentReference> {
    return this.activityCollection.add(data);
  }

  getChat(id: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.afs
        .collection('chat', ref => ref.where('groupID', '==', id))
        .valueChanges()
        .subscribe(
          (val) => resolve(val),
          (error) => reject(error)
        );
    });
  }
}
