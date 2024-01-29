import { Routes } from "@angular/router";

export const MASTER_ROUTES: Routes = [
    {
        path: '',
        children: [
            { 
                path: 'users', 
                data: { breadcrumb: 'Users' }, 
                loadComponent: () => import('./users/users.component').then(r => r.UsersComponent) 
            },
            { 
                path: 'detail-users', 
                data: { breadcrumb: 'Detail Users' }, 
                loadComponent: () => import('./users/detail-users/detail-users.component').then(r => r.DetailUsersComponent) 
            },
            { 
                path: 'form-users', 
                data: { breadcrumb: 'Form Users' }, 
                loadComponent: () => import('./users/form-users/form-users.component').then(r => r.FormUsersComponent) 
            }
        ]
    },
]