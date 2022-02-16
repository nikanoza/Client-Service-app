import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientsComponent } from "./clients/clients.component";
import { NewClientComponent } from "./clients/new-client/new-client.component";
import { HelpComponent } from "./help/help.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    {path: '', pathMatch: 'prefix', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'new-client', component: NewClientComponent},
    {path: 'help', component: HelpComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}