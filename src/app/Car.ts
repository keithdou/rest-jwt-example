export class Car {

brand = '';
color = '';
price = '';
saleDate = '';
vin = '';
year= '';
​​

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
