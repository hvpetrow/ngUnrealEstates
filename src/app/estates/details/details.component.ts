import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  estateId!: string;

  estate!: IEstate;

  user$ = this.authService.currentUser$;
  userId: string | undefined;
  currentUserEmail: string | null | undefined;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private estateService: CrudService) { }

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

      }, error: err => {
        console.error(err.message);
      }
    })
  }
}
