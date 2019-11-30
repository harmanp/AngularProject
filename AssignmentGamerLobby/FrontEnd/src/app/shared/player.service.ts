import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // used for update and delete
  selectedPlayer: Player;
  //array of players of all mongogodb collection
  players: Player[];
  readonly baseURL = 'http://localhost:3000/players';
  constructor(private http: HttpClient) { }
//adding the player to database
  postPlayer(player1: Player){
      return this.http.post(this.baseURL,player1);
  }
  // for viewing the list in the table
  getPlayerList(){
    return this.http.get(this.baseURL);
  }
// for updating
  putPlayer(player1: Player){
    return this.http.put(this.baseURL + '/${player1._id}', player1);
  }

//deleting
  deletePlayer(_id: string){
    return this.http.delete(this.baseURL + '/${_id}');
  }


}
