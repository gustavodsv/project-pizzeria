let modalQt = 1;

// funções, atalhos para querySelector
const qS = (el)=>document.querySelector(el);
const qSA = (el)=>document.querySelectorAll(el);

// listagem das pizzas
pizzaJson.map((item, index)=>{
    let pizzaItem = qS('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index); // gerando chave-pizzas
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.',',')}`
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        // adicionando chave às pizzas
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        
        // adicionando informações
        qS('.pizzaBig img').src = pizzaJson[key].img; //img
        qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name; //name
        qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description; //description
        qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace('.',',')}`; //price
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        qSA('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');//selected GRANDE
            } 
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];//size
        });
        
        //quantidade
        qS('.pizzaInfo--qt').innerHTML = modalQt;

        // abrindo janela+animação
        qS('.pizzaWindowArea').style.opacity = 0;
        qS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            qS('.pizzaWindowArea').style.opacity = 1;
        },200); // 1s = 1/5
        
    });
    
    qS('.pizza-area').append(pizzaItem);
});

// Eventos do MODAL
function closeModal(){
    qS('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=>{
        qS('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

// fechar MODAL
qSA('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal)
})

// Modal qt
qS('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--
        qS('.pizzaInfo--qt').innerHTML = modalQt
    }
})
qS('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++
    qS('.pizzaInfo--qt').innerHTML = modalQt
})

qSA('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        qS('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})