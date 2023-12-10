// File: ComplexCodeExample.js

/*
* This is a complex code example that demonstrates a simulation of a shopping cart system.
* It includes features like product inventory management, add to cart functionality,
* applying discounts, calculating total price, and generating order reports.
*
* The code also demonstrates the use of various JavaScript concepts like classes, arrays,
* object manipulation, closures, and modularization through different functions and classes.
*
* This code is for demonstration purposes only and might not be used as-is in a production environment.
*/

// Product class to represent a product
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Inventory class to manage product inventory
class Inventory {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  getProductByName(name) {
    return this.products.find(product => product.name === name);
  }

  getAllProducts() {
    return this.products;
  }
}

// Cart class to represent a shopping cart
class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(product, quantity) {
    const item = {
      product,
      quantity
    };
    this.items.push(item);
  }

  removeFromCart(product) {
    const index = this.items.findIndex(item => item.product === product);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  }
}

// Discount Manager class to manage available discounts
class DiscountManager {
  constructor() {
    this.discounts = [];
  }

  addDiscount(discount) {
    this.discounts.push(discount);
  }

  applyDiscounts(cart) {
    let totalPrice = cart.getTotalPrice();
    this.discounts.forEach(discount => {
      totalPrice -= discount.apply(totalPrice);
    });
    return totalPrice;
  }
}

// Discount abstract class
class Discount {
  constructor() {
    if (this.constructor === Discount) {
      throw new Error('Discount is an abstract class and cannot be instantiated.');
    }
  }

  apply(totalPrice) {
    throw new Error('apply method must be implemented in subclasses.');
  }
}

// PercentageDiscount class to apply discounts in percentage
class PercentageDiscount extends Discount {
  constructor(percent) {
    super();
    this.percent = percent;
  }

  apply(totalPrice) {
    return (totalPrice * this.percent) / 100;
  }
}

// Create an instance of Inventory
const inventory = new Inventory();

// Add products to the inventory
inventory.addProduct(new Product('Product 1', 10));
inventory.addProduct(new Product('Product 2', 20));
inventory.addProduct(new Product('Product 3', 30));

// Create an instance of Cart
const cart = new Cart();

// Add products to the cart
cart.addToCart(inventory.getProductByName('Product 1'), 2);
cart.addToCart(inventory.getProductByName('Product 3'), 1);

// Create an instance of DiscountManager
const discountManager = new DiscountManager();

// Add discounts to the DiscountManager
discountManager.addDiscount(new PercentageDiscount(10));
discountManager.addDiscount(new PercentageDiscount(5));

// Apply discounts and calculate final price
const finalPrice = discountManager.applyDiscounts(cart);

// Generate and display order report
console.log('*** Order Report ***');
console.log('Total Price:', cart.getTotalPrice());
console.log('Final Price:', finalPrice);
console.log('-------------------');

// Remove products from the cart
cart.removeFromCart(inventory.getProductByName('Product 1'));
cart.removeFromCart(inventory.getProductByName('Product 3'));

// Generate and display updated order report
console.log('*** Updated Order Report ***');
console.log('Total Price:', cart.getTotalPrice());
console.log('Final Price:', discountManager.applyDiscounts(cart));
console.log('-------------------');

// Other utility functions and classes can be added as needed

// ... (more code)