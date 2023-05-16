import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FiltroPipe } from '@shared/pipes/filtro.pipe';
import {CommonModule } from '@angular/common'

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.scss']
})
export class ListFoodComponent {
  filterFood = '';
  searchText = '';
  
  datos = [
    {
        food_id: 1,
        name: "Plátano",
        image: "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.qcom.es%2Fplatano-canarias%2Fjunio-2015%2Fel-platano-de-canarias-es-marca-espana_28080_2805_30876_0_1_in.html&psig=AOvVaw0MIMxPJxOWaka_yLYuCiV4&ust=1684059468485000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCODmzMSI8v4CFQAAAAAdAAAAABAE",
        marca: "Platano de Canarias",
        kcal: "94",
        proteins: "1,2",
        carbs: "20",
        fats: "40",
        tags: {}        
    },
    {
        food_id: 2,
        name: "Mandarina",
        image: "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.efectofruta.com%2Fproducts%2Fmandarina-g-fontestad-7017.aspx&psig=AOvVaw2wx3Rs4s5sPjVlzsALS9PF&ust=1684059611853000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCNDliomJ8v4CFQAAAAAdAAAAABAE",
        marca: "Fontestad",
        kcal: "23",
        proteins: "45",
        carbs: "34",
        fats: "23",
        tags: {},
    },
    {
        food_id: 3,
        name: "Semilla de girasol",
        image: "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.mundodeportivo.com%2Funcomo%2Fsalud%2Farticulo%2Fcuanto-engordan-las-pipas-descubre-sus-calorias-46707.html&psig=AOvVaw2hzuYPY1MVqvGAWguQBJ-d&ust=1684059687594000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCLijh66J8v4CFQAAAAAdAAAAABAD",
        marca: "Grefusa",
        kcal: "23",
        proteins: "34",
        carbs: "45",
        fats: "23",
        tags: "",
    },
    {
        food_id: 4,
        name: "Pistachos",
        image: "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.clara.es%2Fbienestar%2Falimentacion%2Fbeneficios-del-pistacho_18511&psig=AOvVaw0sOKSzbHyvl25uestmzJFK&ust=1684059718507000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCIjazbyJ8v4CFQAAAAAdAAAAABAD",
        marca: "Finga la rosala",
        kcal: "34",
        proteins: "56",
        carbs: "23",
        fats: "45",
        tags: "",
    },
    {
        food_id: 5,
        name: "Tortilla de patatas",
        image: "https://www.google.es/url?sa=i&url=https%3A%2F%2Fwww.abc.es%2Fbienestar%2Falimentacion%2Frecetas-saludables%2Fabci-receta-tortilla-patatas-perfecta-paso-paso-202005230408_noticia.html&psig=AOvVaw1CZq4z8R7DudlzbBX_k4D_&ust=1684059768551000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCJiwrdSJ8v4CFQAAAAAdAAAAABAD",
        marca: "",
        kcal: "23",
        proteins: "34",
        carbs: "12",
        fats: "23",
        tags: "",
    }
  ]

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  // readonly ingredients = [
  //   ['Nombre alimento'],
  //   ['tomato'],
  //   ['avocado']
  // ];

}
