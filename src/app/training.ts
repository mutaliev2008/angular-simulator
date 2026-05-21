import { IUser } from '../interfaces/IUser.interface';

type UploadStatus = 'loading' | 'success' | 'error';
type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

const uploadStatus: UploadStatus = 'loading';
const textFormat: TextFormat = 'capitalize';

const users: IUser[] = [
  {
    id: 1,
    name: 'Иван Петров',
    phone: 79161234567,
    address: 'ул. Ленина, д. 10, кв. 5',
    email: 'ivan@example.com',
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    phone: 79169876543,
    address: 'пр. Мира, д. 25, кв. 12',
    email: 'maria@example.com',
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    phone: 79165554433,
    address: 'ул. Пушкина, д. 7',
    email: 'alex@example.com',
  },
];

function calculateSum(a: number, b: number): number {
  return a + b;
}

calculateSum(2, 4);

function formatText(text: string, format: TextFormat) {
  switch (format) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text
        .split(' ')
        .map((word) => {
          if (word.length === 0) return word;
          return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
    default:
      return text;
  }
}
formatText('hElLo wORLd', textFormat);

function removeChar(text: string, symbol: string): string {
  return text.replaceAll(symbol, '');
}
removeChar('Привет мир', 'е');

function filterUsers(users: IUser[], par: string): IUser[] {
  return users.filter((user) => user.name === par);
}

filterUsers(users, 'Иван Петров');
