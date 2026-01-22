/**
 * Azerbaijan Travel Guide API
 * CLEAN STUDENT VERSION (One-file)
 * In-memory database
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* ================= FILE UPLOAD ================= */

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOAD_DIR),
  filename: (_, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) =>
    file.mimetype.startsWith('image/')
      ? cb(null, true)
      : cb(new Error('Only images allowed'))
});

/* ================= IN-MEMORY DB ================= */

let places = [
  // ============ HOTELS ============
  {
    id: '1',
    title: 'Four Seasons Hotel Baku',
    description: 'Luxury 5-star hotel located in the historic building overlooking the Caspian Sea. Features spa, multiple restaurants, and elegant rooms.',
    category: 'hotel',
    city: 'Baku',
    address: '1 Neftchilar Avenue, Baku 1095',
    coordinates: { lat: 40.3792, lng: 49.8503 },
    priceRange: '$$$$',
    rating: 4.8,
    reviewsCount: 342,
    photos: [
      'https://ulduztourism.az/wp-content/uploads/2018/02/four-seasons-hotel-baku.jpg',
      'https://www.fourseasons.com/alt/img-opt/~75.701.0,0000-0,0000-1600,0000-900,0000/publish/content/dam/fourseasons/images/web/BKU/BKU_168_aspect16x9.jpg'
    ],
    amenities: ['Wi-Fi', 'Swimming Pool', 'Spa', 'Restaurant', 'Fitness Center', 'Parking', 'Room Service'],
    contact: {
      phone: '+994 12 404 90 50',
      website: 'https://www.fourseasons.com/baku/',
      email: 'reservations.baku@fourseasons.com'
    },
    workingHours: '24/7',
    createdAt: '2023-01-15',
    isFeatured: true,
    tags: ['luxury', '5-star', 'sea view', 'central', 'spa'],
    views: 1250
  },
  {
    id: '2',
    title: 'Fairmont Baku, Flame Towers',
    description: 'Modern hotel in the iconic Flame Towers with panoramic views of Baku and the Caspian Sea.',
    category: 'hotel',
    city: 'Baku',
    address: '1A Mehdi Huseyn Street, Baku 1006',
    coordinates: { lat: 40.3594, lng: 49.8332 },
    priceRange: '$$$$',
    rating: 4.7,
    reviewsCount: 289,
    photos: [
      'https://www.schueco.com/resource/blob/81412/c6659be61a57a19c18aa5b87a6306523/3103a12-data.jpg',
      'https://q-xx.bstatic.com/xdata/images/hotel/max500/24657933.jpg?k=052b3369108766a1fceead8e987f437206c472c614ae17c967e67595f3ce54a9&o='
    ],
    amenities: ['Wi-Fi', 'Swimming Pool', 'Spa', 'Multiple Restaurants', 'Conference Rooms', 'Bar'],
    contact: {
      phone: '+994 12 310 12 34',
      website: 'https://www.fairmont.com/baku/',
      email: 'baku@fairmont.com'
    },
    workingHours: '24/7',
    createdAt: '2023-02-10',
    isFeatured: true,
    tags: ['modern', 'iconic', 'city view', 'luxury'],
    views: 1100
  },
  {
    id: '3',
    title: 'Jumeirah Bilgah Beach Hotel',
    description: 'Beachfront luxury resort with private beach, pools, and comprehensive spa facilities.',
    category: 'hotel',
    city: 'Baku',
    address: 'Bilgah Beach, Baku',
    coordinates: { lat: 40.5700, lng: 50.0375 },
    priceRange: '$$$$',
    rating: 4.6,
    reviewsCount: 234,
    photos: [
      'https://uploads2.stells.info/d3InRW48YlJk3RN6SzNzr7MAbmI=/952x600/jpeg/e/b5/eb531dad866526c35e000cc9cb79ea10.jpeg',
      'https://images.trvl-media.com/lodging/5000000/4950000/4944700/4944617/fc9e5306.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill'
    ],
    amenities: ['Private Beach', 'Multiple Pools', 'Spa', 'Kids Club', 'Water Sports', 'Restaurants'],
    contact: {
      phone: '+994 12 404 88 88',
      website: 'https://www.jumeirah.com/en/stay/baku/jumeirah-bilgah-beach-hotel'
    },
    workingHours: '24/7',
    createdAt: '2023-01-25',
    isFeatured: true,
    tags: ['beachfront', 'resort', 'family friendly', 'spa'],
    views: 890
  },
  {
    id: '4',
    title: 'Sheki Palace Hotel',
    description: 'Historic hotel located near Sheki Khan Palace, offering traditional architecture and modern comforts.',
    category: 'hotel',
    city: 'Shaki',
    address: 'Mirza Fatali Akhundov Street, Shaki 5500',
    coordinates: { lat: 41.1976, lng: 47.1724 },
    priceRange: '$$',
    rating: 4.4,
    reviewsCount: 156,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSimwIXGBBNG4ybqrNNw0GXs9o5K037YFHOow&s',
      'https://resanthotels.az/uploads/posts/2023-01/1674643610_1.jpg'
    ],
    amenities: ['Wi-Fi', 'Restaurant', 'Garden', 'Traditional Architecture', 'Parking'],
    contact: {
      phone: '+994 24 244 50 50',
      website: ''
    },
    workingHours: '24/7',
    createdAt: '2023-03-05',
    isFeatured: false,
    tags: ['historic', 'traditional', 'palace area', 'cultural'],
    views: 540
  },
  {
    id: '5',
    title: 'Ganja Hotel',
    description: 'Modern hotel in the center of Ganja, Azerbaijan\'s second largest city.',
    category: 'hotel',
    city: 'Ganja',
    address: 'Heydar Aliyev Avenue 156, Ganja 2000',
    coordinates: { lat: 40.6828, lng: 46.3606 },
    priceRange: '$$',
    rating: 4.2,
    reviewsCount: 134,
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/3c/4b/2c/ganja-hotel.jpg?w=700&h=-1&s=1',
      'https://oldcityhotelganja.com/img/4946bd5cce9fafd0.webp'
    ],
    amenities: ['Wi-Fi', 'Restaurant', 'Conference Room', 'Parking', 'Air Conditioning'],
    contact: {
      phone: '+994 22 234 56 78',
      website: ''
    },
    workingHours: '24/7',
    createdAt: '2023-02-20',
    isFeatured: false,
    tags: ['central', 'modern', 'business', 'ganja'],
    views: 430
  },

  // ============ RESTAURANTS ============
  {
    id: '6',
    title: 'Chinar Restaurant',
    description: 'Traditional Azerbaijani restaurant in the Old City (Icherisheher) serving authentic local cuisine.',
    category: 'restaurant',
    city: 'Baku',
    address: '8 Kichik Gala Street, Icherisheher, Baku 1000',
    coordinates: { lat: 40.3661, lng: 49.8340 },
    priceRange: '$$',
    rating: 4.7,
    reviewsCount: 456,
    photos: [
      'https://idea.az/media/filer_public/5a/37/5a37a2f0-c0d4-4452-90d2-54266d140b2e/cov.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/cf/3d/1f/chinar.jpg?w=900&h=500&s=1',
      'https://idea.az/media/filer_public/25/68/256849bc-44dc-41c2-8583-1b859166ec06/1.jpg'
    ],
    amenities: ['Traditional Cuisine', 'Outdoor Seating', 'Live Music', 'Wi-Fi'],
    contact: {
      phone: '+994 50 555 11 22',
      website: ''
    },
    workingHours: '1:00 PM - 11:00 PM',
    createdAt: '2023-01-10',
    isFeatured: true,
    tags: ['traditional', 'old city', 'local cuisine', 'authentic'],
    views: 980
  },
  {
    id: '7',
    title: 'Sumakh Restaurant',
    description: 'Fine dining restaurant offering modern interpretations of Azerbaijani cuisine with panoramic city views.',
    category: 'restaurant',
    city: 'Baku',
    address: 'Flame Towers, Baku 1006',
    coordinates: { lat: 40.3594, lng: 49.8332 },
    priceRange: '$$$',
    rating: 4.8,
    reviewsCount: 389,
    photos: [
      'https://cdn.tasteatlas.com/images/restaurants/2a8af0993b604c269ca39280b9f00fbd.jpg?w=600',
      'https://bakuguide.com/images/places/129/sumax-1.png'
    ],
    amenities: ['Fine Dining', 'City Views', 'Wine Selection', 'Vegetarian Options'],
    contact: {
      phone: '+994 12 310 12 35',
      website: ''
    },
    workingHours: '6:00 PM - 11:00 PM',
    createdAt: '2023-02-15',
    isFeatured: true,
    tags: ['fine dining', 'modern', 'city view', 'romantic'],
    views: 870
  },
  {
    id: '8',
    title: 'Gala Restoran',
    description: 'Traditional Sheki cuisine restaurant known for its piti and sheki halva.',
    category: 'restaurant',
    city: 'Shaki',
    address: 'M.F. Akhundov Street 25, Shaki 5500',
    coordinates: { lat: 41.1978, lng: 47.1728 },
    priceRange: '$$',
    rating: 4.5,
    reviewsCount: 278,
    photos: [
      'https://www.gulfgroup.net/wp-content/uploads/2018/10/restaurant-gala-bazaar-5-1436x808.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJPH_4lf67AIq8RsCAUrZB1bvdhtChsND6sedMKgWVOyS2Wv2RqRXZn2dSuuVScByzJc&usqp=CAU'
    ],
    amenities: ['Traditional Sheki Cuisine', 'Family Style', 'Local Specialties'],
    contact: {
      phone: '+994 24 244 55 55',
      website: ''
    },
    workingHours: '10:00 AM - 10:00 PM',
    createdAt: '2023-03-01',
    isFeatured: false,
    tags: ['sheki cuisine', 'traditional', 'local specialties', 'family'],
    views: 650
  },
  {
    id: '9',
    title: 'Lankaran Balig Evi',
    description: 'Specializing in fresh fish from the Caspian Sea and Lankaran region cuisine.',
    category: 'restaurant',
    city: 'Lankaran',
    address: 'Nizami Street 45, Lankaran 4200',
    coordinates: { lat: 38.7543, lng: 48.8506 },
    priceRange: '$$',
    rating: 4.4,
    reviewsCount: 189,
    photos: [
      'https://monyo.az/v4/uploads/a_254_202202201300231595791566.jpg'
    ],
    amenities: ['Fresh Seafood', 'Traditional Lankaran Dishes', 'Outdoor Seating'],
    contact: {
      phone: '+994 25 234 56 78',
      website: ''
    },
    workingHours: '12:00 AM - 10:00 PM',
    createdAt: '2023-02-25',
    isFeatured: false,
    tags: ['seafood', 'lankaran cuisine', 'fresh fish', 'local'],
    views: 520
  },

  // ============ ATTRACTIONS ============
  {
    id: '10',
    title: 'Maiden Tower (Giz Galasi)',
    description: '12th-century tower and UNESCO World Heritage Site, symbol of Baku with museum inside.',
    category: 'attraction',
    city: 'Baku',
    address: 'Icherisheher, Baku 1000',
    coordinates: { lat: 40.3663, lng: 49.8372 },
    priceRange: '$',
    rating: 4.7,
    reviewsCount: 2789,
    photos: [
      'https://hblimg.mmtcdn.com/content/hubble/img/baku_ttd_img/mmt/activities/m_Maiden_Towers_Baku_1_l_667_1000.jpg',
      'https://icomaz.az/uploads/images/3.AZ%C6%8FRBAYCAN%20MUZEYL%C6%8FRI/3.1%20TARIXI%20MUZEYL%C6%8FR%20V%C6%8F%20QORUQLAR/%E2%80%9C%C4%B0%C3%A7%C9%99ri%C5%9F%C9%99h%C9%99r%E2%80%9D%20tarixi%20muzeyi/1.jpg'
    ],

    amenities: ['Museum', 'Historical Site', 'Guided Tours', 'Photo Opportunities'],
    contact: {
      phone: '+994 12 492 14 34',
      website: 'http://icherisheher.gov.az/'
    },
    workingHours: '9:00 AM - 6:00 PM',
    createdAt: '2023-01-05',
    isFeatured: true,
    tags: ['UNESCO', 'historical', 'iconic', 'museum', 'must-see'],
    views: 3200
  },
  {
    id: '11',
    title: 'Palace of the Shirvanshahs',
    description: '15th-century palace complex, the largest monument of the Shirvanshahs dynasty.',
    category: 'attraction',
    city: 'Baku',
    address: 'Icherisheher, Baku 1000',
    coordinates: { lat: 40.3661, lng: 49.8335 },
    priceRange: '$',
    rating: 4.8,
    reviewsCount: 2345,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy27tWbdagPWRNNtkmUMGdYcDmxE6wrLhxrw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpcuD7ALM2d4kJOKLFEXJNCJ3axDZm50fCyWooBFMQrPMAmpw3v2HTb1KFwBmRp4qDDDo&usqp=CAU'],
    amenities: ['Historical Complex', 'Museum', 'Guided Tours', 'Architectural Site'],
    contact: {
      phone: '+994 12 492 10 73',
      website: 'http://icherisheher.gov.az/'
    },
    workingHours: '10:00 AM - 6:00 PM',
    createdAt: '2023-01-08',
    isFeatured: true,
    tags: ['UNESCO', 'palace', 'historical', 'architecture', 'must-see'],
    views: 2800
  },
  {
    id: '12',
    title: 'Heydar Aliyev Center',
    description: 'Architectural masterpiece designed by Zaha Hadid, hosting exhibitions and cultural events.',
    category: 'attraction',
    city: 'Baku',
    address: '1 Heydar Aliyev Avenue, Baku 1025',
    coordinates: { lat: 40.3959, lng: 49.8676 },
    priceRange: '$$',
    rating: 4.9,
    reviewsCount: 1890,
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/83/1a/58/heydar-aliyev-center.jpg?w=900&h=500&s=1',
      'https://heydaraliyevcenter.az/files/backgrounds/101369311674230513.jpg'
    ],
    amenities: ['Exhibition Halls', 'Concert Hall', 'Cafe', 'Parking', 'Guided Tours'],
    contact: {
      phone: '+994 12 497 29 89',
      website: 'https://heydaraliyevcenter.az/'
    },
    workingHours: ' 10:00 AM - 7:00 PM',
    createdAt: '2023-01-12',
    isFeatured: true,
    tags: ['modern architecture', 'zaha hadid', 'cultural center', 'exhibitions'],
    views: 2500
  },
  {
    id: '13',
    title: 'Icheri Sheher',
    description: 'Historic Old City of Baku with ancient architecture, narrow streets, and landmarks like Maiden Tower and Shirvanshah Palace.',
    category: 'attraction',
    city: 'Baku',
    address: 'Icherisheher, Baku 1000, Azerbaijan',
    coordinates: { lat: 40.3661, lng: 49.8355 },
    priceRange: '$$',
    rating: 4.8,
    reviewsCount: 3540,
    photos: [
      'https://cdn.touryup.com/i/tour/512/old-city-tour-baku-azerbaijan.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMwC_rap5l1PglV8m8bhHOGeiBl0ht6uWd-A&s'
    ],
    amenities: ['Guided Tours', 'Restaurants', 'Souvenir Shops', 'Historic Landmarks', 'Museums'],
    contact: {
      phone: '+994 12 123 45 67',
      website: 'https://icherisheher.gov.az/'
    },
    workingHours: '09:00 - 19:00',
    createdAt: '2023-01-15',
    isFeatured: true,
    tags: ['historic', 'ancient', 'landmark', 'UNESCO', 'cultural'],
    views: 5000
  },
  {
    id: '14',
    title: 'Sheki Khan Palace',
    description: 'Summer palace of Sheki khans with magnificent stained glass windows (shebeke) and frescoes.',
    category: 'attraction',
    city: 'Shaki',
    address: 'Palace Street, Shaki 5500',
    coordinates: { lat: 41.1975, lng: 47.1725 },
    priceRange: '$',
    rating: 4.7,
    reviewsCount: 1456,
    photos: [
      'https://wander-lush.org/wp-content/uploads/2023/06/Emily-Lush-Sheki-Azerbaijan-Palace-of-the-Sheki-Khan-Hero.jpg',
      'https://lh5.googleusercontent.com/proxy/uCfawy2MttIQA6e6Oz8DivPJ9J3kE9iF3FHe024Si6RcZsPTaPmWlWvyUiRWIKmg9JbUeDf3pQpnJ6nuSt4CsCQydZZo_C6u-hgR3YddjIggyaKiJqk'
    ],
    amenities: ['Historical Palace', 'Shebeke Windows', 'Frescoes', 'Guided Tours', 'Gardens'],
    contact: {
      phone: '+994 24 244 42 42',
      website: ''
    },
    workingHours: '9:00 AM - 5:00 PM',
    createdAt: '2023-02-05',
    isFeatured: true,
    tags: ['UNESCO', 'palace', 'historical', 'shebeke', 'summer palace'],
    views: 1800
  },
  {
    id: '15',
    title: 'Gobustan National Park',
    description: 'UNESCO site with ancient rock carvings (petroglyphs) and mud volcanoes dating back 40,000 years.',
    category: 'attraction',
    city: 'Baku',
    address: 'Gobustan, Baku',
    coordinates: { lat: 40.1020, lng: 49.3800 },
    priceRange: '$',
    rating: 4.8,
    reviewsCount: 1234,
    photos: [
      'https://unesco.preslib.az/images/site/image116.jpg',
      'https://techconnect.az/wp-content/uploads/2024/08/gobustan-2.webp'
    ],
    amenities: ['Petroglyphs', 'Mud Volcanoes', 'Museum', 'Guided Tours', 'Hiking Trails'],
    contact: {
      phone: '+994 12 492 18 67',
      website: 'http://gobustan.gov.az/'
    },
    workingHours: '9:00 AM - 5:00 PM',
    createdAt: '2023-01-20',
    isFeatured: true,
    tags: ['UNESCO', 'rock carvings', 'mud volcanoes', 'archaeological', 'historical'],
    views: 1900
  },
  {
    id: '16',
    title: 'Ateshgah Fire Temple',
    description: 'Ancient temple of fire worshippers in Surakhany, built over natural gas vents.',
    category: 'attraction',
    city: 'Baku',
    address: 'Surakhany, Baku',
    coordinates: { lat: 40.4150, lng: 50.0090 },
    priceRange: '$',
    rating: 4.5,
    reviewsCount: 987,
    photos: [
      'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/3c/78/2c.jpg',
      'https://media.istockphoto.com/id/1760118062/tr/foto%C4%9Fraf/baku-azerbaijan-ateshgah-fire-temple.jpg?s=612x612&w=0&k=20&c=kPHh9Q1-szc7qj27f54dbLdBIYGMHxHFSKNhWxTiSX4='
    ],
    amenities: ['Historical Temple', 'Fire Altars', 'Museum', 'Guided Tours'],
    contact: {
      phone: '+994 12 492 18 67',
      website: ''
    },
    workingHours: '9:00 AM - 6:00 PM',
    createdAt: '2023-01-25',
    isFeatured: false,
    tags: ['fire temple', 'historical', 'zoroastrian', 'religious site'],
    views: 1200
  },
  {
    id: '17',
    title: 'Yanar Dag (Burning Mountain)',
    description: 'Natural gas fire that blazes continuously on a hillside, known as the "Burning Mountain".',
    category: 'attraction',
    city: 'Baku',
    address: 'Yanar Dag, Absheron Peninsula',
    coordinates: { lat: 40.5030, lng: 49.8920 },
    priceRange: '$',
    rating: 4.4,
    reviewsCount: 876,
    photos: [
      'https://turkic.world/media/2024/02/27/yanardag.jpg',
      'https://azerbaijantour.com/wp-content/uploads/2017/11/yanardag-02-800x450.jpeg'

    ],
    amenities: ['Natural Phenomenon', 'Night Viewing', 'Parking'],
    contact: {
      phone: '+994 12 492 18 67',
      website: ''
    },
    workingHours: '24/7',
    createdAt: '2023-02-01',
    isFeatured: false,
    tags: ['natural gas', 'fire', 'natural wonder', 'night view'],
    views: 1100
  },
  {
    id: '18',
    title: 'Baku Boulevard (Bulvar)',
    description: 'Seaside promenade stretching along the Caspian Sea coast with parks, cafes, and attractions.',
    category: 'attraction',
    city: 'Baku',
    address: 'Neftchilar Avenue, Baku',
    coordinates: { lat: 40.3715, lng: 49.8500 },
    priceRange: '$$',
    rating: 4.8,
    reviewsCount: 2456,
    photos: [
      'https://d3w13n53foase7.cloudfront.net/small_ce91dbc9_2437_471d_9ec2_0c2237974f70_baku_photo_97e125d3fe.jpg',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/ba/98/8c/baku-boulevard.jpg?w=900&h=500&s=1'
    ],
    amenities: ['Walking Path', 'Cafes', 'Parks', 'Bike Rentals', 'Sea View', 'Entertainment'],
    contact: {
      phone: '+994 12 492 12 12',
      website: 'http://bulvar.az/'
    },
    workingHours: '24/7',
    createdAt: '2023-01-10',
    isFeatured: true,
    tags: ['seaside', 'promenade', 'park', 'cafes', 'walking', 'family'],
    views: 2700
  },
  {
    id: '19',
    title: 'Nizami Mausoleum',
    description: 'Tomb of the great Azerbaijani poet Nizami Ganjavi in Ganja.',
    category: 'attraction',
    city: 'Ganja',
    address: 'Nizami Street, Ganja 2000',
    coordinates: { lat: 40.6780, lng: 46.3570 },
    priceRange: '$',
    rating: 4.5,
    reviewsCount: 567,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHTAndmrLL4LQAvfYVnlOBwxcagdKcFZEieg&s'
    ],
    amenities: ['Historical Site', 'Cultural Monument', 'Park', 'Photo Opportunities'],
    contact: {
      phone: '+994 22 234 56 78',
      website: ''
    },
    workingHours: '9:00 AM - 6:00 PM',
    createdAt: '2023-02-15',
    isFeatured: false,
    tags: ['historical', 'poet', 'cultural', 'ganja', 'monument'],
    views: 780
  },
  {
    id: '20',
    title: 'Goygol Lake',
    description: 'Beautiful mountain lake in the foothills of the Caucasus Mountains near Ganja.',
    category: 'nature',
    city: 'Ganja',
    address: 'Goygol District, Ganja Region',
    coordinates: { lat: 40.4060, lng: 46.3250 },
    priceRange: '$',
    rating: 4.7,
    reviewsCount: 890,
    photos: [
      'https://goygolresort.az/photos/pages/1559543829.%D0%B3%D0%BE%D0%B9%D0%B3%D0%BE%D0%BB_%D1%84%D0%BE%D1%82%D0%BE-%D0%B4%D0%BB%D1%8F-%D1%81%D0%B0%D0%B9%D1%82%D0%B01%20main.jpg',
      'https://azerbaijan.travel/fit1600x900/center/pages/398/be-inspired-lake-goygol-06-resized.jpg'
    ],
    amenities: ['Hiking Trails', 'Picnic Areas', 'Boating', 'Photography', 'Nature Trails'],
    contact: {
      phone: '+994 22 234 56 78',
      website: ''
    },
    workingHours: '24/7',
    createdAt: '2023-02-20',
    isFeatured: true,
    tags: ['lake', 'mountain', 'nature', 'hiking', 'photography', 'scenic'],
    views: 1300
  },
  {
    id: '21',
    title: 'Gabaland',
    description: 'Amusement park and entertainment complex in Gabala with rides and attractions.',
    category: 'attraction',
    city: 'Gabala',
    address: 'Gabala, Azerbaijan',
    coordinates: { lat: 40.9982, lng: 47.8700 },
    priceRange: '$$',
    rating: 4.3,
    reviewsCount: 678,
    photos: [
      'https://i.ytimg.com/vi/MZoozyOx9eI/maxresdefault.jpg',
      'https://cdnuploads.aa.com.tr/uploads/PhotoGallery/2012/08/16/thumbs_b2_d3205d8cbe0734795e252aada48f23a8.jpg'    ],
    amenities: ['Amusement Rides', 'Restaurants', 'Entertainment', 'Family Activities'],
    contact: {
      phone: '+994 24 205 50 50',
      website: 'https://gabaland.az/'
    },
    workingHours: '10:00 AM - 10:00 PM',
    createdAt: '2023-03-05',
    isFeatured: false,
    tags: ['amusement park', 'family', 'entertainment', 'rides', 'gabala'],
    views: 950
  },
  {
    id: '22',
    title: 'Tufandag Mountain Resort',
    description: 'Year-round mountain resort with skiing in winter and hiking in summer.',
    category: 'attraction',
    city: 'Gabala',
    address: 'Gabala, Azerbaijan',
    coordinates: { lat: 40.9982, lng: 47.8700 },
    priceRange: '$$$',
    rating: 4.6,
    reviewsCount: 456,
    photos: [
      'https://www.tufandag.com/storage/app/media/Hotel/untitled-design-2-1.png',
      'https://y.cdrst.com/foto/hotel-sf/314acff/granderesp/foto-hotel-314a255.jpg',

    ],
    amenities: ['Ski Slopes', 'Cable Cars', 'Equipment Rental', 'Restaurants', 'Accommodation'],
    contact: {
      phone: '+994 24 205 55 55',
      website: 'https://tufandag.az/'
    },
    workingHours: '9:00 AM - 5:00 PM (Winter: 09:00-16:00)',
    createdAt: '2023-03-10',
    isFeatured: true,
    tags: ['ski resort', 'mountain', 'winter sports', 'hiking', 'gabala'],
    views: 1100
  },

  // ============ MUSEUMS ============
  {
    id: '23',
    title: 'National Museum of History of Azerbaijan',
    description: 'The largest museum in Azerbaijan with over 300,000 exhibits covering history from ancient times.',
    category: 'museum',
    city: 'Baku',
    address: '4 Haji Zeynalabdin Taghiyev Street, Baku 1005',
    coordinates: { lat: 40.3740, lng: 49.8450 },
    priceRange: '$',
    rating: 4.6,
    reviewsCount: 1234,
    photos: [
      'https://lh3.googleusercontent.com/proxy/n5tThqHxA6kP0f4SlemF7DUToTEZywAWrGjjrRULUwPMgqeaudj7h3ki6tCiDiynqqS5Ol_PDrShjrIcg8kcwEAhBLNgfCX2HqkKh6ypKKuBwB6bFumlF21Mv_yqj8Vy6_AqPVNu9Sydww',
      'https://www.advantour.com/img/azarbaijan/baku/history-museum1.jpg'
    ],
    amenities: ['Exhibitions', 'Guided Tours', 'Audio Guide', 'Gift Shop', 'Research Library'],
    contact: {
      phone: '+994 12 493 36 48',
      website: 'http://www.azhistorymuseum.az/'
    },
    workingHours: '10:00 AM - 6:00 PM (Closed: Monday)',
    createdAt: '2023-01-18',
    isFeatured: true,
    tags: ['history', 'national museum', 'archaeology', 'culture'],
    views: 1500
  },
  {
    id: '24',
    title: 'Azerbaijan National Carpet Museum',
    description: 'World\'s first and largest museum dedicated to the art of carpet weaving.',
    category: 'museum',
    city: 'Baku',
    address: '28 Mikayil Huseynov Street, Baku 1000',
    coordinates: { lat: 40.3590, lng: 49.8330 },
    priceRange: '$',
    rating: 4.7,
    reviewsCount: 987,
    photos: [
      'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/96/94/9c.jpg',
      'https://kohantextilejournal.com/wp-content/uploads/2021/03/The-Azerbaijan-National-Carpet-Museum-permanent-exhibition-kohan.jpg'
    ],
    amenities: ['Carpet Exhibitions', 'Weaving Demonstrations', 'Gift Shop', 'Guided Tours'],
    contact: {
      phone: '+994 12 497 20 57',
      website: 'http://azcarpetmuseum.az/'
    },
    workingHours: '10:00 AM - 6:00 PM (Closed: Monday)',
    createdAt: '2023-02-05',
    isFeatured: true,
    tags: ['carpet', 'textile art', 'cultural heritage', 'UNESCO'],
    views: 1200
  },
  {
    id: '25',
    title: 'Museum of Miniature Books',
    description: 'Unique museum featuring the world\'s largest collection of miniature books.',
    category: 'museum',
    city: 'Baku',
    address: 'Icherisheher, 1st Castle Lane, Baku 1000',
    coordinates: { lat: 40.3660, lng: 49.8340 },
    priceRange: '$',
    rating: 4.5,
    reviewsCount: 765,
    photos: [
      'https://www.azernews.az/media/2023/04/26/booksa.jpg',
      'https://azerbaijan.az/uploads/news-files/melumatlar/medeniyyet/muzeyl%C9%99r/mink2.jpg'
    ],
    amenities: ['Unique Collection', 'Guided Tours', 'Old City Location'],
    contact: {
      phone: '+994 12 492 94 64',
      website: ''
    },
    workingHours: '10:00 AM - 5:00 PM',
    createdAt: '2023-02-10',
    isFeatured: false,
    tags: ['miniature books', 'unique', 'old city', 'small museum'],
    views: 850
  },

  // ============ CAFES ============
  {
    id: '26',
    title: 'Coffee Moffie',
    description: 'Specialty coffee shop in Baku with artisan coffee and cozy atmosphere.',
    category: 'cafe',
    city: 'Baku',
    address: '36 Nizami Street, Baku 1000',
    coordinates: { lat: 40.3745, lng: 49.8360 },
    priceRange: '$$',
    rating: 4.4,
    reviewsCount: 456,
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/91/03/b1/small-library-books-in.jpg?w=900&h=500&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/91/03/81/bar-and-baristas.jpg?w=900&h=500&s=1'
    ],
    amenities: ['Specialty Coffee', 'Wi-Fi', 'Desserts', 'Cozy Atmosphere', 'Workspace'],
    contact: {
      phone: '+994 50 333 44 55',
      website: ''
    },
    workingHours: '8:00 AM - 11:00 PM',
    createdAt: '2023-02-15',
    isFeatured: false,
    tags: ['coffee', 'specialty', 'cozy', 'work friendly', 'desserts'],
    views: 670
  },
  {
    id: '27',
    title: 'Paul Bakery & Cafe',
    description: 'French-style bakery and cafe with fresh bread, pastries, and coffee.',
    category: 'cafe',
    city: 'Baku',
    address: 'Port Baku Mall, Baku 1000',
    coordinates: { lat: 40.3850, lng: 49.8750 },
    priceRange: '$$',
    rating: 4.3,
    reviewsCount: 389,
    photos: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/8e/51/d5/paul.jpg?w=700&h=400&s=1',
      'https://www.pauldmv.com/wp-content/uploads/2022/12/PAUL-products.jpg'
    ],
    amenities: ['Fresh Bakery', 'French Pastries', 'Coffee', 'Wi-Fi', 'Indoor Seating'],
    contact: {
      phone: '+994 12 404 44 44',
      website: ''
    },
    workingHours: '8:00 AM - 11:00 PM',
    createdAt: '2023-02-20',
    isFeatured: false,
    tags: ['bakery', 'french', 'pastries', 'breakfast', 'coffee'],
    views: 590
  },
  {
    id: '28',
    title: 'Old City Tea House',
    description: 'Traditional tea house in Icherisheher serving Azerbaijani tea with local sweets.',
    category: 'cafe',
    city: 'Baku',
    address: 'Icherisheher, Baku 1000',
    coordinates: { lat: 40.3662, lng: 49.8345 },
    priceRange: '$',
    rating: 4.5,
    reviewsCount: 567,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRrv3shs2fnijgg8WEB-tu5d4qPqe3Uvodg&s',
      'https://azerbaijantraveller.com/wp-content/uploads/2024/01/featured-image_museum-inn.png?w=1000'
    ],
    amenities: ['Traditional Tea', 'Local Sweets', 'Old City Atmosphere', 'Cultural Experience'],
    contact: {
      phone: '+994 50 222 33 44',
      website: ''
    },
    workingHours: '10:00 AM - 10:00 PM',
    createdAt: '2023-03-01',
    isFeatured: false,
    tags: ['tea house', 'traditional', 'old city', 'cultural', 'sweets'],
    views: 720
  },

  // ============ NATURE ============
  {
    id: '29',
    title: 'Shahdag Mountain Resort',
    description: 'Largest mountain resort in Azerbaijan with skiing, hiking, and spa facilities.',
    category: 'nature',
    city: 'Gusar',
    address: 'Shahdag Mountain, Gusar District',
    coordinates: { lat: 41.3300, lng: 48.1800 },
    priceRange: '$$$',
    rating: 4.7,
    reviewsCount: 789,
    photos: [
      'https://www.shahdag.az/storage/app/uploads/public/656/f12/ef9/656f12ef90326837849872.webp',
      'https://www.shahdag.az/storage/app/uploads/public/656/f12/eec/656f12eec8fda879838029.webp'
    ],
    amenities: ['Ski Slopes', 'Hiking Trails', 'Spa', 'Hotels', 'Restaurants', 'Equipment Rental'],
    contact: {
      phone: '+994 12 404 80 80',
      website: 'https://shahdag.az/'
    },
    workingHours: '24/7',
    createdAt: '2023-03-05',
    isFeatured: true,
    tags: ['mountain resort', 'skiing', 'hiking', 'nature', 'adventure'],
    views: 1400
  },
  {
    id: '30',
    title: 'Hirkan National Park',
    description: 'UNESCO-listed subtropical forest with unique flora and fauna, including Persian leopards.',
    category: 'nature',
    city: 'Lankaran',
    address: 'Lankaran District, Azerbaijan',
    coordinates: { lat: 38.6300, lng: 48.7000 },
    priceRange: '$',
    rating: 4.6,
    reviewsCount: 456,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQWHXa03VDuVJ0TeOXkQLYqL97bN_Vc3tvA&s',
      'https://cdn.touryup.com/i/att/480/hirkan-national-park-tour-travel-azerbaijan-lankaran-2.jpg'
    ],
    amenities: ['Hiking Trails', 'Wildlife Watching', 'Forest Exploration', 'Guided Tours'],
    contact: {
      phone: '+994 25 234 56 78',
      website: ''
    },
    workingHours: '24/7',
    createdAt: '2023-03-10',
    isFeatured: false,
    tags: ['national park', 'forest', 'UNESCO', 'wildlife', 'hiking', 'subtropical'],
    views: 850
  },

  // ============ SHOPPING ============
  {
    id: '31',
    title: 'Port Baku Mall',
    description: 'Luxury shopping mall with international brands, restaurants, and marina views.',
    category: 'shopping',
    city: 'Baku',
    address: '153 Neftchilar Avenue, Baku 1000',
    coordinates: { lat: 40.3850, lng: 49.8750 },
    priceRange: '$$$',
    rating: 4.5,
    reviewsCount: 987,
    photos: [
      'https://itinari-images.s3.eu-west-1.amazonaws.com/activity/images/original/ad65bc6e-8470-4c86-824d-e70d1c16647f-o_19k7f0e6l1sae12t519tmg8d1btqd.jpg',
      'https://ulduztourism.az/wp-content/uploads/2017/09/port-baku-mall-2-1.jpg'
    ],
    amenities: ['Luxury Brands', 'Restaurants', 'Cinema', 'Marina View', 'Parking', 'Wi-Fi'],
    contact: {
      phone: '+994 12 404 44 44',
      website: 'https://portbakumall.com/'
    },
    workingHours: '10:00 AM - 10:00 PM',
    createdAt: '2023-02-25',
    isFeatured: true,
    tags: ['shopping mall', 'luxury', 'brands', 'marina', 'restaurants'],
    views: 1100
  },
  {
    id: '32',
    title: '28 Mall',
    description: 'Modern shopping center with fashion stores, food court, and entertainment.',
    category: 'shopping',
    city: 'Baku',
    address: '28 May Street, Baku 1000',
    coordinates: { lat: 40.3820, lng: 49.8430 },
    priceRange: '$$',
    rating: 4.4,
    reviewsCount: 765,
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Nz--b52ZddEm8THQYbJJuTsge1WcJ1J-xg&s',
      'https://travelinbaku.com/images/217274598479.jpg'
    ],
    amenities: ['Fashion Stores', 'Food Court', 'Entertainment', 'Parking', 'Wi-Fi'],
    contact: {
      phone: '+994 12 598 28 28',
      website: 'https://28mall.az/'
    },
    workingHours: '10:00 AM - 10:00 PM',
    createdAt: '2023-03-01',
    isFeatured: false,
    tags: ['shopping center', 'fashion', 'food court', 'entertainment', 'modern'],
    views: 920
  },
  {
    id: '33',
    title: 'Taza Bazaar',
    description: 'Traditional Azerbaijani market with fresh produce, spices, and local products.',
    category: 'shopping',
    city: 'Baku',
    address: 'Meteorologist Street, Baku 1000',
    coordinates: { lat: 40.3850, lng: 49.8230 },
    priceRange: '$',
    rating: 4.3,
    reviewsCount: 678,
    photos: [
      'https://d3w13n53foase7.cloudfront.net/medium_5101e858_9947_426f_88c7_3e46c1289b15_istock_530984450_630b79976f.jpg',
      'https://media-cdn.tripadvisor.com/media/photo-s/15/83/21/3c/taza-bazaar-baku.jpg'
    ],
    amenities: ['Fresh Produce', 'Spices', 'Local Products', 'Traditional Market', 'Bargaining'],
    contact: {
      phone: '+994 12 493 45 67',
      website: ''
    },
    workingHours: '7:00 AM - 7:00 PM',
    createdAt: '2023-03-05',
    isFeatured: false,
    tags: ['market', 'traditional', 'local products', 'fresh produce', 'spices'],
    views: 780
  }
];

/* ================= HELPERS ================= */

const adminAuth = (req, res, next) => {
  if (req.headers['admin-password'] === ADMIN_PASSWORD) return next();
  res.status(401).json({ message: 'Admin access denied' });
};

const safeNumber = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

/* ================= PUBLIC API ================= */

// Health
app.get('/api/health', (_, res) => {
  res.json({ status: 'OK', totalPlaces: places.length });
});

// Featured (ВАЖНО: выше :id)
app.get('/api/places/featured', (_, res) => {
  res.json(places.filter(p => p.isFeatured));
});

// Get all places (filters + pagination)
app.get('/api/places', (req, res) => {
  let data = [...places];
  const { category, city, search, page, limit } = req.query;

  if (category) data = data.filter(p => p.category === category);
  if (city) data = data.filter(p => p.city === city);

  if (search) {
    const q = search.toLowerCase();
    data = data.filter(p => p.title.toLowerCase().includes(q));
  }

  const pageNum = safeNumber(page, 1);
  const limitNum = safeNumber(limit, 50);

  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  res.json({
    data: data.slice(start, end),
    total: data.length,
    page: pageNum,
    limit: limitNum
  });
});

// Get single place
app.get('/api/places/:id', (req, res) => {
  const place = places.find(p => p.id === req.params.id);
  if (!place) return res.status(404).json({ message: 'Not found' });

  place.views = (place.views || 0) + 1;
  res.json(place);
});

// Categories & Cities (динамически)
app.get('/api/categories', (_, res) => {
  res.json([...new Set(places.map(p => p.category))]);
});

app.get('/api/amenities', (_, res) => {
  const amenities = [
    ...new Set(places.flatMap(p => p.amenities))];
  res.json(amenities);
});


app.get('/api/cities', (_, res) => {
  res.json([...new Set(places.map(p => p.city))]);
});

/* ================= ADMIN API ================= */

// Admin list
app.get('/api/admin/places', adminAuth, (_, res) => {
  res.json(places);
});

// Create place
app.post('/api/admin/places', adminAuth, upload.array('photos', 5), (req, res) => {
  const { title, description, category, city } = req.body;

  if (!title || !description || !category || !city) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const photos = req.files?.map(f => `/uploads/${f.filename}`) || [];
  const newId = places.length > 0 ? places[0].id + 1 : 1;

  const newPlace = {
    id: newId.toString(),
    title,
    description,
    category,
    city,
    address: '',
    coordinates: null,
    amenities: [],
    photos,
    rating: 4,
    reviewsCount: 0,
    views: 0,
    isFeatured: false,
    createdAt: new Date().toISOString()
  };

  places.unshift(newPlace);
  res.status(201).json(newPlace);
});

// Update place
app.put('/api/admin/places/:id', adminAuth, upload.array('photos', 5), (req, res) => {
  const index = places.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  let photos = places[index].photos;

  if (req.files && req.files.length) {
    photos.forEach(p => {
      if (p.startsWith('/uploads')) {
        const file = path.join(__dirname, p);
        if (fs.existsSync(file)) fs.unlinkSync(file);
      }
    });
    photos = req.files.map(f => `/uploads/${f.filename}`);
  }

  places[index] = {
    ...places[index],
    ...req.body,
    photos
  };

  res.json(places[index]);
});

// Delete place
app.delete('/api/admin/places/:id', adminAuth, (req, res) => {
  const place = places.find(p => p.id === req.params.id);
  if (!place) return res.status(404).json({ message: 'Not found' });

  place.photos?.forEach(p => {
    if (p.startsWith('/uploads')) {
      const file = path.join(__dirname, p);
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  });

  places = places.filter(p => p.id !== req.params.id);
  res.json({ message: 'Deleted successfully' });
});

/* ================= START ================= */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
