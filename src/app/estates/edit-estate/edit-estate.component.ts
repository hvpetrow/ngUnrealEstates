import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit {
  estateId!: string;
  oldEstate: IEstate = {
    id: '',
    name: '',
    type: '',
    price: 0,
    imgUrl: '',
    constructionYear: '',
    location: '',
    description: '',
    ownerId: '',
  };

  isLoading: boolean = false;

  editEstateGroup: FormGroup = this.formBuilder.group({
    'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'type': new FormControl('', [Validators.required]),
    'year': new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1900)]),
    'location': new FormControl('', [Validators.required, Validators.minLength(2)]),
    'price': new FormControl('', [Validators.required]),
    'imgUrl': new FormControl('', [Validators.required]),
    'description': new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private formBuilder: FormBuilder, private estateService: CrudService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.estateId = params['estateId'];
    });

    this.isLoading = true;

    this.estateService.getEstate(this.estateId).subscribe({
      next: (res) => {
        this.oldEstate = res;
        console.log(this.oldEstate);
        this.isLoading = false;

        this.editEstateGroup.controls['name'].setValue(this.oldEstate.name);
        this.editEstateGroup.controls['type'].setValue(this.oldEstate.type);
        this.editEstateGroup.controls['year'].setValue(this.oldEstate.constructionYear);
        this.editEstateGroup.controls['location'].setValue(this.oldEstate.location);
        this.editEstateGroup.controls['price'].setValue(this.oldEstate.price);
        this.editEstateGroup.controls['imgUrl'].setValue(this.oldEstate.imgUrl);
        this.editEstateGroup.controls['description'].setValue(this.oldEstate.description);
      }, error: err => {
        console.error(err.message);
        this.isLoading = false;

      }
    });

  }

  editHandler(): void {
    console.log(this.editEstateGroup.value);
    if (this.editEstateGroup.valid) {
      this.isLoading = true;

      const editGroupValue = this.editEstateGroup.value;

      const editedEstate = {
        name: editGroupValue.name,
        type: editGroupValue.type,
        constructionYear: editGroupValue.year,
        location: editGroupValue.location,
        price: editGroupValue.price,
        imgUrl: editGroupValue.imgUrl,
        description: editGroupValue.description
      }

      this.estateService.updateEstate(this.estateId, editedEstate).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
          this.isLoading = false;

        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;

        }
      });
    }
  }
}
