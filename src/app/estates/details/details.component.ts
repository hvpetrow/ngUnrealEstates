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
  isShow: boolean = false;

  isOfferOwner: boolean = false;



  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private estateService: CrudService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.estateId = params['estateId'];
    });

    this.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.currentUserEmail = user?.email;
    });

    this.estateService.getEstate(this.estateId).subscribe({
      next: (res) => {
        this.estate = res;
        console.log(this.estate);
        this.isOfferOwner = this.estateId == this.userId
      }, error: err => {
        console.error(err.message);
      }
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



  deleteHandler(): void {
    const answer = confirm('Are you sure you want to delete it?');

    if (answer) {
      this.estateService.deleteEstate(this.estateId).subscribe({
        error: (err) => console.error(err),
        complete: () => {
          this.router.navigate(['/home']);
          this.toast.success('Successfully deleted estate!');
        }
      });
    }
  }
}
