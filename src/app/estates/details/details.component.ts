import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  estate!: IEstate;
  estateId!: string;

  user$ = this.authService.currentUser$;
  userId: string | undefined;
  currentUserEmail: string | null | undefined;
  estateComments!: any;
  isShow: boolean = false;
  contactModal: boolean = false;
  deleteModal: boolean = false;
  isOfferOwner: boolean = false;

  imgs = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2LtPCUCc_t2I7JUV5AP_ron0pfoc5I9E5Q&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1EhDd9GTb-AeQD258K-b3zqjunT98_ubO1A&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0EKWW-ECKkAkww91y--KLrgUBGXlPOPWPGA&usqp=CAU'];

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private estateService: CrudService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        console.log(params);
        this.estateId = params['estateId'];
        this.estateService.getEstate(this.estateId).subscribe({
          next: (res) => {
            this.estate = res;
            this.isOfferOwner = res.ownerId == this.userId
          }, error: err => {
            console.error(err.message);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.user$.subscribe((user) => {
      this.userId = user?.uid;
    });
  }

  showHandler(event: Event): void {
    this.isShow = !this.isShow;

    if (this.isShow == true) {
      (event.target as HTMLTextAreaElement).textContent = 'Hide';
    } else {
      (event.target as HTMLTextAreaElement).textContent = 'Show More';
    }
  }

  setEstateComments(comments: any) {
    this.estateComments = comments;
  }


  openContactModal() {
    this.contactModal = true;
  }

  openDeleteModal() {
    this.deleteModal = true;
  }
}
