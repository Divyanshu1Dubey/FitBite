import fitbiteLogo from '../assets/images/fitbite-logo.jpeg';

export const popularDishes = [
  {
    id: 1,
    image: fitbiteLogo,
    name: 'Protein Shake',
    numberOfOrders: 132,
  },
  {
    id: 2,
    image: fitbiteLogo,
    name: 'Veg Burger',
    numberOfOrders: 118,
  },
  {
    id: 3,
    image: fitbiteLogo,
    name: 'Cheese Maggi',
    numberOfOrders: 96,
  },
  {
    id: 4,
    image: fitbiteLogo,
    name: 'Cold Coffee',
    numberOfOrders: 140,
  },
  {
    id: 5,
    image: fitbiteLogo,
    name: 'Protein Paneer Sandwich',
    numberOfOrders: 88,
  },
  {
    id: 6,
    image: fitbiteLogo,
    name: 'French Fries',
    numberOfOrders: 152,
  },
  {
    id: 7,
    image: fitbiteLogo,
    name: 'Margherita',
    numberOfOrders: 72,
  },
  {
    id: 8,
    image: fitbiteLogo,
    name: 'Veg Sandwich',
    numberOfOrders: 110,
  },
];


export const tables = [
    { id: 1, name: "Table 1", status: "Booked", initial: "AM", seats: 4 },
    { id: 2, name: "Table 2", status: "Available", initial: "MB", seats: 6 },
    { id: 3, name: "Table 3", status: "Booked", initial: "JS", seats: 2 },
    { id: 4, name: "Table 4", status: "Available", initial: "HR", seats: 4 },
    { id: 5, name: "Table 5", status: "Booked", initial: "PL", seats: 3 },
    { id: 6, name: "Table 6", status: "Available", initial: "RT", seats: 4 },
    { id: 7, name: "Table 7", status: "Booked", initial: "LC", seats: 5 },
    { id: 8, name: "Table 8", status: "Available", initial: "DP", seats: 5 },
    { id: 9, name: "Table 9", status: "Booked", initial: "NK", seats: 6 },
    { id: 10, name: "Table 10", status: "Available", initial: "SB", seats: 6 },
    { id: 11, name: "Table 11", status: "Booked", initial: "GT", seats: 4 },
    { id: 12, name: "Table 12", status: "Available", initial: "JS", seats: 6 },
    { id: 13, name: "Table 13", status: "Booked", initial: "EK", seats: 2 },
    { id: 14, name: "Table 14", status: "Available", initial: "QN", seats: 6 },
    { id: 15, name: "Table 15", status: "Booked", initial: "TW", seats: 3 }
  ];
  
export const beverages = [
  { id: 1, name: "Chai", price: 0, category: "Hot" },
  { id: 2, name: "Coffee", price: 0, category: "Hot" },
  { id: 3, name: "Cold Coffee", price: 0, category: "Cold" },
  { id: 4, name: "Cold Drink", price: 0, category: "Cold" },
];

export const sandwiches = [
  { id: 1, name: "Veg Sandwich", price: 0, category: "Veg" },
  { id: 2, name: "Cheese Sandwich", price: 0, category: "Veg" },
];

export const burgers = [
  { id: 1, name: "Veg Burger", price: 0, category: "Veg" },
  { id: 2, name: "Cheese Burger", price: 0, category: "Veg" },
];

export const snacks = [
  { id: 1, name: "French Fries", price: 0, category: "Veg" },
  { id: 2, name: "Peri Peri Fries", price: 0, category: "Veg" },
];

export const pizzas = [
  { id: 1, name: "Margherita", price: 0, category: "Veg" },
  { id: 2, name: "Corn & Cheese", price: 0, category: "Veg" },
];

export const highProtein = [
  { id: 1, name: "Protein Bread Pizza", price: 0, category: "Protein" },
  { id: 2, name: "Protein Paneer Sandwich", price: 0, category: "Protein" },
];

export const maggi = [
  { id: 1, name: "Classic Maggi", price: 0, category: "Veg" },
  { id: 2, name: "Cheese Maggi", price: 0, category: "Veg" },
];

export const combos = [
  { id: 1, name: "Chai + Veg Sandwich", price: 0, category: "Combo" },
  { id: 2, name: "Coffee + Fries", price: 0, category: "Combo" },
  {
    id: 3,
    name: "Cold Coffee + Cheese Sandwich",
    price: 0,
    category: "Combo",
  },
  {
    id: 4,
    name: "Protein Sandwich + Cold Coffee",
    price: 0,
    category: "Combo",
  },
  { id: 5, name: "Fries + Cold Drink", price: 0, category: "Combo" },
];


export const menus = [
  { id: 1, name: "Beverages", bgColor: "#2b3324", icon: "🥤", items: beverages },
  { id: 2, name: "Sandwich", bgColor: "#2f3824", icon: "🥪", items: sandwiches },
  { id: 3, name: "Burgers", bgColor: "#273225", icon: "🍔", items: burgers },
  { id: 4, name: "Snacks", bgColor: "#3a2f1f", icon: "🍟", items: snacks },
  { id: 5, name: "Pizza", bgColor: "#2a2f3a", icon: "🍕", items: pizzas },
  { id: 6, name: "High Protein", bgColor: "#1f3a2d", icon: "💪", items: highProtein },
  { id: 7, name: "Maggi", bgColor: "#3a3220", icon: "🍜", items: maggi },
  { id: 8, name: "Combos", bgColor: "#2d2b1f", icon: "🥤", items: combos }
]

export const metricsData = [
  {
    title: "Today Revenue",
    value: "₹12,640.00",
    percentage: "8%",
    color: "#2a6a2b",
    isIncrease: true,
  },
  {
    title: "Active Orders",
    value: "18",
    percentage: "4%",
    color: "#b8d84f",
    isIncrease: true,
  },
  {
    title: "Avg Ticket",
    value: "₹185.00",
    percentage: "2%",
    color: "#f6b100",
    isIncrease: true,
  },
  {
    title: "Repeat Guests",
    value: "42%",
    percentage: "3%",
    color: "#1f4b2e",
    isIncrease: true,
  },
];

export const itemsData = [
  {
    title: "Menu Categories",
    value: "8",
    percentage: "0%",
    color: "#2b3324",
    isIncrease: true,
  },
  {
    title: "Menu Items",
    value: "24",
    percentage: "0%",
    color: "#273225",
    isIncrease: true,
  },
  {
    title: "Open Orders",
    value: "12",
    percentage: "4%",
    color: "#3a3220",
    isIncrease: true,
  },
  { title: "Total Tables", value: "10", color: "#2d2b1f" }
];

export const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "January 18, 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "January 18, 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "January 18, 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "January 18, 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];