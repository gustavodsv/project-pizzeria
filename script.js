let cart = [];
let modalQt = 1;
let modalKey = 0;

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
        modalKey = key;
        
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
        qS('.pizzaWindowArea').style.display = 'flex'
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

// adicionar ao carrinho
qS('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(qS('.pizzaInfo--size.selected').getAttribute('data-key'))
    
    let identifier = 'pizza: '+pizzaJson[modalKey].id+' tamanho: '+size

    let key = cart.findIndex((item)=>{
        return item.identifier == identifier
    })

    if(key > -1){
        cart[key].qt += modalQt
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size:size,
            qt:modalQt
        })
    }
    updateCart()
    closeModal()
})

function updateCart(){
    if(cart.length > 0){
        qS('aside').classList.add('show')
        qS('.cart').innerHTML = ''
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id)
            let cartItem = qS('.models .cart--item').cloneNode(true)

            let pizzaSizeName
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P'
                    break
                case 1:
                    pizzaSizeName = 'M'
                    break
                case 2:
                    pizzaSizeName = 'G'
                    break
            }


            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            qS('.cart').append(cartItem)


        }
    } else {
        qS('aside').classList.remove('show')
    }
}