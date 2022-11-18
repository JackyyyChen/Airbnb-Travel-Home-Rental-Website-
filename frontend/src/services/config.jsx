const REQUEST = 'http://localhost:5005'

const initData = {
  address: { street: '', city: '', state: '', postcode: '', country: '' },
  title: '',
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

export { REQUEST, initData }
