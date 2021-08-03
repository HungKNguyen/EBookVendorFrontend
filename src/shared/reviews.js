// Mock data for review information

export const REVIEWS = [
  {
    _id: '0',
    user: {
      _id: '0',
      firstname: 'John',
      lastname: 'Doe',
      image: '/assets/images/johndoe.jpg',
      email: 'johndoe1989@gmail.com',
      FbOAuth: '',
      GoogleOAuth: '',
      AppleOAuth: '',
      admin: false,
      favEBooks: [],
      cart: []
    },
    rating: 4.5,
    review:
      'Always affordable, and makes preparing for the semester that much easier and stress free.',
    date: 'June 9th 2020'
  },
  {
    _id: '1',
    user: {
      _id: '1',
      firstname: 'Jane',
      lastname: 'Doe',
      image: '/assets/images/janedoe.jpg',
      email: 'janedoe1984@gmail.com',
      FbOAuth: '',
      GoogleOAuth: '',
      AppleOAuth: '',
      admin: false,
      favEBooks: [],
      cart: []
    },
    rating: 5,
    review:
      "I'm thrilled with my purchase. The process was easy and user-friendly. No hassles just took a few minutes to order my book.",
    date: 'July 8th 2020'
  },
  {
    _id: '2',
    user: {
      _id: '2',
      firstname: 'Admin',
      lastname: 'Doe',
      image: '/assets/images/admin.jpg',
      email: 'admin@ebook.com',
      FbOAuth: '',
      GoogleOAuth: '',
      AppleOAuth: '',
      admin: true,
      favEBooks: [],
      cart: []
    },
    rating: 5,
    review:
      "I've purchased two textbooks now on vitalsource, and both times it has been an easy process (also much cheaper than buying the books outright). I also like that I can buy them for 180 days rather than forever.",
    date: 'December 23rd 2020'
  }
]
