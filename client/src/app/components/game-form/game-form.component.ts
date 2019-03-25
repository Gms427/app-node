import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/types';
import { GamesService } from 'src/app/services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row'; // Para ponerle una clase css al componente en si
  
  public edit: boolean = false;

  public game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  constructor(private _gamesService: GamesService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this._activatedRoute.snapshot.params;
    if(params.id){
      this._gamesService.getGame(params.id).subscribe(
        (response: Game) => {
          console.log(response);
          this.game = response;
          this.edit = true;
        },
        (error) => {
          console.log(<any>error);
        }
      );
    }
  }

  saveGame(){
    console.log(this.game);
    delete this.game.created_at;
    delete this.game.id;
    this._gamesService.saveGame(this.game).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/games']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  updateGame(){
    console.log(this.game);
    delete this.game.created_at;
    this._gamesService.updateGame(this.game.id, this.game).subscribe(
      (response) => {
        console.log(response);
        this._router.navigate(['/games']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
