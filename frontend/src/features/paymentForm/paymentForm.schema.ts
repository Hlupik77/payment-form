import { z } from 'zod';

export const formSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Введите номер карты')
    .refine((v) => /^[\d\s]*$/.test(v), {
      message: 'Номер может содержать только цифры и пробелы',
    })
    .refine((v) => {
      const digits = v.replace(/\D/g, '');
      return digits.length >= 13 && digits.length <= 19;
    }, 'Номер должен содержать от 13 до 19 цифр'),

  expiry: z
    .string()
    .min(1, 'Введите срок действия')
    .refine((v) => /^\d{2}\/\d{2}$/.test(v), {
      message: 'Формат MM/YY',
    })
    .refine((v) => {
      const m = v.match(/^(\d{2})\/(\d{2})$/);
      if (!m) return false;
      const mm = Number(m[1]);
      return mm >= 1 && mm <= 12;
    }, 'Месяц 01–12')
    .refine((v) => {
      const m = v.match(/^(\d{2})\/(\d{2})$/);
      if (!m) return false;
      const yy = Number(m[2]);
      return yy >= 21 && yy <= 26;
    }, 'Год 21–26'),

  cvc: z
    .string()
    .min(1, 'Введите код безопасности')
    .regex(/^\d{3}$/, 'Введите 3 цифры'),

  cardholder: z
    .string()
    .min(1, 'Введите имя владельца')
    .regex(
      /^[A-Za-zА-Яа-яЁё]+\s+[A-Za-zА-Яа-яЁё]+$/,
      'Введите два слова без цифр'
    ),
});
