import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientComponent } from "./clients/client/client.component";
import { ClientsComponent } from "./clients/clients.component";
import { NewClientComponent } from "./clients/new-client/new-client.component";
import { ErrorComponent } from "./error/error.component";
import { CanDeactivateGuard } from "./guards/can-deactivate-guard.service";
import { ClientsResolver } from "./guards/clients-resolver.service";
import { HelpComponent } from "./help/help.component";

const appRoutes: Routes = [
    {path: '', pathMatch: 'prefix', redirectTo: 'clients'},
    {path: 'clients', component: ClientsComponent},
    {path: 'client/:id', component: ClientComponent, resolve: {client: ClientsResolver}},
    {path: 'new-client', component: NewClientComponent, canDeactivate: [CanDeactivateGuard], data: {edit: false}},
    {path: 'client/:id/edit', component: NewClientComponent, 
        canDeactivate: [CanDeactivateGuard], 
        resolve: {client: ClientsResolver},
        data: {edit: true}},
    {path: 'help', component: HelpComponent},
    {path: 'not-found', component: ErrorComponent, data: {message: 'Page not found'}},
    {path: '**', redirectTo: '/not-found'}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}