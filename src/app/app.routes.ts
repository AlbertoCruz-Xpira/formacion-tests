import { Routes } from '@angular/router';
import { HistoriaPage } from './core/pages/historia/historia';
import { TecnologiasPage } from './core/pages/tecnologias/tecnologias';
import { EstrategiasParaTestearPage } from './core/pages/estrategias-para-testear/estrategias-para-testear';
import { QueEsUnTestPage } from './core/pages/que-es-un-test/que-es-un-test';
import { QueEsUnAssertPage } from './core/pages/que-es-un-assert/que-es-un-assert';
import { Ejercicio1Page } from './core/pages/ejercicio-1/ejercicio-1';
import { Ejercicio2Page } from './core/pages/ejercicio-2/ejercicio-2';
import { Jasmine1Page } from './core/pages/jasmine-1/jasmine-1';
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
            { path: 'jasmine-1', component: Jasmine1Page },
            { path: 'ejercicio-2', component: Ejercicio2Page },
            { path: 'video-1', component: Video1Page },
            { path: 'estrategias', component: EstrategiasParaTestearPage },
            { path: 'tecnologias', component: TecnologiasPage },
        ],
    },
];
