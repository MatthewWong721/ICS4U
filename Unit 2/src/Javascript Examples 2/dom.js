let itemLister = document.querySelector('#header-title span');
itemLister.style.display='inline-block';

function addListItem(){
    let list = document.querySelector('#items')
    let newItem=document.createElement('li');
    newItem.classList.add('list-group-item');
    let text = document.querySelector('#newItem').value;
    let textNode = document.createTextNode(text.value);
    text.value='';
    newItem.appendChild(textNode);
    list.appendChild(newItem)
    itemList.prepend(newItem);
}

let itemList=[];
