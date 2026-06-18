import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/landing/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(m => m.Register)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.Login)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/admin/dashboard/dashboard.component')
        .then(m => m.Dashboard),

    children: [

      {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full'
      },

      {
        path: 'productos',
        loadComponent: () =>
          import('./features/admin/components/product/product.component')
            .then(m => m.Product)
      },

      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/admin/components/user/user.component')
            .then(m => m.User)
      },
       {
        path: 'auditoria',
        loadComponent: () =>
          import('./features/admin/components/audit/audit.component')
            .then(m => m.Audit)
      }


    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];