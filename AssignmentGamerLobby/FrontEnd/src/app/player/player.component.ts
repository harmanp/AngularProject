import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/player.service'
import { NgForm } from '@angular/forms';
import { Player } from '../shared/player.model';
declare var M: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  constructor(private playerService: PlayerService) { }
// resets the view and the form fields
  ngOnInit() {
    this.resetForm();
    this.refresPlayerList();
  }
// resets the form
  resetForm(form?: NgForm){
    if(form)
      form.reset();
      this.playerService.selectedPlayer = {

        _id: "",
        name: "",
        rank: null,
        score: null,
        time: "",
        gamesPlayed: "",
        status: "",
      }
  }
  //submit button
  onSubmit(form : NgForm){
    // save or insert
    if(form.value._id == ""){
      this.playerService.postPlayer(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refresPlayerList();
        M.toast({ html: 'Saved successfully', classes: 'rounded'});
  
      });
  
    }
    else{
      this.playerService.postPlayer(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated successfully', classes: 'rounded'});
        this.refresPlayerList();
      });
    }
    
  }
// view
  refresPlayerList(){
    this.playerService.getPlayerList().subscribe((res) =>{
        this.playerService.players = res as Player[];
    });
  }
// edit button on html
  onEdit(player1 : Player){
    this.playerService.selectedPlayer = player1;
  }

  //deleting calling the function from player.service
  onDelete(_id: string, form: NgForm){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.playerService.deletePlayer(_id).subscribe((res) => {
        this.refresPlayerList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }
  


}
