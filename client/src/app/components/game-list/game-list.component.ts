import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Game } from 'src/app/models/types';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  public games: Game[];

  constructor(private _gamesService: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(){
    this._gamesService.getGames().subscribe(
      (response: Game[]) => {
        this.games = response;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  deleteGame(id: string){
    this._gamesService.deleteGame(id).subscribe(
      (response) => {
        console.log(response);
        this.getGames();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

}
