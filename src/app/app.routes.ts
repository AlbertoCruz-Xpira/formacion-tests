import { Routes } from '@angular/router';
import { HistoriaPage } from './core/pages/historia/historia';
import { TecnologiasPage } from './core/pages/tecnologias/tecnologias';
import { PrimerTest } from './core/pages/primer-test/primer-test';
import { QueEsUnTestPage } from './core/pages/que-es-un-test/que-es-un-test';
import { QueEsUnAssertPage } from './core/pages/que-es-un-assert/que-es-un-assert';
import { Ejercicio1Page } from './core/pages/ejercicio-1/ejercicio-1';
import { Video1Page } from './core/pages/video-1/video-1';
import { PageLayoutComponent } from './share/layout/page.layout';

export const routes: Routes = [
    {
        path: '',
        component: PageLayoutComponent,
        children: [
            { path: '', redirectTo: 'historia', pathMatch: 'full' },
            { path: 'historia', component: HistoriaPage },
            { path: 'que-es-un-test', component: QueEsUnTestPage },
            { path: 'que-es-un-assert', component: QueEsUnAssertPage },
            { path: 'ejercicio-1', component: Ejercicio1Page },
            { path: 'video-1', component: Video1Page },
            { path: 'primer-test', component: PrimerTest },
            { path: 'tecnologias', component: TecnologiasPage },
        ],
    },
];
