"use strict"

// функция генерируюет рандомно время
/**
 * 
 * @param {number} max максимальное время
 * @returns рандомное число
 */
function getRandomFloat(max) {
    return (Math.random() * max);
}

class Racer {
    constructor(id, surname, name, rating, country) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.rating = Number(rating);
        this.country = country;
        this.time = 0;
        this.finalTime = 0;
    }
}

class Country {
    constructor(id, name, racers,) {
        this.id = id;
        this.name = name;
        this.racers = racers;
        this.placeRoundOne = 0;
        this.placeRoundTwo = 0;
        this.worstStageTime = 0;
        this.bestRacerTime = 0;
        this.avgArithmetic = 0;
    }
}

class Main {
    maxStageTime = 100;
    maxRating = 75;

    constructor() {
        this.racersCount = 0;
        this.racers = []; // Масив гонщиков
        this.countriesCount = 0;
        this.countries = []; // Массив стран и их представителей (изначально место страны 0)
        this.stagesCount = NaN;
        this.leaders = []; // Массив стран для второго круга

        this.fillRacers();
        this.fillCountries();
    }

    /**
     * 
     * @param {string} surname фамилия
     * @param {string} name имя
     * @param {string} country страна
     */
    addRacer(surname, name, country) {
        let racer = new Racer(++this.racersCount, surname, name, getRandomFloat(this.maxRating), country);
        this.racers.push(racer);
    }

    fillRacers() {
        this.addRacer('Иванов', 'Дмитрий', 'Россия');
        this.addRacer('Петров', 'Сергей', 'Россия');
        this.addRacer('Писаренко', 'Иван', 'Россия');
        this.addRacer('Пупкин', 'Степан', 'Россия');
        this.addRacer('Уильмс', 'Патрик', 'Англия');
        this.addRacer('Питерс', 'Джек', 'Англия');
        this.addRacer('Мартин', 'Чарли', 'Англия');
        this.addRacer('Джордан', 'Томсан', 'Англия');
        this.addRacer('Чан', 'Ли', 'Китай');
        this.addRacer('Ван', 'Сяу', 'Китай');
        this.addRacer('Ян', 'Ли', 'Китай');
        this.addRacer('Хуан', 'Брюс', 'Китай');
        this.addRacer('Узумаки', 'Наруто', 'Япония');
        this.addRacer('Намиказа', 'Ямато', 'Япония');
        this.addRacer('Учиха', 'Саске', 'Япония');
        this.addRacer('Намикака', 'Ляу', 'Япония');
        this.addRacer('Хансен', 'Ждан', 'Норвегия');
        this.addRacer('Олсен', 'Оли', 'Норвегия');
        this.addRacer('Йохан', 'Кроль', 'Норвегия');
        this.addRacer('Сульшер', 'Арно', 'Норвегия');
        this.addRacer('Мюлер', 'Томас', 'Германия');
        this.addRacer('Фишер', 'Ренди', 'Германия');
        this.addRacer('Беккер', 'Ингрем', 'Германия');
        this.addRacer('Шнайдер', 'Майкл', 'Германия');
    }

    /**
     * 
     * @param {string} nameCountry Название страны
     * @returns массив странны гонщиков
     */
    getCountryRacers(nameCountry) {
        return this.racers.filter(id => id.country === nameCountry);
    }

    addCountry(name) {
        let racers = this.getCountryRacers(name);
        let country = new Country(++this.countriesCount, name, racers);
        this.countries.push(country);
    }

    fillCountries() {
        this.addCountry('Россия');
        this.addCountry('Китай');
        this.addCountry('Германия');
        this.addCountry('Япония');
        this.addCountry('Норвегия');
        this.addCountry('Англия');
    }

    promptStagesCount() {
        while (isNaN(this.stagesCount) || this.stagesCount <= 0) {
            this.stagesCount = Number(prompt("Введите колличество этапов для 1 круга "));

            if (isNaN(this.stagesCount) || this.stagesCount <= 0) {
                alert('Нужно ввести число больше 0');
                this.stagesCount = NaN;
            }
        }
    }

    // Рандомное время и сумма времени
    changeRacersTime() {
        for (let i = 0; i < this.racers.length; i++) {
            this.racers[i].time = Number(getRandomFloat(this.maxStageTime));
            this.racers[i].finalTime += this.racers[i].time;
        }
    }

    // 1 круг
    rateCountriesRoundOne() {
        for (let i = 0; i < this.stagesCount; i++) {
            this.changeRacersTime();

            // Обращение к элементу time и добавления в массив страны худщего показателя
            for (let j = 0; j < this.countries.length; j++) {
                let arrRacerStran = this.getCountryRacers(this.countries[j].name);
                let worstRacerTime = 0;

                for (let k = 0; k < arrRacerStran.length; k++) {
                    worstRacerTime = (arrRacerStran[k].time > worstRacerTime ? arrRacerStran[k].time : worstRacerTime);
                }

                this.countries[j].worstStageTime = worstRacerTime;
            }

            // Сортировка массива стран по времени
            this.countries.sort((prev, next) => prev.worstStageTime - next.worstStageTime);

            // проходим массив стран и записываем индекс как место, обнуляем время худшего для дальнейших итераций
            for (let j = 0; j < this.countries.length; j++) {
                this.countries[j].placeRoundOne += (j + 1);
            }
        }

        // находим лучше время гонщика странны
        for (let j = 0; j < this.countries.length; j++) {
            let arrRacerStran = this.getCountryRacers(this.countries[j].name);
            let bestRacerTime = this.maxStageTime + 1;

            for (let k = 0; k < arrRacerStran.length; k++) {
                bestRacerTime = (arrRacerStran[k].finalTime < bestRacerTime ? arrRacerStran[k].finalTime : bestRacerTime);
            }

            this.countries[j].bestRacerTime = bestRacerTime;
        }

        // сортировка массива итогов 1 круга по 2 свойствам
        this.countries.sort(function (x1, x2) {
            if (x1.placeRoundOne < x2.placeRoundOne) return -1;
            if (x1.placeRoundOne > x2.placeRoundOne) return 1;
            if (x1.bestRacerTime < x2.bestRacerTime) return -1;
            if (x1.bestRacerTime > x2.bestRacerTime) return 1;
            return 0;
        });
    }

    rateCountriesRoundTwo() {
        let table1 = document.getElementById("id-1");
        let table2 = document.getElementById("id-2");
        let h1_table1 = document.getElementById("h1_id");
        let h1_table2 = document.getElementById("h2_id");
        table1.parentNode.removeChild(table1);
        table2.parentNode.removeChild(table2);
        h1_table1.parentNode.removeChild(h1_table1);
        h1_table2.parentNode.removeChild(h1_table2);

        this.leaders = this.countries.slice(0, 4); // Оставляем четыре лучшие страны

        for (let i = 0; i < this.racers.length; i++) {
            this.racers[i].finalTime = 0;
        }

        this.stagesCount = 2; // Во втором круге два этапа

        for (let i = 0; i < this.stagesCount; i++) {
            this.changeRacersTime();

            // Обращение к элементу time и добавления в массив страны худщего показателя
            for (let j = 0; j < this.leaders.length; j++) {
                let arrRacerStran = this.getCountryRacers(this.leaders[j].name);
                let bestRacerTime = this.maxStageTime + 1;

                for (let k = 0; k < arrRacerStran.length; k++) {
                    bestRacerTime = (arrRacerStran[k].time < bestRacerTime ? arrRacerStran[k].time : bestRacerTime);
                }

                this.leaders[j].bestRacerTime = bestRacerTime;
            }

            // Сортировка массива стран по времени
            this.leaders.sort((prev, next) => prev.bestRacerTime - next.bestRacerTime);

            // проходим массив стран и записываем индекс как место, обнуляем время худшего для дальнейших итераций
            for (let j = 0; j < this.leaders.length; j++) {
                this.leaders[j].placeRoundTwo += (j + 1);
            }
        }

        this.leaders.sort((prev, next) => prev.placeRoundTwo - next.placeRoundTwo);

        for (let j = 0; j < this.leaders.length; j++) {
            this.leaders[j].placeRoundTwo = (j + 1);

            let arrRacerStran = this.getCountryRacers(this.leaders[j].name);

            for (let k = 0; k < arrRacerStran.length; k++) {
                this.leaders[j].avgArithmetic += arrRacerStran[k].rating;
            }

            this.leaders[j].avgArithmetic = this.leaders[j].avgArithmetic / arrRacerStran.length;
        }

        // сортировка массива итогов 1 круга по 2 свойствам
        this.leaders.sort(function (x1, x2) {
            if (x1.placeRoundTwo < x2.placeRoundTwo) return -1;
            if (x1.placeRoundTwo > x2.placeRoundTwo) return 1;
            if (x1.avgArithmetic < x2.avgArithmetic) return 1;
            if (x1.avgArithmetic > x2.avgArithmetic) return -1;
            return 0;
        });

        this.printRacersFromLeaders();
        this.printLeaders();
        setTimeout(() => alert('Победитель ' + this.leaders[0].name), 500);


        let submitButton = document.getElementById("submitButton");
        submitButton.remove();
    }

    sortRacers() {
        this.racers.sort((prev, next) => prev.finalTime - next.finalTime);
    }

    printRacers() {
        let h1 = document.createElement('h1');
        let div = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.id = 'id-2';
        h1.id = 'h2_id';
        div.classList = 'col-12 col-sm-6 col-md-8 col-lg-6';
        h1.innerHTML = "Результат личного зачета круга";

        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(h1);
        div.appendChild(table);

        document.getElementById('cll').appendChild(div);

        let row = document.createElement('tr');
        let row_data_2 = document.createElement('th');
        let row_data_3 = document.createElement('th');
        let row_data_4 = document.createElement('th');
        let row_data_5 = document.createElement('th');
        let row_data_6 = document.createElement('th');
        let row_data_7 = document.createElement('th');

        row_data_2.innerHTML = 'Фамилия';
        row_data_3.innerHTML = 'Имя';
        row_data_4.innerHTML = 'Рейтинг';
        row_data_5.innerHTML = 'Страна';
        row_data_6.innerHTML = 'Время<br>последнего<br>этапа';
        row_data_7.innerHTML = 'Время круга';

        row.appendChild(row_data_2);
        row.appendChild(row_data_3);
        row.appendChild(row_data_4);
        row.appendChild(row_data_5);
        row.appendChild(row_data_6);
        row.appendChild(row_data_7);

        thead.appendChild(row);

        for (let i = 0; i < this.racers.length; i++) {
            let row = document.createElement('tr');
            
            let row_data_2 = document.createElement('td');
            let row_data_3 = document.createElement('td');
            let row_data_4 = document.createElement('td');
            let row_data_5 = document.createElement('td');
            let row_data_6 = document.createElement('td');
            let row_data_7 = document.createElement('td');

            
            row_data_2.innerHTML = this.racers[i].surname;
            row_data_3.innerHTML = this.racers[i].name;
            row_data_4.innerHTML = this.racers[i].rating;
            row_data_5.innerHTML = this.racers[i].country;
            row_data_6.innerHTML = this.racers[i].time;
            row_data_7.innerHTML = this.racers[i].finalTime;

            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            row.appendChild(row_data_5);
            row.appendChild(row_data_6);
            row.appendChild(row_data_7);
            tbody.appendChild(row);
        }

    }

    printRacersFromLeaders() {
        let h1 = document.createElement('h1');
        let div = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.id = 'id-2';
        h1.id = 'h2_id';
        div.classList = 'col-12 col-sm-6 col-md-8 col-lg-6';
        h1.innerHTML = "Результат личного зачета круга";

        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(h1);
        div.appendChild(table);

        document.getElementById('cll').appendChild(div);

        let row = document.createElement('tr');
        let row_data_2 = document.createElement('th');
        let row_data_3 = document.createElement('th');
        let row_data_4 = document.createElement('th');
        let row_data_5 = document.createElement('th');
        let row_data_6 = document.createElement('th');
        let row_data_7 = document.createElement('th');
 
        row_data_2.innerHTML = 'Фамилия';
        row_data_3.innerHTML = 'Имя';
        row_data_4.innerHTML = 'Рейтинг';
        row_data_5.innerHTML = 'Страна';
        row_data_6.innerHTML = 'Время<br>последнего<br>этапа';
        row_data_7.innerHTML = 'Время круга';

        row.appendChild(row_data_2);
        row.appendChild(row_data_3);
        row.appendChild(row_data_4);
        row.appendChild(row_data_5);
        row.appendChild(row_data_6);
        row.appendChild(row_data_7);

        thead.appendChild(row);

        for (let j = 0; j < this.leaders.length; j++) {
            let arrRacerStran = this.getCountryRacers(this.leaders[j].name);

            for (let k = 0; k < arrRacerStran.length; k++) {
                let row = document.createElement('tr');
                
                let row_data_2 = document.createElement('td');
                let row_data_3 = document.createElement('td');
                let row_data_4 = document.createElement('td');
                let row_data_5 = document.createElement('td');
                let row_data_6 = document.createElement('td');
                let row_data_7 = document.createElement('td');
           
                row_data_2.innerHTML = arrRacerStran[k].surname;
                row_data_3.innerHTML = arrRacerStran[k].name;
                row_data_4.innerHTML = arrRacerStran[k].rating;
                row_data_5.innerHTML = arrRacerStran[k].country;
                row_data_6.innerHTML = arrRacerStran[k].time;
                row_data_7.innerHTML = arrRacerStran[k].finalTime;
           
                row.appendChild(row_data_2);
                row.appendChild(row_data_3);
                row.appendChild(row_data_4);
                row.appendChild(row_data_5);
                row.appendChild(row_data_6);
                row.appendChild(row_data_7);
                tbody.appendChild(row);
            }
        }
    }

    printCountries() {
        let h1 = document.createElement('h1');
        let div = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.id = 'id-1';
        div.classList = 'col-6 col-md-4 col-lg-5';
        h1.id = 'h1_id';

        h1.innerHTML = "Результат круга";

        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(h1);
        div.appendChild(table);

        document.getElementById('cll').appendChild(div);

        let row = document.createElement('tr');
        let row_data_2 = document.createElement('th');
        let row_data_3 = document.createElement('th');
        let row_data_4 = document.createElement('th');
        let row_data_5 = document.createElement('th');
        let row_data_6 = document.createElement('th');
  
        row_data_2.innerHTML = 'Наименование';
        row_data_3.innerHTML = 'Кол-во гонщиков';
        row_data_4.innerHTML = 'Место (круг 1)';
        row_data_5.innerHTML = 'Место (круг 2)';
        row_data_6.innerHTML = 'Худшее время этапа';
   
        row.appendChild(row_data_2);
        row.appendChild(row_data_3);
        row.appendChild(row_data_4);
        row.appendChild(row_data_5);
        row.appendChild(row_data_6);

        thead.appendChild(row);

        for (let i = 0; i < this.countries.length; i++) {
            let row = document.createElement('tr');    
            let row_data_2 = document.createElement('td');
            let row_data_3 = document.createElement('td');
            let row_data_4 = document.createElement('td');
            let row_data_5 = document.createElement('td');
            let row_data_6 = document.createElement('td');
 
            row_data_2.innerHTML = this.countries[i].name;
            row_data_3.innerHTML = this.countries[i].racers.length;
            row_data_4.innerHTML = this.countries[i].placeRoundOne;
            row_data_5.innerHTML = this.countries[i].placeRoundTwo;
            row_data_6.innerHTML = this.countries[i].worstStageTime;
      
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            row.appendChild(row_data_5);
            row.appendChild(row_data_6);
            tbody.appendChild(row);
        }
    }

    printLeaders() {
        let h1 = document.createElement('h1');
        let div = document.createElement('div');
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        table.id = 'id-1';
        div.classList = 'col-6 col-md-4 col-lg-5';
        h1.id = 'h1_id';

        h1.innerHTML = "Результат круга";

        table.appendChild(thead);
        table.appendChild(tbody);
        div.appendChild(h1);
        div.appendChild(table);

        document.getElementById('cll').appendChild(div);

        let row = document.createElement('tr');
        let row_data_2 = document.createElement('th');
        let row_data_3 = document.createElement('th');
        let row_data_4 = document.createElement('th');
        let row_data_5 = document.createElement('th');
        let row_data_6 = document.createElement('th');

        row_data_2.innerHTML = 'Наименование';
        row_data_3.innerHTML = 'Кол-во гонщиков';
        row_data_4.innerHTML = 'Место (круг 1)';
        row_data_5.innerHTML = 'Место (круг 2)';
        row_data_6.innerHTML = 'Худшее время этапа';

        row.appendChild(row_data_2);
        row.appendChild(row_data_3);
        row.appendChild(row_data_4);
        row.appendChild(row_data_5);
        row.appendChild(row_data_6);

        thead.appendChild(row);

        for (let i = 0; i < this.leaders.length; i++) {
            let row = document.createElement('tr');
            
            let row_data_2 = document.createElement('td');
            let row_data_3 = document.createElement('td');
            let row_data_4 = document.createElement('td');
            let row_data_5 = document.createElement('td');
            let row_data_6 = document.createElement('td');
      
            row_data_2.innerHTML = this.leaders[i].name;
            row_data_3.innerHTML = this.leaders[i].racers.length;
            row_data_4.innerHTML = this.leaders[i].placeRoundOne;
            row_data_5.innerHTML = this.leaders[i].placeRoundTwo;
            row_data_6.innerHTML = this.leaders[i].worstStageTime;
   
            row.appendChild(row_data_2);
            row.appendChild(row_data_3);
            row.appendChild(row_data_4);
            row.appendChild(row_data_5);
            row.appendChild(row_data_6);
            tbody.appendChild(row);
        }
    }
}

let app = new Main();
app.promptStagesCount();    
app.rateCountriesRoundOne();
app.sortRacers();
app.printRacers();
app.printCountries();