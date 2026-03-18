export interface Tractor {
  id: string;
  model: string;
  hp: number;
  rearTyreSize: string;
  type: string;
  drive: string;
  imageUrl: string;
  description: string;
  specifications: {
    engine: string;
    transmission: string;
    pto: string;
    hydraulics: string;
    fuelTank: string;
    weight: string;
  };
}

export const tractors: Tractor[] = [
  {
    id: '5075-bs4-ac',
    model: '5075 BS4 AC',
    hp: 74,
    rearTyreSize: '16.9 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5075e-tractor/5075E_Front_Right_Studio_Graphic_4k_large_0d6f490e3a6e1a799a32ba828c1f9bffe32e2cf6.jpg',
    description: 'Premium 4WD tractor with AC cabin, ideal for large farms and intensive operations with superior power and comfort.',
    specifications: {
      engine: '4-cylinder, 4.5L diesel',
      transmission: 'Gear Pro with synchronized shuttle',
      pto: '540/1000 RPM',
      hydraulics: 'Dual pump, 2500 kg lift capacity',
      fuelTank: '68 liters',
      weight: '2850 kg'
    }
  },
  {
    id: '5405-bs4',
    model: '5405 BS4',
    hp: 63,
    rearTyreSize: '14.9 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5405-tractor/5405_ac_cab_right_low_large_2345c81c932e22a9a36425d7b6b85b9f2325c03c.jpg',
    description: 'Powerful 4WD workhorse perfect for heavy-duty farming tasks, offering excellent traction and reliability.',
    specifications: {
      engine: '4-cylinder, 3.9L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '2200 kg lift capacity',
      fuelTank: '60 liters',
      weight: '2650 kg'
    }
  },
  {
    id: '5405-bs4-ac-cab',
    model: '5405 BS4 AC CAB',
    hp: 63,
    rearTyreSize: '14.9 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5405-tractor/5405_ac_cab_right_low_large_2345c81c932e22a9a36425d7b6b85b9f2325c03c.jpg',
    description: 'Premium cabin tractor with AC, designed for all-weather comfort and extended work hours in challenging conditions.',
    specifications: {
      engine: '4-cylinder, 3.9L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '2200 kg lift capacity',
      fuelTank: '60 liters',
      weight: '2750 kg'
    }
  },
  {
    id: '5310-bs4-2wd',
    model: '5310 BS4',
    hp: 57,
    rearTyreSize: '14.9 x 28',
    type: 'Gear Pro',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5310e-tractor/john_deere_india_trem4_5310_right_angle_large_1a5dd6f40ebd3c6aac80321ed0a29f52e44dbe57.png',
    description: 'Efficient 2WD model perfect for flat terrains, rotavator work, and general farm operations with excellent fuel economy.',
    specifications: {
      engine: '3-cylinder, 3.2L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '2000 kg lift capacity',
      fuelTank: '55 liters',
      weight: '2350 kg'
    }
  },
  {
    id: '5310-bs4-4wd',
    model: '5310 BS4',
    hp: 57,
    rearTyreSize: '14.9 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5310e-tractor/john_deere_india_trem4_5310_right_angle_large_1a5dd6f40ebd3c6aac80321ed0a29f52e44dbe57.png',
    description: 'Versatile 4WD option for varied terrain farming, providing extra grip for challenging field conditions.',
    specifications: {
      engine: '3-cylinder, 3.2L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '2000 kg lift capacity',
      fuelTank: '55 liters',
      weight: '2450 kg'
    }
  },
  {
    id: '5210-2wd',
    model: '5210',
    hp: 50,
    rearTyreSize: '13.6 x 28',
    type: 'Gear Pro',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5210GearPro-tractor/John_Deere_India_Tractors_5210_Gear_Pro_large_0f8a86c79862106b322a2cbee2f41369222a70a4.jpg',
    description: 'Popular 50 HP model ideal for medium farms, offering balanced performance for diverse farming applications.',
    specifications: {
      engine: '3-cylinder, 2.9L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '1800 kg lift capacity',
      fuelTank: '52 liters',
      weight: '2200 kg'
    }
  },
  {
    id: '5210-4wd',
    model: '5210',
    hp: 50,
    rearTyreSize: '13.6 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5210GearPro-tractor/John_Deere_India_Tractors_5210_Gear_Pro_large_0f8a86c79862106b322a2cbee2f41369222a70a4.jpg',
    description: 'Enhanced 4WD variant for improved traction in wet and hilly terrain, perfect for all-season farming.',
    specifications: {
      engine: '3-cylinder, 2.9L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '1800 kg lift capacity',
      fuelTank: '52 liters',
      weight: '2300 kg'
    }
  },
  {
    id: '5210-4wd-hd',
    model: '5210',
    hp: 50,
    rearTyreSize: '13.6 x 28',
    type: 'Wet Clutch / Heavy Duty',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/e-series-tractors/5210GearPro-tractor/John_Deere_India_Tractors_5210_Gear_Pro_large_0f8a86c79862106b322a2cbee2f41369222a70a4.jpg',
    description: 'Heavy-duty variant with wet clutch system for intensive use, offering superior durability and extended service life.',
    specifications: {
      engine: '3-cylinder, 2.9L diesel',
      transmission: 'Heavy Duty with wet clutch',
      pto: '540 RPM',
      hydraulics: '1800 kg lift capacity',
      fuelTank: '52 liters',
      weight: '2400 kg'
    }
  },
  {
    id: '5050d-2wd-gearpro',
    model: '5050D',
    hp: 50,
    rearTyreSize: '13.6 x 28',
    type: 'Gear Pro',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/images/5050d_tractor_large_1d4d9d02bdedcff9452193a7843884aa9058dc44.png',
    description: 'Reliable 50 HP workhorse with Gear Pro technology, excellent for rotavator and implements.',
    specifications: {
      engine: '3-cylinder, 2.9L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '1800 kg lift capacity',
      fuelTank: '50 liters',
      weight: '2150 kg'
    }
  },
  {
    id: '5050d-2wd-regular',
    model: '5050D',
    hp: 50,
    rearTyreSize: '13.6 x 28',
    type: 'Regular',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/images/5050d_tractor_large_1d4d9d02bdedcff9452193a7843884aa9058dc44.png',
    description: 'Budget-friendly regular variant offering solid performance for everyday farming tasks at competitive pricing.',
    specifications: {
      engine: '3-cylinder, 2.9L diesel',
      transmission: 'Standard 8F/2R',
      pto: '540 RPM',
      hydraulics: '1600 kg lift capacity',
      fuelTank: '50 liters',
      weight: '2100 kg'
    }
  },
  {
    id: '5045d-2wd-gearpro',
    model: '5045D',
    hp: 46,
    rearTyreSize: '12.4 x 28',
    type: 'Gear Pro',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/5045D_powerPro_large_ad9e2adb47697e5d237eaefd0c5b3fc38a28da1b.png',
    description: 'Compact yet powerful tractor ideal for small to medium farms with varied implement usage.',
    specifications: {
      engine: '3-cylinder, 2.7L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '1600 kg lift capacity',
      fuelTank: '48 liters',
      weight: '2000 kg'
    }
  },
  {
    id: '5045d-4wd-gearpro',
    model: '5045D',
    hp: 46,
    rearTyreSize: '12.4 x 28',
    type: 'Gear Pro',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/5045D_powerPro_large_ad9e2adb47697e5d237eaefd0c5b3fc38a28da1b.png',
    description: 'All-terrain 4WD model delivering superior grip and control for challenging field conditions.',
    specifications: {
      engine: '3-cylinder, 2.7L diesel',
      transmission: 'Gear Pro with 9F/3R',
      pto: '540 RPM',
      hydraulics: '1600 kg lift capacity',
      fuelTank: '48 liters',
      weight: '2100 kg'
    }
  },
  {
    id: '5045d-2wd-regular',
    model: '5045D',
    hp: 46,
    rearTyreSize: '12.4 x 28',
    type: 'Regular',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/5045D_powerPro_large_ad9e2adb47697e5d237eaefd0c5b3fc38a28da1b.png',
    description: 'Economical choice for farmers seeking dependable performance without premium features.',
    specifications: {
      engine: '3-cylinder, 2.7L diesel',
      transmission: 'Standard 8F/2R',
      pto: '540 RPM',
      hydraulics: '1500 kg lift capacity',
      fuelTank: '48 liters',
      weight: '1950 kg'
    }
  },
  {
    id: '5042d-2wd',
    model: '5042D',
    hp: 44,
    rearTyreSize: '12.4 x 28',
    type: 'Regular',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/images/5042D_PowerPro__Tractor_large_cb7429120cc9a1ea5c962a238471cf617084328c.png',
    description: 'Entry-level 44 HP model perfect for small farms, orchard work, and light agricultural operations.',
    specifications: {
      engine: '3-cylinder, 2.6L diesel',
      transmission: 'Standard 8F/2R',
      pto: '540 RPM',
      hydraulics: '1500 kg lift capacity',
      fuelTank: '45 liters',
      weight: '1850 kg'
    }
  },
  {
    id: '5036d-2wd',
    model: '5036D',
    hp: 35,
    rearTyreSize: '11.2 x 28',
    type: 'Regular',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/d-series-tractors/5036d-tractor/5036D_tractor_large_e799c467a87f25287e1062caf83939a533f7f52f.jpg',
    description: 'Compact 35 HP tractor suited for small farms, vineyard operations, and precision farming tasks.',
    specifications: {
      engine: '3-cylinder, 2.3L diesel',
      transmission: 'Standard 6F/2R',
      pto: '540 RPM',
      hydraulics: '1200 kg lift capacity',
      fuelTank: '42 liters',
      weight: '1650 kg'
    }
  },
  {
    id: '3036en-2wd',
    model: '3036EN',
    hp: 35,
    rearTyreSize: '11.2 x 28',
    type: 'Regular',
    drive: '2WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/speciality-tractors/3036en-tractor/3036EN_Front_Right_Studio_Graphic_4K_large_7a599509297c8c62b455bc85a7a9f059e0c1e8af.jpg',
    description: 'Efficient and economical 35 HP model perfect for diversified farming and horticulture applications.',
    specifications: {
      engine: '3-cylinder, 2.3L diesel',
      transmission: 'Standard 6F/2R',
      pto: '540 RPM',
      hydraulics: '1200 kg lift capacity',
      fuelTank: '40 liters',
      weight: '1600 kg'
    }
  },
  {
    id: '3036en-4wd',
    model: '3036EN',
    hp: 35,
    rearTyreSize: '11.2 x 28',
    type: 'Regular',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/speciality-tractors/3036en-tractor/3036EN_Front_Right_Studio_Graphic_4K_large_7a599509297c8c62b455bc85a7a9f059e0c1e8af.jpg',
    description: '4WD variant offering enhanced traction for uneven terrain and wet field conditions.',
    specifications: {
      engine: '3-cylinder, 2.3L diesel',
      transmission: 'Standard 6F/2R',
      pto: '540 RPM',
      hydraulics: '1200 kg lift capacity',
      fuelTank: '40 liters',
      weight: '1700 kg'
    }
  },
  {
    id: '3028en-4wd',
    model: '3028EN',
    hp: 28,
    rearTyreSize: '9.5 x 24',
    type: 'Regular',
    drive: '4WD',
    imageUrl: 'https://www.deere.co.in/assets/images/tractors/speciality-tractors/3028en-tractor/3028EN_Front_Right_Studio_Graphic_4K_large_0a333930a6373da75d4c1607c130a041c167d088.jpg',
    description: 'Lightweight 4WD tractor ideal for small farms, greenhouse operations, and orchard maintenance work.',
    specifications: {
      engine: '3-cylinder, 1.9L diesel',
      transmission: 'Standard 6F/2R',
      pto: '540 RPM',
      hydraulics: '1000 kg lift capacity',
      fuelTank: '35 liters',
      weight: '1450 kg'
    }
  }
];
