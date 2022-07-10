import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileDashService } from '../app/services/mobile-dash.service';
import { General, MapRequest } from './model/phones';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  phoneTitle: string = '';
  general: General;
  @ViewChild('phoneName') phoneN: ElementRef;
  @ViewChild('phoneTitle') phoneName: ElementRef;

  constructor(public activatedRoute: ActivatedRoute, public router: Router,
    private MobileDashService: MobileDashService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.general = new General();
  }


  getFotoFondo() {
    this.spinner.show();
    const phoneName = this.phoneName.nativeElement.value;
    this.MobileDashService.SearchUnMappedPhones(phoneName).subscribe(data => {
      this.general.unMapppedPhones = data;
      this.MappedPhone = [];
      this.getbrands();
      this.spinner.hide();
    }
    );
  }

  MappedPhone: any[] = []
  collectMappedPhone(event: any, phoneId: number) {
    var checked = event.target.checked;
    if (checked) {
      this.MappedPhone.push(+phoneId);
    } else {
      this.MappedPhone.splice(this.MappedPhone.indexOf(phoneId), 1);
    }
    console.log(this.MappedPhone);

  }
  isSelectAll: boolean = false;
  checkUncheckAll(event: any) {
    var checked = event.target.checked;
    if (checked) {
      this.isSelectAll = true;
      this.general.unMapppedPhones.forEach((c) => {
        c.isSelected = event.target.checked;
        this.MappedPhone.push(c.id);
      });
    }
    else {
      this.isSelectAll = false;

      this.MappedPhone = [];
      this.general.unMapppedPhones.forEach((c) => {
        c.isSelected = event.target.checked;
      });
    }
    console.log(this.MappedPhone);

  }

  getbrands() {
    this.spinner.show();
    this.MobileDashService.getbrands().subscribe(data => {
      this.general.brands = data;
      this.spinner.hide();
    }
    );
  }

  brandId: number
  getPhonesByBrand(event: any) {
    this.spinner.show();
    this.brandId = event.target.value;
    this.MobileDashService.GetPhonesByBrand(this.brandId, '').subscribe(res => {
      this.general.phones = res;
      this.spinner.hide();
    })
  }
  choocedPhone: string;
  getPhoneDetails(event: any) {
    this.spinner.show();
    let phoneId = event.target.value;
    this.general.phones.forEach(element => {
      if (element.id == phoneId) {
        this.choocedPhone = element.title;
        this.MobileDashService.GetPhonesByBrand(this.brandId, this.choocedPhone).subscribe(res => {
          this.general.filteredPhones = res;
          this.spinner.hide();
        })
      }
    }
    );
  }

  getPhoneName() {
    this.spinner.show();
    const keyword = this.phoneN.nativeElement.value;
    this.MobileDashService.GetPhonesByBrand(this.brandId, keyword).subscribe(res => {
      this.general.filteredPhones = res;
      this.spinner.hide();
    })
  }

  variantFor: string;
  phoneId: number;

  addVariant(phoneId: number) {
    this.variantFor = this.general.filteredPhones.filter(x => x.id == phoneId)[0].title;
    this.phoneId = phoneId;
  }

  @ViewChild('myModalClose') modalClose: any;

  onSubmit(result: any) {
    this.spinner.show();
    this.MobileDashService.AddVariant(this.phoneId, result.color, result.size).subscribe(res => {

      this.MobileDashService.GetPhonesByBrand(this.brandId, this.choocedPhone).subscribe(res => {
        this.general.filteredPhones = res;
        this.modalClose.nativeElement.click();
      })

      this.spinner.hide();
    }
    );
  }

  variantId: number;
  getVariantId(event: any) {
    this.variantId = event.target.value;
  }
  showAlert: boolean = false;
  MapPhones() {
    const mapRequest: MapRequest = new MapRequest();
    mapRequest.variantId = +this.variantId;
    mapRequest.phones = this.MappedPhone;
    this.spinner.show();
    this.MobileDashService.MapPhones(mapRequest).subscribe((res: any) => {
      if (res?.status == true) {

        this.showAlert = true;
        window.scrollTo(0, 0);
        this.general.unMapppedPhones.forEach(c => {
          c.isSelected = false;
        })
        this.isSelectAll = false;
        this.spinner.hide();
      }
    })
  }
}
