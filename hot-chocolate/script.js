"use strict";
//content:
const h1 = document.createElement('h1');
h1.textContent = "Christmas Hot Chocolat 🍫";
document.body.append(h1);

const p6 = document.createElement('p');
p6.textContent = "Christmas tradition is drinking delicious hot chocolate. I think, it's pretty nice! So let's do it with you together. You need just 3 ingredients and good mood :)";
document.body.append(p6);

const h2 = document.createElement('h2');
h2.textContent = "Ingredients:";
document.body.append(h2);

const li = document.createElement('li');
li.textContent = "70 g dark chocolate (70% cocoa)";
document.body.append(li);

const li2 = document.createElement('li');
li2.textContent = "160 ml milk";
document.body.append(li2);

const li3 = document.createElement('li');
li3.textContent = "1 tbsp. brown sugar";
document.body.append(li3);

const li4 = document.createElement('li');
li4.textContent = "One or two of your favorite topping(s): whipped cream, or candy canes, or marshmellows, or cinnamon, or more chocolate";
document.body.append(li4);

const h22 = document.createElement('h3');
h22.textContent = "How to make it:";
document.body.append(h22);

const p = document.createElement('p');
p.textContent = "1. Break the chocolate into small pieces.";
document.body.append(p);

const p2 = document.createElement('p');
p2.textContent = "2. Pour the milk into a saucepan.  Heat over low heat.  When the milk is hot, add the chocolate and mix with kitchen whisk.  Cook until the chocolate is completely dissolved.";
document.body.append(p2);

const p3 = document.createElement('p');
p3.textContent = "3. Add sugar, bring milk to a near boil (don't boil!) And pour into warmed cups.";
document.body.append(p3);

const p4 = document.createElement('p');
p4.textContent = "4. Top with your favorite hot chocolate toppings like whipped cream, or candy canes, or marshmellows, or cinnamon, or more chocolate, of course!";
document.body.append(p4);

const p5 = document.createElement('p');
p5.textContent = "On your favorite Christmas playlist, take your soft cozy plaid and enjoy your hot chocolate. Do you feel that Christmas vibes in the air?";
document.body.append(p5);

document.body.style.background = "lightpink";
//document.body.style.backgroundImage = "url('santapng.png')";

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
