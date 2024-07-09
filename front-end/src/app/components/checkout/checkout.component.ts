import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {ShopValidators} from "../../validators/shop-validators";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  protected readonly ShopValidators = ShopValidators;

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.noWhitespaces]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.noWhitespaces]),
        email: new FormControl('', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,5}$'), ShopValidators.noWhitespaces])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ShopValidators.noWhitespaces]),
        city: new FormControl('', [Validators.required, ShopValidators.noWhitespaces]),
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: new FormControl('', [Validators.required, Validators.minLength(3), ShopValidators.noWhitespaces])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, ShopValidators.noWhitespaces]),
        city: new FormControl('', [Validators.required, ShopValidators.noWhitespaces]),
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: new FormControl('', [Validators.required, Validators.minLength(3), ShopValidators.noWhitespaces])
      }),
      creditCardInfo: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        cardName: new FormControl('', [Validators.required, ShopValidators.noWhitespaces]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required]
      })
    });
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    this.shopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

    this.updateOrderReview();
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }

  get creditCardType() { return this.checkoutFormGroup.get('creditCardInfo.cardType'); }
  get creditCardName() { return this.checkoutFormGroup.get('creditCardInfo.cardName'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCardInfo.cardNumber'); }
  get creditCardCode() { return this.checkoutFormGroup.get('creditCardInfo.securityCode'); }


  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardForm = this.checkoutFormGroup.get('creditCardInfo');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardForm.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  getStates(groupName: string) {
    const formGroup = this.checkoutFormGroup.get(groupName);
    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        if (groupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').value(data[0]);
      }
    );
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  updateOrderReview() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
  }
}
