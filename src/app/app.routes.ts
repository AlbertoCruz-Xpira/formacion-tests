import { Routes } from '@angular/router';
import { HistoriaPage } from './core/pages/historia/historia';
import { TecnologiasPage } from './core/pages/tecnologias/tecnologias';
import { PrimerTest } from './core/pages/primer-test/primer-test';
import { PageLayoutComponent } from './share/layout/page.layout';

export const routes: Routes = [
    {
        path: '',
        component: PageLayoutComponent,
        children: [
            { path: '', redirectTo: 'historia', pathMatch: 'full' },
            { path: 'historia', component: HistoriaPage },
            { path: 'primer-test', component: PrimerTest },
            { path: 'tecnologias', component: TecnologiasPage },
        ],
    },
];
