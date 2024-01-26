import { money, freelance, stocks, users, bitcoin, card, yt, piggy, book, tv, takeaway, clothing, circle, transport, dining, food, medical, dashboard, transactions, categories, accounts, settings, logout, trend, expenses, dollar, calender, comment, plus, trash, signout, salary, date, list, user, emailIcon, pass, gift, code, key, briefcase, cat } from '../utils/Icons';

function IconCategory({category}) {
  switch (category) {
    case 'dashboard':
      return dashboard;
    case 'transactions':
      return transactions;
    case 'categories':
      return categories;
    case 'accounts':
      return accounts;
    case 'settings':
      return settings;
    case 'logout':
      return logout;
    case 'trend':
      return trend;
    case 'expenses':
      return expenses;
    case 'money':
      return money;
    case 'freelance':
      return freelance;
    case 'stocks':
      return stocks;
    case 'bitcoin':
      return bitcoin;
    case 'piggy':
      return piggy;
    case 'yt':
      return yt;
    case 'card':
      return card;
    case 'users':
      return users;
    case 'dollar':
      return dollar;
    case 'calender':
      return calender;
    case 'comment':
      return comment;
    case 'plus':
      return plus;
    case 'trash':
      return trash;
    case 'signout':
      return signout;
    case 'takeaway':
      return takeaway;
    case 'clothing':
      return clothing;
    case 'book':
      return book;
    case 'food':
      return food;
    case 'medical':
      return medical;
    case 'tv':
      return tv;
    case 'circle':
      return circle;
    case 'transport':
      return transport;
    case 'salary':
      return salary;
    case 'dining':
      return dining;
    case 'date':
      return date;
    case 'list':
      return list;
    case 'user':
      return user;
    case 'emailIcon':
      return emailIcon;
    case 'pass':
      return pass;
    case 'gift':
      return gift;
    case 'code':
      return code;
    case 'key':
      return key;
    case 'briefcase':
      return briefcase;
    case 'cat':
      return cat;
  }
  
}

export default IconCategory;
