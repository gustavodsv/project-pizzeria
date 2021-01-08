// funções, atalhos para querySelector
const qS = (el)=>document.querySelector(el);
const qSA = (el)=>document.querySelectorAll(el);


pizzaJson.map((item, index)=>{
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    qS('.pizza-area').append(pizzaItem); 
});














// cloneNode(true) = clona itens selecionados
// append(itemNome) = adiciona
// toFixed(2) = 2 itens apos a virgula