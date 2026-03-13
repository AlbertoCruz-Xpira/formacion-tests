import { Routes } from '@angular/router';
import { DashboardPage } from './core/pages/dashboard/dashboard';

export const routes: Routes = [
    {  path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {  path: 'dashboard', component: DashboardPage },

];
