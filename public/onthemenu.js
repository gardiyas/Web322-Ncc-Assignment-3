/************************************************************************************
* WEB322 – Assignment 3 (Winter 2021)
* I declare that this assignment is my own work in accordance with Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Name: Emre Isik
* Student ID: 137524195
* Course: WEB322NCC
*
************************************************************************************/
var itemImages = [
  {
    src: 'images/img1.jpg',
    location: 'TORONTO - Yonge-Dundas Square',
    pname: 'Ponzu shoyu, Rice vinegar, Fresh Ossaka Fish',
    off: 'no',
    newprice: ' CA$34.99',
    alt: 'Food Image Not Available'
  },
  {
    src: 'images/img2.jpg',
    location: 'TORONTO - Baseline Rd',
    pname: 'Rice, Toasted Tomato, Less Cooked Ossaka Fish',
    off: 'yes',
    oldprice: 'CA$44.99',
    newprice: ' CA$33.89',
    alt: 'Food Image Not Available'
  },
  {
    src: 'images/img3.jpg',
    location: 'TORONTO - Gardiners Rd',
    pname: 'Kebap, Domato Paste, Green Papper',
    off: 'no',
    newprice: 'CA$29.00',
    alt: 'Food Image Not Available'
  },
  {
    src: 'images/img4.jpg',
    location: 'TORONTO - Bloor St West',
    pname: 'Italian Pizza with Ultra Spicies',
    off: 'no',
    newprice: 'CA$29.50',
    alt: 'Food Image Not Available'
  },
  {
    src: 'images/img5.jpg',
    location: 'TORONTO - King St West',
    pname: 'Arrabic Food with Chicken',
    off: 'yes',
    oldprice: 'CA$49.99',
    newprice: ' CA$39.99',
    alt: 'Food Image Not Available'
  },
  {
    src: 'images/img6.jpg',
    location: 'TORONTO - Chemin Saint-Louis',
    pname: 'Vegetable and Beef mixed Tomato fruit',
    off: 'yes',
    oldprice: 'CA$59.00',
    newprice: ' CA$30.00',
    alt: 'Food Image Not Available'
  }
];

function func1() {
  var imageContainer = document.querySelector('.product-item');

  var str = '<div class="item">' + '<div class="item-image">' + '<div class="img-hover-zoom">';

  var myImageStr = '\0';
  var a = '\0';
  var b = '\0';
  for (var i = 0; i < 6; i++) {
    a =
      '<img src="' +
      itemImages[i].src +
      '" alt="' +
      itemImages[i].alt +
      '"></div>' +
      '<div class="item-button"><a href="#">Order</a>' +
      '<a href="#">Details</a></div></div><div class="item-title">' +
      '<div class="location"><h5>' +
      itemImages[i].location +
      '</h5></div>'+

      '<h5>' +
      itemImages[i].pname +
      '</h5>';

    if (itemImages[i].off === 'yes') {
      b =
        '<p><del>' +
        itemImages[i].oldprice +
        '</del>' +
        itemImages[i].newprice +
        '</p></div></div></div>';
    } else {
      b = '<p>' + itemImages[i].newprice + '</p></div></div></div>';
    }

    myImageStr += str + a + b;
  }

  imageContainer.innerHTML = myImageStr;
}

function start() {
  func1();
}
window.onload = start;
