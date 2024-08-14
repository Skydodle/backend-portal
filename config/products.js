const products = [
  {
    name: 'Air Max 270',
    description: 'Nike Air Max 270 Sneakers',
    brand: 'Nike',
    type: 'Sneakers',
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f0e19e40-0390-4b47-ad8f-0167bc81a41a/air-max-270-mens-shoes-KkLcGR.png',
    ],
    price: 150,
  },
  {
    name: 'Air Force 1',
    description: 'Nike Air Force 1 Sneakers',
    brand: 'Nike',
    type: 'Sneakers',
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e777c881-5b62-4250-92a6-362967f54cca/air-force-1-07-womens-shoes-b19lqD.png',
    ],
    price: 120,
  },
  {
    name: 'Dunk Low',
    description: 'Nike Dunk Low Sneakers',
    brand: 'Nike',
    type: 'Sneakers',
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4329d447-d48e-4886-8585-b73355c52cda/dunk-low-retro-mens-shoes-njHwD3.png',
    ],
    price: 100,
  },
  {
    name: 'Woodside II',
    description: 'Nike Woodside II Boots',
    brand: 'Nike',
    type: 'Boots',
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/wxjzkctbsuvjyx13dgyi/woodside-2-high-acg-big-kids-boots-aG0LdZ.png',
    ],
    price: 130,
  },
  {
    name: 'Victori One',
    description: 'Nike Victori One Sandals',
    brand: 'Nike',
    type: 'Sandals',
    image: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f4522e61-721a-4224-8159-9c04830d27bb/victori-one-mens-slides-l6rXGD.png',
    ],
    price: 30,
  },
  {
    name: 'Ultraboost 21',
    description: 'Adidas Ultraboost 21 Sneakers',
    brand: 'Adidas',
    type: 'Sneakers',
    image: [
      'https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/53a3ca19c06b4c5abc39131398fae837_9366/ultraboost-5x-shoes.jpg',
    ],
    price: 180,
  },
  {
    name: 'NMD R1',
    description: 'Adidas NMD R1 Sneakers',
    brand: 'Adidas',
    type: 'Sneakers',
    image: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/1dd243f62cfe4618a92d1a9701aebf69_9366/NMD_R1_Shoes_Green_ID5756_01_standard.jpg',
    ],
    price: 140,
  },
  {
    name: 'Yeezy Boost 350',
    description: 'Adidas Yeezy Boost 350 Sneakers',
    brand: 'Adidas',
    type: 'Sneakers',
    image: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/46e98976ba2d4cc3a519af02010ef4f5_9366/YZY_350_V2_CMPCT_Beige_H06519_01_standard.jpg',
    ],
    price: 220,
  },
  {
    name: 'GSG-9.7.E',
    description: 'Adidas GSG-9.7.E Boots',
    brand: 'Adidas',
    type: 'Boots',
    image: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7478b54f15c14310874cae2a00e48723_9366/GSG-9.7.E_Boots_Black_GZ6115_01_standard.jpg',
    ],
    price: 200,
  },
  {
    name: 'Adilette Comfort',
    description: 'Adidas Adilette Comfort Sandals',
    brand: 'Adidas',
    type: 'Sandals',
    image: [
      'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/ffb142c8f2e743da851e4fd23660ec2d_9366/Adilette_Comfort_Slides_Blue_IF4356_02_standard_hover.jpg',
    ],
    price: 35,
  },
  {
    name: 'Suede Classic',
    description: 'Puma Suede Classic Sneakers',
    brand: 'Puma',
    type: 'Sneakers',
    image: [
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/374915/97/sv01/fnd/PNA/fmt/png/Suede-Classic-XXI-Sneakers',
    ],
    price: 70,
  },
  {
    name: 'Palermo Vintage Sneakers',
    description: 'Puma Palermo Vintage Sneakers',
    brand: 'Puma',
    type: 'Sneakers',
    image: [
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/396841/01/sv01/fnd/PNA/fmt/png/Palermo-Vintage-Sneakers',
    ],
    price: 80,
  },
  {
    name: 'Easy Rider Vintage Sneakers',
    description: 'Puma Easy Rider Vintage Sneakers',
    brand: 'Puma',
    type: 'Sneakers',
    image: [
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/399028/01/sv01/fnd/PNA/fmt/png/Easy-Rider-Vintage-Sneakers',
    ],
    price: 90,
  },
  {
    name: 'Desierto v3 Puretex',
    description: 'Puma Desierto v3 Puretex Boots',
    brand: 'Puma',
    type: 'Boots',
    image: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/393928/01/sv01/fnd/PNA/fmt/png/Desierto-v3-Puretex-Men's-Boots",
    ],
    price: 100,
  },
  {
    name: 'Leadcat 2.0 V Slides',
    description: 'Puma Leadcat 2.0 V Slides',
    brand: 'Puma',
    type: 'Sandals',
    image: [
      'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/384139/02/sv01/fnd/PNA/fmt/png/Leadcat-2.0-Slides',
    ],
    price: 40,
  },
  {
    name: '574 Core',
    description: 'New Balance 574 Core Sneakers',
    brand: 'New Balance',
    type: 'Sneakers',
    image: [
      'https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    ],
    price: 80,
  },
  {
    name: 'Fresh Foam 880v14',
    description: 'New Balance Fresh Foam 880v14 Sneakers',
    brand: 'New Balance',
    type: 'Sneakers',
    image: [
      'https://nb.scene7.com/is/image/NB/w860i14_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    ],
    price: 130,
  },
  {
    name: '327',
    description: 'New Balance 327 Sneakers',
    brand: 'New Balance',
    type: 'Sneakers',
    image: [
      'https://nb.scene7.com/is/image/NB/ws327fe_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    ],
    price: 100,
  },
  {
    name: 'Fresh Foam X Heirro Mid Gore-Tex',
    description: 'New Balance Trail Hierro v6 Boots',
    brand: 'New Balance',
    type: 'Boots',
    image: [
      'https://nb.scene7.com/is/image/NB/wthimcre_nb_02_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    ],
    price: 140,
  },
  {
    name: '200 Slide',
    description: 'New Balance 200 Slide Sandals',
    brand: 'New Balance',
    type: 'Sandals',
    image: [
      'https://nb.scene7.com/is/image/NB/suf200a3_nb_04_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880',
    ],
    price: 25,
  },
  {
    name: 'HOVR Phantom',
    description: 'Under Armour HOVR Phantom Sneakers',
    brand: 'Under Armour',
    type: 'Sneakers',
    image: [
      'https://underarmour.scene7.com/is/image/Underarmour/3026582-602_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688',
    ],
    price: 140,
  },
  {
    name: 'Charged Assert 10',
    description: 'Under Armour Charged Assert 10 Sneakers',
    brand: 'Under Armour',
    type: 'Sneakers',
    image: [
      'https://underarmour.scene7.com/is/image/Underarmour/3026175-001_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688',
    ],
    price: 75,
  },
  {
    name: 'Curry 11 Mouthguard',
    description: 'Under Armour Curry 11 Mouthguard Sneakers',
    brand: 'Under Armour',
    type: 'Sneakers',
    image: [
      'https://underarmour.scene7.com/is/image/Underarmour/3027503-001_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688',
    ],
    price: 160,
  },
  {
    name: 'UA HOVR Infil Tactical',
    description: 'Under Armour UA HOVR Infil Tactical Boots',
    brand: 'Under Armour',
    type: 'Boots',
    image: [
      'https://underarmour.scene7.com/is/image/Underarmour/3026369-200_DEFAULT?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688',
    ],
    price: 200,
  },
  {
    name: 'Locker IV Slides',
    description: 'Under Armour Locker IV Slides Sandals',
    brand: 'Under Armour',
    type: 'Sandals',
    image: [
      'https://underarmour.scene7.com/is/image/Underarmour/3023758-001_TOE?rp=standard-30pad%7CpdpMainDesktop&scl=1&fmt=jpg&qlt=85&resMode=sharp2&cache=on%2Con&bgc=f0f0f0&wid=566&hei=708&size=536%2C688',
    ],
    price: 20,
  },
  {
    name: 'Old Skool',
    description: 'Vans Old Skool Sneakers',
    brand: 'Vans',
    type: 'Sneakers',
    image: [
      'https://images.vans.com/is/image/Vans/VN0A5FCB_Y28_HERO?wid=1600&hei=1984&fmt=jpeg&qlt=90&resMode=sharp2&op_usm=0.9,1.7,8,0',
    ],
    price: 60,
  },
  {
    name: 'Sk8-Hi',
    description: 'Vans Sk8-Hi Sneakers',
    brand: 'Vans',
    type: 'Sneakers',
    image: [
      'https://images.vans.com/is/image/Vans/VN000D5I_B8C_ALT1?hei=617&wid=492&qlt=50&resMode=sharp2',
    ],
    price: 70,
  },
  {
    name: 'Authentic',
    description: 'Vans Authentic Sneakers',
    brand: 'Vans',
    type: 'Sneakers',
    image: [
      'https://images.vans.com/is/image/Vans/VN000TSV_BXH_ALT1?hei=617&wid=492&qlt=50&resMode=sharp2',
    ],
    price: 50,
  },
  {
    name: 'UltraRange EXO Hi MTE',
    description: 'Vans UltraRange EXO Hi MTE Boots',
    brand: 'Vans',
    type: 'Boots',
    image: [
      'https://images.vans.com/is/image/Vans/VN0A5JHX_5SM_ALT1?hei=617&wid=492&qlt=50&resMode=sharp2',
    ],
    price: 120,
  },
  {
    name: 'Slide-On',
    description: 'Vans Slide-On Sandals',
    brand: 'Vans',
    type: 'Sandals',
    image: [
      'https://www.billioncreation.com/wp-content/uploads/2021/05/Vans-La-Costa-Slide-On-Red-Hero.jpg',
    ],
    price: 30,
  },
];

module.exports = products;
