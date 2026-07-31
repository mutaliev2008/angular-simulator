import { ICustomer } from "../interface/ICustomer";
import { IPopularPlace } from "../interface/IPopularPlace";
import { ITour } from "../interface/ITour";
import { ITravelBlog } from "../interface/ITravelBlog";

export const tours: ITour[] = [
  {
    id: 1,
    title: 'Опытный гид',
    description:
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    imageName: 'signs-post',
  },
  {
    id: 2,
    title: 'Безопасный поход',
    description:
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    imageName: 'shield',
  },
  {
    id: 3,
    title: 'Лояльные цены',
    description:
      'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    imageName: 'tag',
  },
];


export const popularPlace: IPopularPlace[] = [
  {
    id: '1',
    title: 'Озеро возле гор',
    description: 'романтическое приключение',
    price: 480,
    stars: 4.9,
    imgName: 'boat'
  },
  {
    id: '2',
    title: 'Ночь в горах',
    description: 'в компании друзей',
    price: 230,
    stars: 4.6,
    imgName: 'landscape'
  },
  {
    id: '3',
    title: 'Растяжка в горах',
    description: 'для тех, кто забоится о себе',
    price: 500,
    stars: 4.5,
    imgName: 'yoga'
  },
]

export const travelBlog: ITravelBlog[] = [
    {
    id: '1',
    title: 'Красивая Италия, какая она в реальности?',
    description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    imgName: 'italy',
    date: '01/04/2023'
  },
  {
    id: '2',
    title: 'Долой сомнения! Весь мир открыт для вас!',
    description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
    imgName: 'plane',
    date: '01/04/2023'
  },
  {
    id: '3',
    title: 'Как подготовиться к путешествию в одиночку? ',
    description: 'Для современного мира базовый вектор развития предполагает.',
    imgName: 'street',
    date: '01/04/2023'
  },
  {
    id: '4',
    title: 'Индия ... летим?',
    description: 'Для современного мира базовый.',
    imgName: 'india',
    date: '01/04/2023'
  },
]