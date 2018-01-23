(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("data.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dataList = [{
  "№": 1,
  "ФИО": "Исаев Исмаил Магомедтагирович",
  "стол": 16
}, {
  "№": 2,
  "ФИО": "Старчиков Дмитрий Владимирович",
  "стол": 16
}, {
  "№": 3,
  "ФИО": "Корольков Максим Иванович",
  "стол": 16
}, {
  "№": 4,
  "ФИО": "Черноиванова Ольга Геннадиевна",
  "стол": 16
}, {
  "№": 5,
  "ФИО": "Мамзенко Анна Александровна",
  "стол": 16
}, {
  "№": 6,
  "ФИО": "Миронова Елена Ивановна",
  "стол": 17
}, {
  "№": 7,
  "ФИО": "Батукаева Эльза Казбековна",
  "стол": 4
}, {
  "№": 8,
  "ФИО": "Кулова Элина Георгиевна",
  "стол": 4
}, {
  "№": 9,
  "ФИО": "Саламаткина Светлана Александровна",
  "стол": 4
}, {
  "№": 10,
  "ФИО": "Рябуха Ольга Тумасовна",
  "стол": 4
}, {
  "№": 11,
  "ФИО": "Усик Татьяна Сергеевна",
  "стол": 4
}, {
  "№": 12,
  "ФИО": "Ярцева Елена Григорьевна",
  "стол": 4
}, {
  "№": 13,
  "ФИО": "Евтушенко Анастасия Васильевна",
  "стол": 4
}, {
  "№": 14,
  "ФИО": "Коландария Наталья Сергеевна",
  "стол": 4
}, {
  "№": 15,
  "ФИО": "Сыроватская Юлия Владимировна",
  "стол": 4
}, {
  "№": 16,
  "ФИО": "Мезужок Светлана Инверовна",
  "стол": 4
}, {
  "№": 17,
  "ФИО": "Васильева Марина Константиновна",
  "стол": 4
}, {
  "№": 18,
  "ФИО": "Николаева Марина Александровна",
  "стол": 4
}, {
  "№": 19,
  "ФИО": "Харланова Наталья Станиславовна",
  "стол": 3
}, {
  "№": 20,
  "ФИО": "Гончарова Жанна Викторовна",
  "стол": 3
}, {
  "№": 21,
  "ФИО": "Харсеева Екатерина Петровна",
  "стол": 18
}, {
  "№": 22,
  "ФИО": "Ермина Анна Анатольевна",
  "стол": 3
}, {
  "№": 23,
  "ФИО": "Саламаткина Полина Сергеевна",
  "стол": 3
}, {
  "№": 24,
  "ФИО": "Мусаева Асия Мурадовна",
  "стол": 3
}, {
  "№": 25,
  "ФИО": "Мокаева Марина Хусеиновна",
  "стол": 3
}, {
  "№": 26,
  "ФИО": "Кулова Элина Георгиевна",
  "стол": 3
}, {
  "№": 27,
  "ФИО": "Баева Анна Игоревна",
  "стол": 3
}, {
  "№": 28,
  "ФИО": "Брагинец Мария Александровна",
  "стол": 3
}, {
  "№": 28,
  "ФИО": "Яловенко Марина Евгеньевна",
  "стол": 3
}, {
  "№": 29,
  "ФИО": "Исмаилова Саида Газиевна",
  "стол": 10
}, {
  "№": 30,
  "ФИО": "Долгарева Виолетта Викторовна",
  "стол": 10
}, {
  "№": 31,
  "ФИО": "Кравченко Регина Вадимовна",
  "стол": 10
}, {
  "№": 33,
  "ФИО": "Дубограева Ирина Ивановна",
  "стол": 10
}, {
  "№": 34,
  "ФИО": "Дьяченко Наталья Павловна",
  "стол": 10
}, {
  "№": 35,
  "ФИО": "Тупольский Александр Николаевич",
  "стол": 10
}, {
  "№": 36,
  "ФИО": "Пчелинцева Инна Валерьевна",
  "стол": 10
}, {
  "№": 37,
  "ФИО": "Пономарев Евгений Юрьевич",
  "стол": 10
}, {
  "№": 38,
  "ФИО": "Болотоков Аскер Мухамедович",
  "стол": 10
}, {
  "№": 39,
  "ФИО": "Сладкович Елена Владимировна",
  "стол": 10
}, {
  "№": 40,
  "ФИО": "Самойлов Вячеслав Андреевич",
  "стол": 17
}, {
  "№": 41,
  "ФИО": "Иванов Александр Николаевич",
  "стол": 25
}, {
  "№": 42,
  "ФИО": "Иванова Наталья Сергеевна",
  "стол": 25
}, {
  "№": 43,
  "ФИО": "Гулканян Татьяна Эмильевна",
  "стол": 25
}, {
  "№": 44,
  "ФИО": "Иванченко Кристина Александровна",
  "стол": 25
}, {
  "№": 45,
  "ФИО": "Стативка Александр Александрович",
  "стол": 25
}, {
  "№": 46,
  "ФИО": "Ковалева Наталья Вячеславовна",
  "стол": 25
}, {
  "№": 47,
  "ФИО": "Ефименко Андрей Игоревич",
  "стол": 25
}, {
  "№": 48,
  "ФИО": "Решетников Виктор Анатольевич",
  "стол": 25
}, {
  "№": 49,
  "ФИО": "Филина Алина Ивановна",
  "стол": 25
}, {
  "№": 50,
  "ФИО": "Логвинова Александра Дмитриевна",
  "стол": 25
}, {
  "№": 51,
  "ФИО": "Королева Ольга Станиславовна",
  "стол": 25
}, {
  "№": 52,
  "ФИО": "Попов Дмитрий Владимирович",
  "стол": 25
}, {
  "№": 53,
  "ФИО": "Пьяных Александр Николаевич",
  "стол": 26
}, {
  "№": 54,
  "ФИО": "Коваленко Евгений Сергеевич",
  "стол": 26
}, {
  "№": 55,
  "ФИО": "Берзегов Рустам Юрьевич",
  "стол": 26
}, {
  "№": 56,
  "ФИО": "Романько Максим Юрьевич",
  "стол": 26
}, {
  "№": 57,
  "ФИО": "Терехин Роман Игоревич",
  "стол": 26
}, {
  "№": 58,
  "ФИО": "Акопян Александр Сергеевич",
  "стол": 26
}, {
  "№": 59,
  "ФИО": "Туз Александр Анатольевич",
  "стол": 26
}, {
  "№": 60,
  "ФИО": "Харьковский Роман Валерьевич",
  "стол": 26
}, {
  "№": 61,
  "ФИО": "Алиев Анвар Ахмедович",
  "стол": 26
}, {
  "№": 62,
  "ФИО": "Милько Марина Викторовна",
  "стол": 26
}, {
  "№": 63,
  "ФИО": "Крайнов Сергей Александрович",
  "стол": 26
}, {
  "№": 64,
  "ФИО": "Тобоев Сергей Анатольевич",
  "стол": 26
}, {
  "№": 65,
  "ФИО": "Абдулмеджидов Абдулмеджид Камалдинович",
  "стол": 27
}, {
  "№": 66,
  "ФИО": "Сулейманов Абдулбаки Русланович",
  "стол": 27
}, {
  "№": 67,
  "ФИО": "Шишханов Гапур Баширович",
  "стол": 27
}, {
  "№": 68,
  "ФИО": "Хуболов Ибрагим Асхатович",
  "стол": 27
}, {
  "№": 69,
  "ФИО": "Бахтурина Светлана Александровна",
  "стол": 27
}, {
  "№": 70,
  "ФИО": "Куваев Андрей Николаевич",
  "стол": 27
}, {
  "№": 71,
  "ФИО": "Зимина Вера Анатольевна",
  "стол": 27
}, {
  "№": 72,
  "ФИО": "Юн Ольга Робертовна",
  "стол": 27
}, {
  "№": 73,
  "ФИО": "Кононенко Людмила Юрьевна",
  "стол": 27
}, {
  "№": 74,
  "ФИО": "Сидорова Екатерина Витальевна",
  "стол": 27
}, {
  "№": 75,
  "ФИО": "Ибрагимова Марина Тохировна",
  "стол": 27
}, {
  "№": 76,
  "ФИО": "Егиянц Милена Анатольевна",
  "стол": 27
}, {
  "№": 77,
  "ФИО": "Уманец Елена Александровна",
  "стол": 28
}, {
  "№": 78,
  "ФИО": "Медникова Анжелика Владимировна",
  "стол": 28
}, {
  "№": 79,
  "ФИО": "Смирнов Владислав Валерьевич",
  "стол": 28
}, {
  "№": 80,
  "ФИО": "Карташова Виктория Владимировна",
  "стол": 28
}, {
  "№": 81,
  "ФИО": "Дронова Анастасия Николаевна",
  "стол": 28
}, {
  "№": 82,
  "ФИО": "Залогина Татьяна Юрьевна",
  "стол": 28
}, {
  "№": 83,
  "ФИО": "Карауш Елена Игоревна",
  "стол": 28
}, {
  "№": 84,
  "ФИО": "Поливанова Алена Сергеевна",
  "стол": 28
}, {
  "№": 85,
  "ФИО": "Ханафеева Антонина Геннадьевна",
  "стол": 28
}, {
  "№": 86,
  "ФИО": "Гузиев Виктор Александрович",
  "стол": 28
}, {
  "№": 87,
  "ФИО": "Емельянов Дмитрий Валерьевич",
  "стол": 28
}, {
  "№": 88,
  "ФИО": "Габловский Денис Николаевич",
  "стол": 28
}, {
  "№": 89,
  "ФИО": "Силкин Владислав Владимирович",
  "стол": 23
}, {
  "№": 90,
  "ФИО": "Короп Наталья Николаевна",
  "стол": 23
}, {
  "№": 91,
  "ФИО": "Цой Елена Сергеевна",
  "стол": 23
}, {
  "№": 92,
  "ФИО": "Портянко Алексей Евгеньевич",
  "стол": 23
}, {
  "№": 93,
  "ФИО": "Дульнев Андрей Иванович",
  "стол": 23
}, {
  "№": 94,
  "ФИО": "Медведева Евгения Владимировна",
  "стол": 23
}, {
  "№": 95,
  "ФИО": "Тульнева Юлия Александровна",
  "стол": 23
}, {
  "№": 96,
  "ФИО": "Ибраимов Марк Эмирусеинович",
  "стол": 23
}, {
  "№": 97,
  "ФИО": "Ли Наталья Герасимовна",
  "стол": 23
}, {
  "№": 98,
  "ФИО": "Сбитнева Светлана Георгиевна",
  "стол": 23
}, {
  "№": 99,
  "ФИО": "Тешева Анжела Нурбиевна",
  "стол": 23
}, {
  "№": 100,
  "ФИО": "Шумкина Наталья Сергеевна",
  "стол": 23
}, {
  "№": 101,
  "ФИО": "Попова Марина Валентиновна",
  "стол": 19
}, {
  "№": 102,
  "ФИО": "Ворошилова Яна Александровна",
  "стол": 19
}, {
  "№": 103,
  "ФИО": "Костина Валентина Игоревна",
  "стол": 19
}, {
  "№": 104,
  "ФИО": "Верещак Алексей Сергеевич",
  "стол": 19
}, {
  "№": 105,
  "ФИО": "Чернявская Анна Станиславовна",
  "стол": 19
}, {
  "№": 106,
  "ФИО": "Кравцева Татьяна Александровна",
  "стол": 19
}, {
  "№": 107,
  "ФИО": "Бычкова Вероника Викторовна",
  "стол": 19
}, {
  "№": 108,
  "ФИО": "Гелюсова Юлия Евгеньевна",
  "стол": 19
}, {
  "№": 109,
  "ФИО": "Молодых Алексей Андреевич",
  "стол": 19
}, {
  "№": 110,
  "ФИО": "Брюховецкий Вадим Николаевич",
  "стол": 19
}, {
  "№": 111,
  "ФИО": "Заплаткина Анастасия Юрьевна",
  "стол": 19
}, {
  "№": 112,
  "ФИО": "Гуленко Алла Владимировна",
  "стол": 19
}, {
  "№": 113,
  "ФИО": "Крапивный Александр Сергеевич",
  "стол": 20
}, {
  "№": 114,
  "ФИО": "Чалая Виктория Сергеевна",
  "стол": 20
}, {
  "№": 115,
  "ФИО": "Исаева Дарья Дмитриевна",
  "стол": 20
}, {
  "№": 116,
  "ФИО": "Юхновец Максим Александрович",
  "стол": 20
}, {
  "№": 117,
  "ФИО": "Мирза Мэдин Муратович",
  "стол": 20
}, {
  "№": 118,
  "ФИО": "Сухоплюева Ольга Александровна",
  "стол": 20
}, {
  "№": 119,
  "ФИО": "Чиченина Елена Станиславовна",
  "стол": 20
}, {
  "№": 120,
  "ФИО": "Марковская Александра Григорьевна",
  "стол": 20
}, {
  "№": 121,
  "ФИО": "Прокопенко Александр",
  "стол": 20
}, {
  "№": 122,
  "ФИО": "Шмаков Сергей Валерьевич",
  "стол": 20
}, {
  "№": 123,
  "ФИО": "Власова Наталья Алексеевна",
  "стол": 20
}, {
  "№": 124,
  "ФИО": "Павильч Лариса Петровна",
  "стол": 20
}, {
  "№": 125,
  "ФИО": "Кузнецова Алена Васильевна",
  "стол": 21
}, {
  "№": 126,
  "ФИО": "Реснянский Олег Сергеевич",
  "стол": 21
}, {
  "№": 127,
  "ФИО": "Хлыстикова Ольга Владимировна",
  "стол": 21
}, {
  "№": 128,
  "ФИО": "Баракова Анастасия Геннадьевна",
  "стол": 21
}, {
  "№": 129,
  "ФИО": "Карпец Елена Анатольевна",
  "стол": 21
}, {
  "№": 130,
  "ФИО": "Филиппова Анна Александровна",
  "стол": 21
}, {
  "№": 131,
  "ФИО": "Тебиева Марина Валерьевна",
  "стол": 21
}, {
  "№": 132,
  "ФИО": "Джуссоева Илона Алановна",
  "стол": 21
}, {
  "№": 133,
  "ФИО": "Шереужева Ирина Артуровна",
  "стол": 21
}, {
  "№": 134,
  "ФИО": "Кабышева Елена Михайловна",
  "стол": 21
}, {
  "№": 135,
  "ФИО": "Атаева Тамара Юнусовна",
  "стол": 21
}, {
  "№": 136,
  "ФИО": "Батукаева Петимат Казбековна",
  "стол": 21
}, {
  "№": 137,
  "ФИО": "Зазулин Денис Сергеевич",
  "стол": 22
}, {
  "№": 138,
  "ФИО": "Яковлева Снежана Александровна",
  "стол": 22
}, {
  "№": 139,
  "ФИО": "Герасимова Ирина Игоревна",
  "стол": 22
}, {
  "№": 140,
  "ФИО": "Алексеев Сергей Сергеевич",
  "стол": 1
}, {
  "№": 141,
  "ФИО": "Горин Евгений Васильевич",
  "стол": 1
}, {
  "№": 142,
  "ФИО": "Ушканов Алексей Васильевич",
  "стол": 1
}, {
  "№": 143,
  "ФИО": "Тыркалова Марина Вячеславовна",
  "стол": 1
}, {
  "№": 144,
  "ФИО": "Беляева Екатерина Александровна",
  "стол": 1
}, {
  "№": 145,
  "ФИО": "Кондауров Валерий Валерьевич",
  "стол": 1
}, {
  "№": 146,
  "ФИО": "Евтеев Сергей Витальевич",
  "стол": 1
}, {
  "№": 147,
  "ФИО": "Климов Андрей Павлович",
  "стол": 22
}, {
  "№": 148,
  "ФИО": "Коробцева Равиля Эвзальевна",
  "стол": 22
}, {
  "№": 149,
  "ФИО": "Родыгина Наталья Григорьевна",
  "стол": 22
}, {
  "№": 150,
  "ФИО": "Мочелов Дмитрий Вениаминович",
  "стол": 22
}, {
  "№": 151,
  "ФИО": "Рубцова Татьяна Геннадьевна",
  "стол": 22
}, {
  "№": 152,
  "ФИО": "Рябенко Игорь Михайлович",
  "стол": 22
}, {
  "№": 154,
  "ФИО": "Васючкова Оксана Сергеевна",
  "стол": 22
}, {
  "№": 155,
  "ФИО": "Бесова Татьяна Геннадьевна",
  "стол": 22
}, {
  "№": 156,
  "ФИО": "Кузьмина Анна Владимировна",
  "стол": 8
}, {
  "№": 157,
  "ФИО": "Семенова Юлия Игоревна",
  "стол": 8
}, {
  "№": 158,
  "ФИО": "Веретенникова Ольга Александровна",
  "стол": 8
}, {
  "№": 159,
  "ФИО": "Корнилова Екатерина Юрьевна",
  "стол": 8
}, {
  "№": 160,
  "ФИО": "Улашенко Мария Владимировна",
  "стол": 8
}, {
  "№": 161,
  "ФИО": "Щербаков Дмитрий Михайлович",
  "стол": 5
}, {
  "№": 162,
  "ФИО": "Мурадян Владимир Амазаспович",
  "стол": 5
}, {
  "№": 163,
  "ФИО": "Воронов Денис Александрович",
  "стол": 5
}, {
  "№": 164,
  "ФИО": "Педько Тимофей Валерьевич",
  "стол": 5
}, {
  "№": 165,
  "ФИО": "Забабурин Сергей Юрьевич",
  "стол": 5
}, {
  "№": 166,
  "ФИО": "Аракелова Любовь Алексеевна",
  "стол": 6
}, {
  "№": 168,
  "ФИО": "Нагорнова Ольга Николаевна",
  "стол": 6
}, {
  "№": 169,
  "ФИО": "Лысенко Ирина Сергеевна",
  "стол": 6
}, {
  "№": 170,
  "ФИО": "Шурыгина Елизавета Витальевна",
  "стол": 6
}, {
  "№": 171,
  "ФИО": "Брусова Елена Михайловна",
  "стол": 6
}, {
  "№": 172,
  "ФИО": "Гук Наталья Николаевна",
  "стол": 6
}, {
  "№": 173,
  "ФИО": "Лезарева Евгения Александровна",
  "стол": 6
}, {
  "№": 174,
  "ФИО": "Анохин Виталий Александрович",
  "стол": 6
}, {
  "№": 175,
  "ФИО": "Балченко Ольга Владимировна",
  "стол": 6
}, {
  "№": 177,
  "ФИО": "Кулинич Алексей Александрович",
  "стол": 6
}, {
  "№": 178,
  "ФИО": "Лысенко Виолетта Александровна",
  "стол": 6
}, {
  "№": 179,
  "ФИО": "Филонов Ярослав Юрьевич",
  "стол": 6
}, {
  "№": 180,
  "ФИО": "Бараев Андрей Александрович",
  "стол": 30
}, {
  "№": 181,
  "ФИО": "Долгов Денис Степанович",
  "стол": 30
}, {
  "№": 182,
  "ФИО": "Нечкина Елена Александровна",
  "стол": 30
}, {
  "№": 183,
  "ФИО": "Абакарова Наида Абдуразаковна",
  "стол": 30
}, {
  "№": 184,
  "ФИО": "Письменская Кристина Алексеевна",
  "стол": 30
}, {
  "№": 185,
  "ФИО": "Хоботова Анна Александровна",
  "стол": 30
}, {
  "№": 186,
  "ФИО": "Андреева Светлана Александровна",
  "стол": 30
}, {
  "№": 187,
  "ФИО": "Киселева Татьяна Геннадьевна",
  "стол": 30
}, {
  "№": 188,
  "ФИО": "Губарев Илья Геннадьевич",
  "стол": 30
}, {
  "№": 189,
  "ФИО": "Михеева Елена Алексеевна",
  "стол": 30
}, {
  "№": 190,
  "ФИО": "Старенкова Елена Ивановна",
  "стол": 30
}, {
  "№": 191,
  "ФИО": "Абакарова Эльмира Надировна",
  "стол": 30
}, {
  "№": 192,
  "ФИО": "Олейникова Инна Владимировна",
  "стол": 31
}, {
  "№": 193,
  "ФИО": "Попова Вера Александровна",
  "стол": 31
}, {
  "№": 194,
  "ФИО": "Тачанов Андрей Владимирович",
  "стол": 31
}, {
  "№": 195,
  "ФИО": "Капустин Владимир Викторович",
  "стол": 31
}, {
  "№": 196,
  "ФИО": "Алиев Магомет Султанович",
  "стол": 31
}, {
  "№": 197,
  "ФИО": "Димитренко Дмитрий Данилович",
  "стол": 31
}, {
  "№": 198,
  "ФИО": "Плотникова Анастасия Витальевна",
  "стол": 31
}, {
  "№": 199,
  "ФИО": "Одувалов Олег Александрович",
  "стол": 31
}, {
  "№": 200,
  "ФИО": "Шульгин Владимир Александрович",
  "стол": 31
}, {
  "№": 201,
  "ФИО": "Латышев Максим Владимирович",
  "стол": 31
}, {
  "№": 202,
  "ФИО": "Гребенникова Анастасия Георгиевна",
  "стол": 31
}, {
  "№": 203,
  "ФИО": "Федоркина Надежда Владимировна",
  "стол": 31
}, {
  "№": 204,
  "ФИО": "Баканова Александра Константиновна",
  "стол": 32
}, {
  "№": 205,
  "ФИО": "Лапина Татьяна Евгеньевна",
  "стол": 32
}, {
  "№": 206,
  "ФИО": "Машков Артем Олегович",
  "стол": 32
}, {
  "№": 207,
  "ФИО": "Паценко Ольга Васильевна",
  "стол": 32
}, {
  "№": 208,
  "ФИО": "Новикова Ирина Геннадьевна",
  "стол": 32
}, {
  "№": 209,
  "ФИО": "Анохина Ольга Олеговна",
  "стол": 32
}, {
  "№": 210,
  "ФИО": "Соттаева Саида Ахматовна",
  "стол": 32
}, {
  "№": 211,
  "ФИО": "Топчий Анастасия Алексеевна",
  "стол": 32
}, {
  "№": 212,
  "ФИО": "Синявина Светлана Сергеевна",
  "стол": 32
}, {
  "№": 213,
  "ФИО": "Боровская Ирина Анатольевна",
  "стол": 32
}, {
  "№": 214,
  "ФИО": "Токарева Алевтина Сергеевна",
  "стол": 32
}, {
  "№": 215,
  "ФИО": "Мазикин Александр Александрович",
  "стол": 32
}, {
  "№": 216,
  "ФИО": "Хазаржиян Любовь Ивановна",
  "стол": 33
}, {
  "№": 217,
  "ФИО": "Шишлов Михаил Михайлович",
  "стол": 33
}, {
  "№": 218,
  "ФИО": "Севрюк Павел Александрович",
  "стол": 33
}, {
  "№": 219,
  "ФИО": "Толстых Анна Владимировна",
  "стол": 33
}, {
  "№": 220,
  "ФИО": "Евтерев Владимир Николаевич",
  "стол": 33
}, {
  "№": 221,
  "ФИО": "Молодецкий Владимир Викторович",
  "стол": 1
}, {
  "№": 223,
  "ФИО": "Тер-Григорьянц Руслан Геворгович",
  "стол": 33
}, {
  "№": 224,
  "ФИО": "Москалев Антон Сергеевич",
  "стол": 33
}, {
  "№": 225,
  "ФИО": "Ермакова Екатерина Сергеевна",
  "стол": 33
}, {
  "№": 226,
  "ФИО": "Валуйская Оксана Валерьевна",
  "стол": 33
}, {
  "№": 227,
  "ФИО": "Дубовик Юрий Александрович",
  "стол": 33
}, {
  "№": 228,
  "ФИО": "Комов Александр Владимирович",
  "стол": 33
}, {
  "№": 229,
  "ФИО": "Моторова Валерия Витальевна",
  "стол": 34
}, {
  "№": 230,
  "ФИО": "Кострицына Светлана Анатольевна",
  "стол": 17
}, {
  "№": 231,
  "ФИО": "Антуфьева Наталья Анатольевна",
  "стол": 34
}, {
  "№": 232,
  "ФИО": "Ермин Евгений Олегович",
  "стол": 34
}, {
  "№": 233,
  "ФИО": "Жукова Ксения Сергеевна",
  "стол": 34
}, {
  "№": 234,
  "ФИО": "Науменко Игорь Сергеевич",
  "стол": 34
}, {
  "№": 235,
  "ФИО": "Филатова Ирина Васильевна",
  "стол": 34
}, {
  "№": 236,
  "ФИО": "Левченко Александр Евгеньевич",
  "стол": 34
}, {
  "№": 237,
  "ФИО": "Лебедь Елена Сергеевна",
  "стол": 34
}, {
  "№": 238,
  "ФИО": "Бараев Андрей Александрович",
  "стол": 34
}, {
  "№": 239,
  "ФИО": "Садков Антон Александрович",
  "стол": 1
}, {
  "№": 240,
  "ФИО": "Мурзина Татьяна Александровна",
  "стол": 34
}, {
  "№": 241,
  "ФИО": "Борисова Валентина Константиновна",
  "стол": 34
}, {
  "№": 242,
  "ФИО": "Вантеев Илья Михайлович",
  "стол": 18
}, {
  "№": 243,
  "ФИО": "Даливалов Максим Замирович",
  "стол": 34
}, {
  "№": 244,
  "ФИО": "Заяц Ирина Сергеевна",
  "стол": 35
}, {
  "№": 245,
  "ФИО": "Лукьяненко Янина Сергеевна",
  "стол": 35
}, {
  "№": 246,
  "ФИО": "Струкова Екатерина Александровна",
  "стол": 35
}, {
  "№": 247,
  "ФИО": "Ягунова Эллина Андреевна",
  "стол": 35
}, {
  "№": 248,
  "ФИО": "Петренко Зоя Владимировна",
  "стол": 35
}, {
  "№": 249,
  "ФИО": "Родионов Александр Романович",
  "стол": 35
}, {
  "№": 250,
  "ФИО": "Штейн Жанна Владимировна",
  "стол": 35
}, {
  "№": 251,
  "ФИО": "Долинская Вероника Валерьевна",
  "стол": 35
}, {
  "№": 252,
  "ФИО": "Уварова Наталья Андреевна",
  "стол": 35
}, {
  "№": 253,
  "ФИО": "Пакселева Елена Сергеевна",
  "стол": 35
}, {
  "№": 254,
  "ФИО": "Лукина Алена Сергеевна",
  "стол": 35
}, {
  "№": 255,
  "ФИО": "Бурдынская Наталья Владимировна",
  "стол": 35
}, {
  "№": 256,
  "ФИО": "Кучеренко Людмила Александровна",
  "стол": 29
}, {
  "№": 257,
  "ФИО": "Медведев Павел Евгеньевич",
  "стол": 29
}, {
  "№": 258,
  "ФИО": "Ковалев Денис Александрович",
  "стол": 29
}, {
  "№": 259,
  "ФИО": "Лазебникова Елена Викторовна",
  "стол": 29
}, {
  "№": 260,
  "ФИО": "Дуванская Дарья Николаевна",
  "стол": 29
}, {
  "№": 261,
  "ФИО": "Росляков Алексей Сергеевич",
  "стол": 29
}, {
  "№": 262,
  "ФИО": "Абдулвагидов Анри Абдулвагидович",
  "стол": 7
}, {
  "№": 263,
  "ФИО": "Афанасьев Дмитрий Викторович",
  "стол": 7
}, {
  "№": 264,
  "ФИО": "Байсаев Руслан Лом-Алиевич",
  "стол": 7
}, {
  "№": 265,
  "ФИО": "Бахолдин Александр Михайлович",
  "стол": 7
}, {
  "№": 266,
  "ФИО": "Петренко Андрей Викторович",
  "стол": 7
}, {
  "№": 267,
  "ФИО": "Быков Александр Анатольевич",
  "стол": 7
}, {
  "№": 268,
  "ФИО": "Виевник Дмитрий Николаевич",
  "стол": 7
}, {
  "№": 269,
  "ФИО": "Герасимов Лев Львович",
  "стол": 7
}, {
  "№": 270,
  "ФИО": "Гиш Сергей Александрович",
  "стол": 7
}, {
  "№": 271,
  "ФИО": "Долинский Валерий Станиславович",
  "стол": 17
}, {
  "№": 272,
  "ФИО": "Ескин Андрей Николаевич",
  "стол": 7
}, {
  "№": 273,
  "ФИО": "Зыков Игорь Александрович",
  "стол": 7
}, {
  "№": 274,
  "ФИО": "Семёнов Михаил Юрьевич",
  "стол": 7
}, {
  "№": 275,
  "ФИО": "Картунов Николай Валерьевич",
  "стол": 11
}, {
  "№": 276,
  "ФИО": "Патапов Владимир Федорович",
  "стол": 11
}, {
  "№": 277,
  "ФИО": "Куликов Сергей Гаврилович",
  "стол": 11
}, {
  "№": 278,
  "ФИО": "Левшина Тамара Викторовна",
  "стол": 11
}, {
  "№": 279,
  "ФИО": "Лукина Ирина Владимировна",
  "стол": 11
}, {
  "№": 280,
  "ФИО": "Мазикина Ирина Владимировна",
  "стол": 11
}, {
  "№": 281,
  "ФИО": "Мусаев Джамал Самижулланович",
  "стол": 11
}, {
  "№": 282,
  "ФИО": "Панченко Ирина Афанасьевна",
  "стол": 11
}, {
  "№": 283,
  "ФИО": "Семенюк Павел Павлович",
  "стол": 11
}, {
  "№": 284,
  "ФИО": "Сухов Иван Евгеньевич",
  "стол": 11
}, {
  "№": 285,
  "ФИО": "Татаров Марк Валерьевич",
  "стол": 11
}, {
  "№": 286,
  "ФИО": "Тихонов Александр Александрович",
  "стол": 11
}, {
  "№": 287,
  "ФИО": "Тресков Андрей Валерьевич",
  "стол": 12
}, {
  "№": 288,
  "ФИО": "Фёдорова Ольга Александровна",
  "стол": 12
}, {
  "№": 289,
  "ФИО": "Ханикалов Абдула Ханикалович",
  "стол": 12
}, {
  "№": 290,
  "ФИО": "Харин Вячеслав Анатольевич",
  "стол": 12
}, {
  "№": 291,
  "ФИО": "Шаджанов Бадма Якимович",
  "стол": 12
}, {
  "№": 292,
  "ФИО": "Четвертаков Вячеслав Александрович",
  "стол": 12
}, {
  "№": 293,
  "ФИО": "Штейн Александр Юрьевич",
  "стол": 12
}, {
  "№": 294,
  "ФИО": "Исмаилов Бакир Мугиевич",
  "стол": 12
}, {
  "№": 295,
  "ФИО": "Керимханов Рустам Джавидович",
  "стол": 17
}, {
  "№": 296,
  "ФИО": "Лопушков Егор Юрьевич",
  "стол": 15
}, {
  "№": 297,
  "ФИО": "Кружилин Антон Сергеевич",
  "стол": 15
}, {
  "№": 298,
  "ФИО": "Горелов Анатолий Анатольевич",
  "стол": 15
}, {
  "№": 299,
  "ФИО": "Головин Олег Олегович",
  "стол": 15
}, {
  "№": 300,
  "ФИО": "Гужальский Андрей Сергеевич",
  "стол": 15
}, {
  "№": 301,
  "ФИО": "Краутер Юлия Владимировна",
  "стол": 15
}, {
  "№": 302,
  "ФИО": "Золотухина Александра Евгеньевна",
  "стол": 15
}, {
  "№": 303,
  "ФИО": "Болотов Евгений Сергеевич",
  "стол": 15
}, {
  "№": 304,
  "ФИО": "Радауцан Александр Сергеевич",
  "стол": 15
}, {
  "№": 305,
  "ФИО": "Харченко Михаил Юрьевич",
  "стол": 15
}, {
  "№": 306,
  "ФИО": "Бойко Анна Викторовна",
  "стол": 15
}, {
  "№": 307,
  "ФИО": "Змеева Елена Викторовна",
  "стол": 15
}, {
  "№": 308,
  "ФИО": "Калинина Любовь Анатольевна",
  "стол": 14
}, {
  "№": 309,
  "ФИО": "Дюжиков Сергей Владимирович",
  "стол": 14
}, {
  "№": 310,
  "ФИО": "Ткаченко Марина Владимировна",
  "стол": 18
}, {
  "№": 311,
  "ФИО": "Субботина Ирина Артуровна",
  "стол": 12
}, {
  "№": 312,
  "ФИО": "Мордвинова Лина Сергеевна",
  "стол": 13
}, {
  "№": 313,
  "ФИО": "Каширская Анна Викторовна",
  "стол": 13
}, {
  "№": 314,
  "ФИО": "Литвинова Инна Юрьевна",
  "стол": 13
}, {
  "№": 315,
  "ФИО": "Салангина Светлана Владимировна",
  "стол": 13
}, {
  "№": 316,
  "ФИО": "Семенченко Жанна Закировна",
  "стол": 13
}, {
  "№": 317,
  "ФИО": "Старенко Оксана Геннадиевна",
  "стол": 13
}, {
  "№": 318,
  "ФИО": "Рагунович Виктория Константиновна",
  "стол": 13
}, {
  "№": 319,
  "ФИО": "Моисеенко Карина Ивановна",
  "стол": 13
}, {
  "№": 320,
  "ФИО": "Сергеева Алина Магомедовна",
  "стол": 13
}, {
  "№": 321,
  "ФИО": "Кавардакова Ольга Валерьевна",
  "стол": 13
}, {
  "№": 322,
  "ФИО": "Самсонова Ирина Владимировна",
  "стол": 14
}, {
  "№": 323,
  "ФИО": "Джангалиева Алла Николаевна",
  "стол": 14
}, {
  "№": 324,
  "ФИО": "Улендеева Анастасия Александровна",
  "стол": 14
}, {
  "№": 325,
  "ФИО": "Ильина Людмила Николаевна",
  "стол": 14
}, {
  "№": 326,
  "ФИО": "Садаханова Аминат Мухтановна",
  "стол": 14
}, {
  "№": 327,
  "ФИО": "Бирюков Владимир Евгеньевич",
  "стол": 14
}, {
  "№": 328,
  "ФИО": "Бахарева Татьяна Александровна",
  "стол": 14
}, {
  "№": 329,
  "ФИО": "Марина Дарья Юрьевна",
  "стол": 14
}, {
  "№": 330,
  "ФИО": "Ихсанова Алия Габбасовна",
  "стол": 14
}, {
  "№": 331,
  "ФИО": "Шведова Анастасия Александровна",
  "стол": 14
}, {
  "№": 332,
  "ФИО": "Римша Анна Андреевна",
  "стол": 12
}, {
  "№": 333,
  "ФИО": "Ярощук Сергей Олегович",
  "стол": 12
}, {
  "№": 334,
  "ФИО": "Ибрагимова Виктория Тахировна",
  "стол": 12
}, {
  "№": 335,
  "ФИО": "Апанасенко Сергей Сергеевич",
  "стол": 2
}, {
  "№": 336,
  "ФИО": "Комарова Татьяна Григорьевна",
  "стол": 2
}, {
  "№": 337,
  "ФИО": "Свищев Иван Владимирович",
  "стол": 2
}, {
  "№": 338,
  "ФИО": "Резниченко Юрий Викторович",
  "стол": 2
}, {
  "№": 339,
  "ФИО": "Рогинская Оксана Владимировна",
  "стол": 2
}, {
  "№": 341,
  "ФИО": "Хмелевская Татьяна Николаевна",
  "стол": 2
}, {
  "№": 342,
  "ФИО": "Акуз Антон Павлович",
  "стол": 2
}, {
  "№": 343,
  "ФИО": "Кнухов Тимур Назирович",
  "стол": 5
}, {
  "№": 344,
  "ФИО": "Дубовитская Татьяна Александровна",
  "стол": 18
}, {
  "№": 345,
  "ФИО": "Шурмина Ольга Сергеевна",
  "стол": 5
}, {
  "№": 346,
  "ФИО": "Лощинина Надежда Геннадьевна",
  "стол": 5
}, {
  "№": 347,
  "ФИО": "Ахмадуллин Алек Акрямович",
  "стол": 5
}, {
  "№": 348,
  "ФИО": "Дудаева Петимат Адамовна",
  "стол": 5
}, {
  "№": 349,
  "ФИО": "Магомедзагиров Эльман Мухтарович",
  "стол": 5
}, {
  "№": 350,
  "ФИО": "Касьяненко Валерий Викторович",
  "стол": 18
}, {
  "№": 351,
  "ФИО": "Коростелева Марина Валентиновна",
  "стол": 10
}, {
  "№": 352,
  "ФИО": "Афонин Сергей Геннадьевич",
  "стол": 17
}, {
  "№": 353,
  "ФИО": "Выхованец Виктория Стефановна",
  "стол": 18
}, {
  "№": 354,
  "ФИО": "Грунина Ольга Сергеевна",
  "стол": 18
}, {
  "№": 355,
  "ФИО": "Загорулько Анатолий Николаевич",
  "стол": 17
}, {
  "№": 356,
  "ФИО": "Магомадов Беслан Рамзанович",
  "стол": 17
}, {
  "№": 357,
  "ФИО": "Магомедов Авусалитдин Шаравитдинович",
  "стол": 17
}, {
  "№": 358,
  "ФИО": "Тарамов Билал Илесович",
  "стол": 17
}, {
  "№": 359,
  "ФИО": "Маргиева Людмила Леонидовна",
  "стол": 3
}, {
  "№": 360,
  "ФИО": "Любезнова Ольга Евгеньевна",
  "стол": 3
}, {
  "№": 361,
  "ФИО": "Берзой Татьяна Владимировна",
  "стол": 29
}, {
  "№": 362,
  "ФИО": "Игнатова Светлана Васильевна",
  "стол": 29
}, {
  "№": 363,
  "ФИО": "Веревкина Надежда Васильеван",
  "стол": 29
}, {
  "№": 364,
  "ФИО": "Плутницкий Кирилл Игоревич",
  "стол": 29
}, {
  "№": 365,
  "ФИО": "Кондратьев Александр Анатольевич",
  "стол": 29
}, {
  "№": 366,
  "ФИО": "Брылева Ярославна Владимировна",
  "стол": 29
}, {
  "№": 367,
  "ФИО": "Смолянинов Александр Александрович",
  "стол": 1
}, {
  "№": 368,
  "ФИО": "Ряполов Андрей Николаевич",
  "стол": 1
}, {
  "№": 369,
  "ФИО": "Паносян Сузанна Мелсиковна",
  "стол": 1
}, {
  "№": 370,
  "ФИО": "Алексеева Ксения Алексеевна",
  "стол": 24
}, {
  "№": 371,
  "ФИО": "Брагин Леонид Сергеевич",
  "стол": 24
}, {
  "№": 372,
  "ФИО": "Дегтярев Кирилл Сергеевич",
  "стол": 24
}, {
  "№": 373,
  "ФИО": "Антипенко Владислав Андреевич",
  "стол": 24
}, {
  "№": 374,
  "ФИО": "Скосарева Тамара Алексеевна",
  "стол": 24
}, {
  "№": 375,
  "ФИО": "Бондаренко Евгений Валерьевич",
  "стол": 24
}, {
  "№": 376,
  "ФИО": "Маркова Ирина Евгеньевна",
  "стол": 24
}, {
  "№": 377,
  "ФИО": "Хутова Диана Витальевна",
  "стол": 24
}, {
  "№": 378,
  "ФИО": "Семакина Ольга Александровна",
  "стол": 24
}, {
  "№": 379,
  "ФИО": "Бугаец Виктория Владимировна",
  "стол": 24
}, {
  "№": 380,
  "ФИО": "Любимов Дмитрий Викторович",
  "стол": 24
}, {
  "№": 381,
  "ФИО": "Алексеенко Светлана Евгеньевна",
  "стол": 2
}, {
  "№": 382,
  "ФИО": "Варжель Михаил Валентинович",
  "стол": 2
}, {
  "№": 383,
  "ФИО": "Бутенко Антон Александрович",
  "стол": 2
}, {
  "№": 384,
  "ФИО": "Варжель Алексей Валентинович",
  "стол": 9
}, {
  "№": 385,
  "ФИО": "Журба Наталия Александровна",
  "стол": 9
}, {
  "№": 386,
  "ФИО": "Кагадий Ирина Андреевна",
  "стол": 9
}, {
  "№": 387,
  "ФИО": "Филин Артем Александрович",
  "стол": 17
}, {
  "№": 388,
  "ФИО": "Колоскова Мария Константиновна",
  "стол": 9
}, {
  "№": 389,
  "ФИО": "Коляков Максим Александрович",
  "стол": 9
}, {
  "№": 390,
  "ФИО": "Зензина Елизавета Григорьевна",
  "стол": 9
}, {
  "№": 391,
  "ФИО": "Дергунова Ирина Николаевна",
  "стол": 9
}, {
  "№": 392,
  "ФИО": "Аракелова Наталья Михайловна",
  "стол": 9
}, {
  "№": 393,
  "ФИО": "Попов Николай Петрович",
  "стол": 9
}, {
  "№": 394,
  "ФИО": "Теплинская Татьяна Михайловна",
  "стол": 9
}, {
  "№": 395,
  "ФИО": "Островерхова Виктория Юрьевна",
  "стол": 9
}, {
  "№": 396,
  "ФИО": "Бойко Анастасия Алексеевна",
  "стол": 9
}, {
  "№": 397,
  "ФИО": "Талапина Юлия Сергеевна",
  "стол": 8
}, {
  "№": 398,
  "ФИО": "Будишевская Марина Ивановна",
  "стол": 8
}, {
  "№": 399,
  "ФИО": "Гомеля Яна Вячеславовна",
  "стол": 8
}, {
  "№": 400,
  "ФИО": "Грабовский Константин Алексеевич",
  "стол": 8
}, {
  "№": 401,
  "ФИО": "Денисов Матвей Артурович",
  "стол": 8
}, {
  "№": 402,
  "ФИО": "Хакимов Ильдар Дамирович",
  "стол": 8
}, {
  "№": 403,
  "ФИО": "Бобруйко Наталья Александровна",
  "стол": 8
}, {
  "№": 404,
  "ФИО": "Томилин Андрей Александрович",
  "стол": 16
}, {
  "№": 405,
  "ФИО": "Тронина Юлия Александровна",
  "стол": 16
}, {
  "№": 406,
  "ФИО": "Сикорская Елена Анатольевна",
  "стол": 16
}, {
  "№": 407,
  "ФИО": "Архипенко Никита Юрьевич",
  "стол": 16
}, {
  "№": 408,
  "ФИО": "Угненко Екатерина Анатольевна",
  "стол": 17
}, {
  "№": 409,
  "ФИО": "Мартынова Марина Владимировна",
  "стол": 16
}, {
  "№": 410,
  "ФИО": "Бирюлин Иван Витальевич",
  "стол": 16
}, {
  "№": 411,
  "ФИО": "Смирнова Оксана Владимировна",
  "стол": 10
}, {
  "№": 412,
  "ФИО": "Шевцова Екатерина Викторовна",
  "стол": 33
}, {
  "№": 413,
  "ФИО": "Балашов Илья Вячеславович",
  "стол": 18
}, {
  "№": 414,
  "ФИО": "Самсонова Елена Викторовна",
  "стол": 12
}, {
  "№": 415,
  "ФИО": "Оноша Валерий Викторович",
  "стол": 16
}];

exports.default = dataList;

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fullpage = require('fullpage.js');

var _fullpage2 = _interopRequireDefault(_fullpage);

var _jqueryAutocomplete = require('jquery-autocomplete');

var _jqueryAutocomplete2 = _interopRequireDefault(_jqueryAutocomplete);

var _fancybox = require('@fancyapps/fancybox');

var _fancybox2 = _interopRequireDefault(_fancybox);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserAgentString = navigator.userAgent;

if (UserAgentString.indexOf('Trident/7.0') + 1) {
		(0, _jquery2.default)('#c1').addClass('hidden');
		(0, _jquery2.default)('#c2').addClass('hidden');
}

jQuery('.location__map-link').fancybox({
		afterLoad: function afterLoad() {
				_jquery2.default.fn.fullpage.setAllowScrolling(false);
		},

		afterClose: function afterClose() {
				_jquery2.default.fn.fullpage.setAllowScrolling(true);
		}
}

// fullpage

);(0, _jquery2.default)(document).ready(function () {
		(0, _jquery2.default)('#fullpage').fullpage({
				anchors: ['page-1', 'page-2', 'page-3', 'page-4', 'page-5'],
				menu: '#menu',
				navigation: true
		});
});

// autocomplete and popup

var formButton = (0, _jquery2.default)('.seating__button');
var popupButtonClose = (0, _jquery2.default)('.popup-close');
var seatInput = jQuery(".seating__input");

var FullNameArray = _data2.default.map(function (element) {
		return element['ФИО'];
});

seatInput.autocomplete({
		source: [FullNameArray],
		limit: 20,
		visibleLimit: 6
});

formButton.click(function (evt) {
		evt.preventDefault();

		var coincidence = _data2.default.some(function (element) {
				return seatInput.val() === element['ФИО'];
		});

		if (coincidence) {
				_data2.default.forEach(function (element) {
						if (seatInput.val() === element['ФИО']) {
								(0, _jquery2.default)('.popup__text').removeClass('hidden');
								(0, _jquery2.default)('.popup__number').text(element['стол']);
						}
				});
		} else {
				(0, _jquery2.default)('.popup__text').addClass('hidden');
				(0, _jquery2.default)('.popup__number').text('Имя не найдено');
		}

		(0, _jquery2.default)('.popup').addClass('open-popup');
});

popupButtonClose.click(function () {
		(0, _jquery2.default)('.popup').removeClass('open-popup');
});

(0, _jquery2.default)('.popup-overlay').click(function (evt) {
		if ((0, _jquery2.default)(evt.target).closest('.popup-container').length == 0) {
				(0, _jquery2.default)('.popup').removeClass('open-popup');
		}
});

// navigation

(0, _jquery2.default)("#navToggle").click(function (evt) {
		evt.stopPropagation();
		(0, _jquery2.default)(this).toggleClass("active");
		(0, _jquery2.default)(".main-nav-overlay").toggleClass("open");
		(0, _jquery2.default)("body").toggleClass("locked");
});

// var links = document.querySelectorAll('.main-nav__link')
var links = (0, _jquery2.default)('.main-nav__link');

console.log(links);

links.each(function (a, link) {
		link.addEventListener('click', function () {
				(0, _jquery2.default)(".main-nav-overlay").removeClass("open");
				(0, _jquery2.default)("body").removeClass("locked");
				(0, _jquery2.default)("#navToggle").removeClass("active");
		});
}

// next code

);(0, _jquery2.default)('.container').click(function (evt) {
		evt.stopPropagation();
});

(0, _jquery2.default)('.filter').click(function (evt) {
		evt.stopPropagation();
});

(0, _jquery2.default)('.main-nav-overlay').click(function (evt) {
		evt.stopPropagation();
});

(0, _jquery2.default)('#fullpage').click(function (evt) {
		evt.stopPropagation();
});

(0, _jquery2.default)('.popup').click(function (evt) {
		evt.stopPropagation();
}

// canvas

);var c1 = document.getElementById('c1'),
    ctx1 = c1.getContext('2d'),
    c2 = document.getElementById('c2'),
    ctx2 = c2.getContext('2d'),
    twopi = Math.PI * 2,
    parts = [],
    sizeBase,
    opt,
    hue,
    count;

var cw;
var ch;

function rand(min, max) {
		return Math.random() * (max - min) + min;
}

function hsla(h, s, l, a) {
		return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
}

function create() {
		sizeBase = cw + ch;
		count = Math.floor(sizeBase * 0.3), hue = 180, opt = {
				radiusMin: 1,
				radiusMax: sizeBase * 0.04 * 2,
				blurMin: 10,
				blurMax: sizeBase * 0.04 * 4,
				hueMin: hue,
				hueMax: hue + 40,
				saturationMin: 20,
				saturationMax: 50,
				lightnessMin: 20,
				lightnessMax: 30,
				alphaMin: 0.2,
				alphaMax: 0.3
		};
		ctx1.clearRect(0, 0, cw, ch);
		ctx1.globalCompositeOperation = 'lighter';
		while (count--) {
				var radius = rand(opt.radiusMin, opt.radiusMax),
				    blur = rand(opt.blurMin, opt.blurMax),
				    x = rand(0, cw),
				    y = rand(0, ch),
				    hue = rand(opt.hueMin, opt.hueMax),
				    saturation = rand(opt.saturationMin, opt.saturationMax),
				    lightness = rand(opt.lightnessMin, opt.lightnessMax),
				    alpha = rand(opt.alphaMin, opt.alphaMax);

				ctx1.shadowColor = hsla(hue, saturation, lightness, alpha);
				ctx1.shadowBlur = blur;
				ctx1.beginPath();
				ctx1.arc(x, y, radius, 0, twopi);
				ctx1.closePath();
				ctx1.fill();
		}

		parts.length = 0;
		for (var i = 0; i < Math.floor((cw + ch) * 0.03); i++) {
				parts.push({
						radius: rand(1, sizeBase * 0.03),
						x: rand(0, cw),
						y: rand(0, ch),
						angle: rand(0, twopi),
						vel: rand(0.1, 0.5),
						tick: rand(0, 10000)
				});
		}
}

function init() {
		resize();
		create();
		loop();
}

function loop() {
		requestAnimationFrame(loop);

		ctx2.clearRect(0, 0, cw, ch);
		ctx2.globalCompositeOperation = 'source-over';
		ctx2.shadowBlur = 0;
		ctx2.drawImage(c1, 0, 0);
		ctx2.globalCompositeOperation = 'lighter';

		var i = parts.length;
		ctx2.shadowBlur = 10;
		ctx2.shadowColor = '#fff';
		while (i--) {
				var part = parts[i];

				part.x += Math.cos(part.angle) * part.vel;
				part.y += Math.sin(part.angle) * part.vel;
				part.angle += rand(-0.05, 0.05);

				ctx2.beginPath();
				ctx2.arc(part.x, part.y, part.radius, 0, twopi);
				ctx2.fillStyle = hsla(0, 0, 100, 0.075 + Math.cos(part.tick * 0.02) * 0.05);
				ctx2.fill();

				if (part.x - part.radius > cw) {
						part.x = -part.radius;
				}
				if (part.x + part.radius < 0) {
						part.x = cw + part.radius;
				}
				if (part.y - part.radius > ch) {
						part.y = -part.radius;
				}
				if (part.y + part.radius < 0) {
						part.y = ch + part.radius;
				}

				part.tick++;
		}
}

function resize() {
		cw = c1.width = c2.width = window.innerWidth, ch = c1.height = c2.height = window.innerHeight;
		create();
}

function click() {
		create();
}

window.addEventListener('resize', resize);
window.addEventListener('click', click);

init();

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map