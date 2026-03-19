import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-page-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './page.layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {}
