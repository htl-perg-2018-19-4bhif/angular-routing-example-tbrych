import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPokemon {
  name: string;
  url: string;
  id: number;
};

interface IPokemons {
  count?: number;
  results: IPokemon[];
};

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemons = { results: [] };

  constructor(private http: HttpClient) { this.loadPokemon() }

  ngOnInit() {
  }

  async loadPokemon() {
    this.pokemons = await this.http.get<IPokemons>("https://pokeapi.co/api/v2/pokemon?limit=1000").toPromise();
    
    for (let i = 0; i < this.pokemons.results.length; i++) {
      this.pokemons.results[i].id = i+1;
    }
  }
}
