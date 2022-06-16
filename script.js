let strok = NaN;
            while (isNaN(strok) || strok  <= 1 ){
                strok = Number(prompt("Введите колличество строк "));
                     if ( isNaN(strok) || strok  <= 1)   {
            alert('Нужно ввести число больше 1');  
                     strok = NaN;
                }  
            }
 
let stolb = NaN;
            while (isNaN(stolb) ||  stolb  <= 1){
                stolb = Number(prompt("Введите колличество столбцов"));
                if ( isNaN(stolb) || stolb  <= 1)   {
                     alert('Нужно ввести число больше 1');  
                     stolb = NaN;
                }
            }          
 
let arrIshod = [];
let arrDva = [];
let sumDva = 0;
let sumArr = [];
let reshArr = [];
let odnoResh = [];
let k = 0;
let dvumerResh = [];
let table = document.querySelector('#table')
let table1 = document.querySelector('#table1')
let table2 = document.querySelector('#table2')
let table3 = document.querySelector('#table3')
 
 
     // Матрица M1
   
    for (let i = 0; i < strok; i++) {
       tr = document.createElement('tr');
     
        arrIshod[i] = [];
            for (let j = 0; j < stolb; j++) {
 
                arrIshod[i].push(Math.floor(Math.random() * -10) + Math.floor(Math.random() * 10));  
                td = document.createElement('td');
                td.innerHTML = arrIshod[i][j];
                tr.appendChild(td);
               
             
            }          
            table.appendChild(tr);
           
    }
 
   
 
    // Матрица M2
    for (let i = 0; i < strok; i++) {
        arrDva[i] = [];
            for (let j = 0; j < stolb; j++) {
 
                arrDva[i][j] = arrIshod[i][j];  
               
            }
         
    }
   
 
     // Условия замены
     for (let i = 0; i < strok; i++){
        tr = document.createElement('tr');
        for (let j = 0; j < stolb; j++){
            if (arrDva[i][j] == 5){
                arrDva[i][j] = -2;
            }
            if (arrDva[i][j] == -3){
                arrDva[i][j] = 2;
            }
            if (Math.abs(arrDva[i][j]) > 7){
                arrDva[i][j] = 0;
            }
            td = document.createElement('td');
                td.innerHTML = arrDva[i][j];
                tr.appendChild(td);
           
        }  
        table1.appendChild(tr);
    }
 
    // Алгеб сумма каждой строки матрицы М2, что привело к матрицы M3
    for (let i = 0; i < strok; i++) {
        sumDva = 0;
            for (let j = 0; j < stolb; j++) {
                sumDva += arrDva[i][j];  
                 
        }    
        sumArr[i] = [sumDva];      
       
    }
 
 
    for (let i = 0; i < strok ; i++) {  
        reshArr[i] = [];
        tr = document.createElement('tr');
        for (var j = 0; j < stolb; j++) {
            reshArr [i][j] = arrIshod[i][j] + sumArr[i][0];
            td = document.createElement('td');
            td.innerHTML = reshArr[i][j];
            tr.appendChild(td);
        }
        table2.appendChild(tr);
}
 
// сортировка и приоразования одномерного в двумерный массив
odnoResh = [].concat(...reshArr);
odnoResh.sort();
 
// приоразования двумерного в одномерный
for (let i = 0; i < strok ; i++) {  
    dvumerResh[i] = [];
    tr = document.createElement('tr');
        for (var j = 0; j < stolb; j++) {
            dvumerResh [i][j] = odnoResh[k]
            k++;  
            td = document.createElement('td');
            td.innerHTML = dvumerResh[i][j];
            tr.appendChild(td);
 
        }
        table3.appendChild(tr);
    }