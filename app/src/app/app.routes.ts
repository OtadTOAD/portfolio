import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';
import { BlenderComponent } from './projects/blender/blender.component';
import { WebComponent } from './projects/web/web.component';
import { LuauComponent } from './projects/luau/luau.component';


export const routes: Routes = [
    {
        path: "",
        component: LandingComponent
    },
    {
        path: "projects/blender",
        component: BlenderComponent,
    },
    {
        path: "projects/luau",
        component: LuauComponent,
    },
    {
        path: "projects/web",
        component: WebComponent,
    },
    {
        path: "**",
        component: ErrorComponent
    }
];
