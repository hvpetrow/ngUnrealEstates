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



  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private estateService: CrudService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.estateId = params['estateId'];
    });

    this.user$.subscribe((user) => {
      this.userId = user?.uid;
    });

    this.estateService.getEstate(this.estateId).subscribe({
      next: (res) => {
        this.estate = res;
        console.log(this.estate);
        this.isOfferOwner = res.ownerId == this.userId
      }, error: err => {
        console.error(err.message);
      }
    });

    console.log("contact modal in details onInit " + this.contactModal);

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
