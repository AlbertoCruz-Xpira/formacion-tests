import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-jasmine-1',
  templateUrl: './jasmine-1.html',
  styleUrl: './jasmine-1.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Jasmine1Page {}