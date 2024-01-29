import { Routes } from "@angular/router";

export const LAYOUT_ROUTES: Routes = [
    {
        path: '', loadComponent: () => import('./app.layout.component').then(r => r.AppLayoutComponent),
        children: [
            { path: '', loadComponent: () => import('../page/dashboard/dashboard.component').then(r => r.DashboardComponent) },
            { path: 'master', loadChildren: () => import('../page/master/master.routes').then(r => r.MASTER_ROUTES) },
        ]
    }
]
