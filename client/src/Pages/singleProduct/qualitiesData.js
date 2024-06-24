const qualitiesData = [
  {
    name_en: "Size",
    name_ar: "الحجم",
    values: [
      {
        title: "XL",
        price: 300,
        images: [
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwb69b0fcb/images/L1212_031_20.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwe3d06ce9/images/L1212_031_21.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwa82aac9e/images/L1212_031_23.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw131e2494/images/L1212_031_24.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw705be7d4/images/L1212_031_33.jpg?sw=1100&sh=1100",
        ],
      },
      {
        title: "L",
        price: 280,
        images: [
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwe5cfe319/images/L1212_PQS_20.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwa0720ea3/images/L1212_PQS_21.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw276be89d/images/L1212_PQS_22.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw84ebb2f1/images/L1212_PQS_23.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwbff0d47d/images/L1212_PQS_24.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw81d91955/images/L1212_PQS_32.jpg?sw=700&sh=700",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw2a38eaf9/images/L1212_PQS_33.jpg?sw=700&sh=700",
        ],
      },
      {
        title: "M",
        price: 300,
        images: [
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw5f18a81a/images/L1212_4PW_20.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwb9b1988c/images/L1212_4PW_21.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwa7ba6937/images/L1212_4PW_22.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwcf5d150c/images/L1212_4PW_24.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwf2a1cff9/images/L1212_4PW_32.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw9ca8dc62/images/L1212_4PW_33.jpg?sw=1100&sh=1100",
        ],
      },
      {
        title: "S",
        price: 280,
        images: [
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwff95b6d8/images/HH2704_MK9_20.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwa93f4309/images/HH2704_MK9_21.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw472b4513/images/HH2704_MK9_23.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw9ad0f53f/images/HH2704_MK9_33.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dwa21022ba/images/HH2704_MK9_34.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw8bd49db7/images/HH2704_MK9_36.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw02fbef11/images/HH2704_MK9_37.jpg?sw=1100&sh=1100",
          "https://www.lacoste.com.eg/dw/image/v2/BDCL_PRD/on/demandware.static/-/Sites-lacoste-master-catalog/default/dw3fa401e3/images/HH2704_MK9_L1.jpg?sw=1100&sh=1100",
        ],
      },
    ],
  },
  {
    name_en: "color",
    name_ar: "اللون",
    values: [
      {
        title: "red",
        price: 300,
        images: [
          "https://tse1.mm.bing.net/th?id=OIP.v8415ZvuNr2KEndHIa5chwHaHa&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.gQyIs_kdEGGmREMbCDfcsAHaIr&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.8UGjzo9ArTWscwLmByld1AHaHa&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.KstUYcdrE01yp8VITZ8G4gHaHa&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.-8bp9eFKrxbF5Js6yDbi9QHaMW&pid=Api&P=0&h=180",
        ],
      },
      {
        title: "blue",
        price: 280,
        images: [
          "https://tse3.mm.bing.net/th?id=OIP.9ieQ9liZfiRzZcD9VUcTjQHaJQ&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.ZVMxdrL4L7pPvk6STthMBQHaJ1&pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th?id=OIP.tGuH6MixTuQyYlROe8JlHgHaJ4&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.BhQoHEP9o62H-pqCNxAyxAHaJC&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.aKe6sYJrxwTL9HjzCGuWIgHaHa&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.XB3vulGgHumbdx7z6U5XhQHaJo&pid=Api&P=0&h=180",
        ],
      },
      {
        title: "black",
        price: 300,
        images: [
          "https://tse4.mm.bing.net/th?id=OIP.i9N5D2N4WzBZh1lHUe9k5QHaLW&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.aC0n5pzZ80kFX1D37EJJAAHaH8&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.dYeOCBJtA0H6Qfu5H0MWnQAAAA&pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th?id=OIP.f1jIC9dLPRYVxH37GJKSuwHaHa&pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th?id=OIP.xZsdHdq5IpcFlI6jcVAZgQHaLH&pid=Api&P=0&h=180",
        ],
      },
      {
        title: "yellow",
        price: 280,
        images: [
          "https://tse4.mm.bing.net/th?id=OIP.q9cj-1XfrLv__2FOTziCVAHaHa&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.ud2Uq1j1nEAZUA4Ugi8kTwHaJ4&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.ED3kE8VC_1uWy2e5zRqTcAHaJE&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.alUpwNgYIuB6hJMiAHyNZgHaHa&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.P9imSd2N1mEzbM8jG3p4NgHaLG&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.78AJvLe_htkXUBz8Sb-3FQHaJ1&pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th?id=OIP.qzb3xJIha6eWkHjJaWK_qgHaHa&pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th?id=OIP.ShJ694fEJXdaExwLvJ5VnQHaHa&pid=Api&P=0&h=180",
        ],
      },
    ],
  },
];
export default qualitiesData;
