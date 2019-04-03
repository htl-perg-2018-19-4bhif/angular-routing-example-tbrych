import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IPokemon {
  name: string;
  url: string;
  id: number;
};

interface IPokemons {
  results: IPokemon[];
};

interface ICount {
  count: number;
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons: IPokemons = { results: [] };
  pokemonsBackup: IPokemons;
  inputText: string = "";

  constructor(private http: HttpClient) { this.loadPokemon() }

  ngOnInit() {
  }

  async loadPokemon() {
    let numPokemon: ICount = await this.http.get<ICount>("https://pokeapi.co/api/v2/pokemon").toPromise();
    
    this.pokemonsBackup = await this.http.get<IPokemons>(`https://pokeapi.co/api/v2/pokemon?limit=${numPokemon.count}}`).toPromise();

    for (let i = 0; i < this.pokemonsBackup.results.length; i++) {
      this.pokemonsBackup.results[i].id = i+1;
    }

    this.filterText();
  }

  filterText(){
    this.pokemons.results = [];
    if (this.inputText !== "undefined"){
      for (let i = 0; i < this.pokemonsBackup.results.length; i++){
        if (this.pokemonsBackup.results[i].name.includes(this.inputText)) {
          this.pokemons.results.push(this.pokemonsBackup.results[i]);
        }
      }
    } else {
      this.pokemons = this.pokemonsBackup;
    }
  }
}
