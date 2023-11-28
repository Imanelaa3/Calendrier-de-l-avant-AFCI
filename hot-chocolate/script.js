"use strict";
//content:
const h1 = document.createElement('h1');
h1.textContent = "Chocolat chaud de Noël 🍫";
document.body.append(h1);

const p6 = document.createElement('p');
p6.textContent = "La tradition de Noël consiste à boire un délicieux chocolat chaud. Je pense que c'est plutôt sympa ! Alors faisons-le avec vous ensemble. Vous n'avez besoin que de 3 ingrédients :)";
document.body.append(p6);

const h2 = document.createElement('h2');
h2.textContent = "INGRÉDIENTS:";
document.body.append(h2);

const li = document.createElement('li');
li.textContent = "70 g de chocolat noir (70% de cacao)";
document.body.append(li);

const li2 = document.createElement('li');
li2.textContent = "160 ml de lait";
document.body.append(li2);

const li3 = document.createElement('li');
li3.textContent = "1 cuillère à soupe de cassonade";
document.body.append(li3);

const li4 = document.createElement('li');
li4.textContent = "Une ou deux de vos garnitures préférées: crème fouettée, ou cannes de bonbon, ou guimauves, ou cannelle, ou plus de chocolat";
document.body.append(li4);

const h22 = document.createElement('h3');
h22.textContent = "PRÉPARATION:";
document.body.append(h22);

const p = document.createElement('p');
p.textContent = "1. Cassez le chocolat noir en carrés.";
document.body.append(p);

const p2 = document.createElement('p');
p2.textContent = "2. Versez le lait dans une casserole. Chauffer à feu doux. Lorsque le lait est chaud, ajoutez le chocolat et mélangez au fouet de cuisine. Cuire jusqu'à ce que le chocolat soit complètement dissous.";
document.body.append(p2);

const p3 = document.createElement('p');
p3.textContent = "3. Ajoutez le sucre, portez le lait à ébullition (ne faites pas bouillir !) et versez dans des tasses.";
document.body.append(p3);

const p4 = document.createElement('p');
p4.textContent = "4. Garnissez de vos garnitures de chocolat chaud préférées comme de la crème fouettée, des cannes de bonbon, des guimauves, de la cannelle ou encore du chocolat, bien sûr!";
document.body.append(p4);

const p5 = document.createElement('p');
p5.textContent = "En écoutant votre playlist préféré, prenez votre doux et confortable plaid et dégustez votre chocolat chaud. Sentez-vous l'atmosphère du Noël dans l'air ?";
document.body.append(p5);

document.body.style.background = "lightpink";

const img = document.createElement("img")
img.setAttribute("src", "christmas_hot_chocolat.jpg")

document.body.append(img)


img.style.display = "block"
img.style.width = "250px";
img.style.height = "300px";
img.style.marginLeft = "auto";
img.style.marginRight = "auto";
h1.style.color = "brown";
h1.style.textAlign = "center";
h2.style.textAlign = "center";
h22.style.textAlign = "center";

li.style.fontWeight = "bold";
li.style.textAlign = "center"
li2.style.fontWeight = "bold";
li2.style.textAlign = "center"
li3.style.fontWeight = "bold";
li3.style.textAlign = "center";
li4.style.fontWeight = "bold";
li4.style.textAlign = "center";

p.style.fontWeight = "bold";
p.style.textAlign = "center";
p2.style.fontWeight = "bold";
p2.style.textAlign = "center";
p3.style.fontWeight = "bold";
p3.style.textAlign = "center";
p4.style.fontWeight = "bold";
p4.style.textAlign = "center";
p5.style.fontWeight = "bold";
p5.style.color = "green";
p5.style.fontSize = "1.2em"
p5.style.textAlign = "center";
p6.style.fontWeight = "bold";
p6.style.color = "brown"
p6.style.textAlign = "center";
