import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public readonly API = 'api/moments';

  allMoments: Moment[] = [];
  moments: Moment[] = [];

  faSearch = faSearch
  searchTerm: string = '';

  constructor(private momentsService: MomentsService){}

  ngOnInit(): void {
    this.momentsService.getMoments().subscribe((items) =>{
      const data = items.data;

      data.map((item) => {
        item.createad_at = new Date(item.createad_at!).toLocaleDateString('pt-BR');
      });
      this.allMoments = data;
      this.moments = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    });
  }

}
