import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit{
  moment!: Moment;
  btnText: string = "Editar";

  constructor(private momentsService: MomentsService, 
    private route: ActivatedRoute, 
    private messagesService: MessagesService, private router: Router){
      
    }

  ngOnInit(): void {
     const id = Number(this.route.snapshot.paramMap.get('id'));

     this.momentsService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
     })
  }

 async editHandler(momentData: Moment){
    const id = this.moment.id;

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(momentData.image){
      formData.append('image', momentData.image);
    }

    await this.momentsService.updateMoment(id!, formData).subscribe();

    this.messagesService.add(`Moment ${id} foi atualizado com sucesso`);

    this.router.navigate(['/']);
  }

}
