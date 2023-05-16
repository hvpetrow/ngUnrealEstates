import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CrudService } from 'src/app/shared/crud.service';
import { IEstate } from 'src/app/shared/estate';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-edit-estate',
  templateUrl: './edit-estate.component.html',
  styleUrls: ['./edit-estate.component.css']
})
export class EditEstateComponent implements OnInit, AfterViewInit {
  estateId!: string;
  oldEstate: IEstate = {
    id: '',
    name: '',
    type: '',
    price: 0,
    imgUrls: [],
    constructionYear: '',
    rooms: 0,
    area: 0,
    location: '',
    description: '',
    ownerId: '',
  };

  showErrorInControl: any = this.utils.showErrorInControl;
  currentYear: number = new Date().getFullYear();
  estateTypes: string[] = ['Apartment', 'House', 'Villa'];

  isLoading: boolean = false;

  editEstateGroup!: FormGroup;

  constructor(private currencyPipe: CurrencyPipe, private formBuilder: FormBuilder, private estateService: CrudService, private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService) { }

  ngOnInit(): void {
    this.editEstateGroup = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'type': new FormControl('', [Validators.required]),
      'year': new FormControl('', [Validators.required, Validators.max(this.currentYear), Validators.min(1900)]),
      'location': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'price': new FormControl('', [Validators.required]),
      'rooms': new FormControl('', [Validators.required, Validators.max(99), Validators.min(1)]),
      'area': new FormControl('', [Validators.required, Validators.min(1)]),
      'imgUrls': this.formBuilder.array([]),
      'description': new FormControl('', [Validators.required, Validators.minLength(2)]),
    });



    this.activatedRoute.params.subscribe(params => {
      this.estateId = params['estateId'];
    });

    this.isLoading = true;

    // console.log(this.editEstateGroup);
    this.estateService.getEstate(this.estateId).pipe(take(1)).subscribe({
      next: (res) => {
        this.oldEstate = res;
        this.isLoading = false;

        this.editEstateGroup.controls['name'].setValue(this.oldEstate.name);
        this.editEstateGroup.controls['type'].setValue(this.oldEstate.type);
        this.editEstateGroup.controls['year'].setValue(this.oldEstate.constructionYear);
        this.editEstateGroup.controls['rooms'].setValue(this.oldEstate.rooms);
        this.editEstateGroup.controls['area'].setValue(this.oldEstate.area);
        this.editEstateGroup.controls['location'].setValue(this.oldEstate.location);
        this.editEstateGroup.controls['price'].setValue(String(this.oldEstate.price));
        this.oldEstate.imgUrls.map(
          (imgUrl: any) => {
            const imgUrlForm = this.formBuilder.group({
              'imgUrl': imgUrl.imgUrl
            });

            this.getImgUrl.push(imgUrlForm);
          }
        );
        this.editEstateGroup.controls['description'].setValue(this.oldEstate.description);
      }, error: err => {
        console.error(err.message);
        this.isLoading = false;
      }, complete: () => {
        console.log("COMPLETED");
      }
    });
  }

  ngAfterViewInit(): void {
    this.editEstateGroup.valueChanges.subscribe(form => {
      if (form.price) {
        console.log(form.price);

        this.editEstateGroup.patchValue({
          price: this.currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }

  get getImgUrl(): FormArray {

    return this.editEstateGroup.get('imgUrls') as FormArray;
  }

  getImgUrlsControl(index: number) {
    return (((this.editEstateGroup.get('imgUrls') as FormGroup).controls[index] as FormGroup).controls['imgUrl']);
  }

  addImgUrl() {
    this.getImgUrl.push(
      new FormGroup({
        'imgUrl': new FormControl('', [Validators.required]),
      })
    );
  }

  removeImgUrl(i: number) {
    this.getImgUrl.removeAt(i);
  }


  changeEstateType(e: Event) {
    this.editEstateGroup.controls['type'].setValue((e.target as HTMLTextAreaElement).value, {
      onlySelf: true,
    });
  }

  editHandler(): void {
    console.log(this.editEstateGroup.value);
    if (this.editEstateGroup.valid) {
      this.isLoading = true;
      const editGroupValue = this.editEstateGroup.value;
      const price = Number(this.editEstateGroup.controls['price'].value.replace(/[^0-9.-]+/g, ""));

      const editedEstate = {
        name: editGroupValue.name,
        type: editGroupValue.type,
        constructionYear: editGroupValue.year,
        location: editGroupValue.location,
        price: price,
        rooms: editGroupValue.rooms,
        area: editGroupValue.area,
        imgUrls: editGroupValue.imgUrls,
        description: editGroupValue.description
      }

      console.log(editedEstate);

      this.estateService.updateEstate(this.estateId, editedEstate).subscribe({
        next: (res) => {
          this.router.navigate([`/estates/${this.estateId}/details`]);
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
