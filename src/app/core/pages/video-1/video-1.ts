import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-video-1',
  templateUrl: './video-1.html',
  styleUrl: './video-1.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Video1Page {}