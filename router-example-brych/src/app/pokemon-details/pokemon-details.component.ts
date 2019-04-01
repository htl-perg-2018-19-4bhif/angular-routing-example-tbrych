import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IPokemonDetail {
  name: string;
  abilities: any[];
  abilityList: string[];
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId = "";
  pokemonInfos: IPokemonDetail = { name: "", abilities: [], abilityList: [] };

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    route.paramMap.subscribe(map => {
      this.pokemonId = map.get("id");
    });
    this.loadPokeDetails();
  }

  ngOnInit() {
  }

  async loadPokeDetails() {
    this.pokemonInfos = await this.http.get<IPokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`).toPromise();
    
    this.pokemonInfos.abilityList = [];
    for (let i = 0; i < this.pokemonInfos.abilities.length; i++){
      this.pokemonInfos.abilityList.push(this.pokemonInfos.abilities[i].ability.name);
    }
  }

}
