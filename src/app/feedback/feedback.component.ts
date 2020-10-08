import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  likesColor = 'primary';
  likeEmojiPath = 'assets/image/login.png';
  like = false;
  @ViewChild('imgdiv') imgdiv: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleLike(): void {
    this.like = !this.like;
    this.showImages(this.like);
    this.likesColor = this.like ? 'warn' : 'primary';
  }

  public showImages(like: boolean): void {
    this.likeEmojiPath = like
      ? 'assets/image/login.png'
      : 'assets/image/cry.gif';
    this.imgdiv.nativeElement.style.display = 'block';
    timer(900).subscribe((res) => {
      this.imgdiv.nativeElement.style.display = 'none';
    });
  }

}
