import React from 'react';
import { money, freelance, stocks, users, bitcoin, card, yt, piggy, book, tv, takeaway, clothing, circle, transport, dining, food, medical } from '../utils/Icons';

function IconCategory({category}) {
  switch (category) {
    case 'salary':
      return money;
    case 'freelancing':
      return freelance;
    case 'investments':
      return stocks;
    case 'stocks':
      return users;
    case 'bitcoin':
      return bitcoin;
    case 'bank':
      return card;
    case 'youtube':
      return yt;
    case 'other':
      return piggy;
    case 'education':
      return book;
    case 'groceries':
      return food;
    case 'health':
      return medical;
    case 'subscriptions':
      return tv;
    case 'takeaways':
      return takeaway;
    case 'dining':
      return dining;
    case 'clothing':
      return clothing;
    case 'travelling':
      return freelance; 
    case 'transport':
      return transport;
    case 'other':
      return circle;
    default:
      return null; 
  }
}

export default IconCategory;
