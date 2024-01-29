import { Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';

export const routes: Routes = [
    { 
        path: '', 
        loadChildren: () => import('./layout/app.layout.routes').then(r => r.LAYOUT_ROUTES), 
        canActivate: [AuthGuardService] 
    },
    { path: 'login', loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent) },
    { path: 'notfound', loadComponent: () => import('./page/notfound/notfound.component').then(m => m.NotfoundComponent) },
    { path: '**', redirectTo: '/notfound' },
]
