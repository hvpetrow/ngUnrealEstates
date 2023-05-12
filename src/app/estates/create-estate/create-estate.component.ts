import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, Form, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/shared/crud.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent {
  showErrorInControl: any = this.utils.showErrorInControl;
  currentYear: number = new Date().getFullYear();
  estateTypes: string[] = ['Apartment', 'House', 'Villa'];
  user$ = this.authService.currentUser$;
  userId: string | undefined;
  isLoading: boolean = false;
  createEstateGroup!: FormGroup;
  formattedAmount!: any;
  constructor(private currencyPipe: CurrencyPipe, private formBuilder: FormBuilder, private authService: AuthenticationService, private estateService: CrudService, private activatedRoute: ActivatedRoute, private router: Router, private utils: UtilsService) { }
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid;
    });


    this.createEstateGroup = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'type': new FormControl('Apartment', [Validators.required]),
      'constructionYear': new FormControl('', [Validators.required, Validators.max(this.currentYear), Validators.min(1900)]),
      'location': new FormControl('', [Validators.required, Validators.minLength(2)]),
      'price': new FormControl('', [Validators.required]),
      // 'imgUrl': new FormControl('', [Validators.required]),
      'imgUrls': this.formBuilder.array([new FormGroup({
        'imgUrl': new FormControl('', [Validators.required])
      })]),
      'description': new FormControl('', [Validators.required, Validators.minLength(2)]),
    });


    this.createEstateGroup.valueChanges.subscribe(form => {
      if (form.price) {
        console.log(form.price);

        this.createEstateGroup.patchValue({
          price: this.currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
        }, { emitEvent: false });
      }
    });
  }



  get getImgUrl(): FormArray {

    return this.createEstateGroup.get('imgUrls') as FormArray;
  }

  getImgUrlsControl(index: number) {
    // console.log(index);
    // console.log(((this.createEstateGroup.get('imgUrls') as FormGroup).controls[index] as FormGroup).controls['imgUrl'])

    return (((this.createEstateGroup.get('imgUrls') as FormGroup).controls[index] as FormGroup).controls['imgUrl']);
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
    this.createEstateGroup.controls['type'].setValue((e.target as HTMLTextAreaElement).value, {
      onlySelf: true,
    });
  }

  createHandler(): void {
    if (this.createEstateGroup.valid) {
      this.isLoading = true;
      const ownerId = this.userId;
      const price = Number(this.createEstateGroup.controls['price'].value.replace(/[^0-9.-]+/g, ""));
      const estate = { ...this.createEstateGroup.value, price, ownerId };

      console.log(estate);

      this.estateService.addEstate(estate).subscribe({
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

  // transformAmount(element: Event) {
  //   const value = this.currencyPipe.transform((element.target as HTMLTextAreaElement).value);
  //   console.log((element.target as HTMLTextAreaElement).value);

  //   (element.target as HTMLTextAreaElement).value = value || 'err';
  // }
}
