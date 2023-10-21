import { Component, OnInit } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Moment } from 'src/app/Moments';
import { Comment } from 'src/app/Comment';
import { Router, ActivatedRoute } from '@angular/router';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit{
  moment?: Moment;
  public readonly API = 'api/moments';

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!: FormGroup;

  constructor(private momentsService: MomentsService, private messagesServices: MessagesService,
    private route: ActivatedRoute,
    private router: Router, private commentService: CommentService){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentsService.getMoment(id).subscribe((item) => {
      this.moment = item.data;
    });

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(id: number){
    await (await this.momentsService.removeMoment(id)).subscribe();

    this.messagesServices.add("Momento excluido com sucesso");

    this.router.navigate(['/']);
    
  }

   async onSubmit(formDirective: FormGroupDirective){

    if(this.commentForm.invalid){
      return
    }

    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);

    await this.commentService
      .createComment(data)
      .subscribe((comment) => this.moment!.comments!.push(comment.data));


    this.messagesServices.add("Comentário adicionado");

    this.commentForm.reset();

    formDirective.resetForm();
  
  }

}
