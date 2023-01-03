import {loadRemoteModule} from '@angular-architects/module-federation';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ModuleLoadingStrategyService} from "./module-loading-strategy.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shell',
    pathMatch: 'full',
  },
  {
    path: 'shell',
    component: HomeComponent,
    children: [
      {
        path: 'lazy-one',
        loadChildren: () =>
          import('./lazy-module-one/lazy-module-one.module').then(
            m => m.LazyModuleOneModule
          ),
      },
    ],
  },
  {
    path: 'micro-app-one',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './microOne',
      }).then((microAppOne: any) => microAppOne.AppModule),
    data: {preload: true},
  },
  {
    path: 'micro-app-two',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './microTwo',
      }).then((microAppTwo: any) => microAppTwo.AppModule),
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: ModuleLoadingStrategyService,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
