const REQUEST_URL = 'http://localhost:5005'

const initData = {
  address: { street: '', city: '', state: '', postcode: '', country: '' },
  price: '',
  thumbnail: '',
  metadata: {
    entirePlace: false,
    privateRoom: false,
    shareRoom: false,
    bedsNumber: '',
    bathRoomNumber: '',
    bedRoomNumber: '',
    pool: false,
    BBQ: false,
    parking: false,
    airCondition: false,
    wifi: false,
    TV: false,
    kitchen: false,
    pet: false,
  },
}

export { REQUEST_URL, initData }
