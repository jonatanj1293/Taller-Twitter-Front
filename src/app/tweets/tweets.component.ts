import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TwitsServicesService } from '../services/twits-services.service';
import { Twit } from '../model/twit';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  listaTweets: Array<Twit>;
  nuevoTweet: Twit;
  message = '';
  constructor(private apiTweet: TwitsServicesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarTweets();
  }

  public openNewTweet(){
    const dialogRef = this.dialog.open(DialogContentTweet, {
      data: {idUser: 1, message: '', published_date: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.message = result;
      if(this.message){
        this.crearTweet(this.message);
      }
    });
  }

  public listarTweets() {
    this.apiTweet.listarTweets().subscribe( (res: any) => {
      this.listaTweets = res.data;
      console.log(res);
    });
  }

  public crearTweet(message){
    this.nuevoTweet = new Twit();
    this.nuevoTweet.message = message;
    this.nuevoTweet.idUser = 1;
    this.nuevoTweet.published_date = new Date().toLocaleString().substring(0, 10);
    this.apiTweet.guardarTweet(this.nuevoTweet).subscribe((res: any) => {
      console.log(res);
      this.listarTweets();
    });
  }
}

@Component({
  selector: 'dialog-content-tweet-dialog',
  templateUrl: 'dialog-tweets.component.html',
})
export class DialogContentTweet {
  @Inject(Twit)
  public data: Twit = new Twit();
  constructor(
    public dialogRef: MatDialogRef<DialogContentTweet>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}