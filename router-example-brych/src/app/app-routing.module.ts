import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  {path: "pokemons", component: PokemonsComponent},
  {path: "pokemons/:id", component: PokemonDetailsComponent},
  {path: "", redirectTo: "/pokemons", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
