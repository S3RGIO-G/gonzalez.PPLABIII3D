
const arrayDatos = LeerStorage('anuncios');

window.addEventListener('load', crearCards(arrayDatos));

function crearCards(dataArray) {

    if (dataArray.length == 0) return null;

    const divCards = document.createElement('div');
    divCards.classList.add('contenedorDivs');
    const tituloPrincipal = document.createElement('h1');
    tituloPrincipal.textContent = "Autos en Venta y Alquiler";

    divCards.appendChild(tituloPrincipal);

    dataArray.forEach(element => {
        const divCardItem = document.createElement('div');
        divCardItem.classList.add('divCard');
        const divIcons = document.createElement('div');
        divIcons.classList.add('divIcons');

        for (const key in element) {
            switch (key) {
                case 'titulo':
                    const titulo = document.createElement('h3');                    
                    titulo.textContent = element[key];
                    divCardItem.appendChild(titulo);
                    break;
                case 'transaccion':
                    const transaccion = document.createElement('b');
                    transaccion.textContent = element[key];
                    divCardItem.appendChild(transaccion);
                    break;
                case 'descripcion':
                    const descripcion = document.createElement('p');
                    descripcion.textContent = element[key];
                    divCardItem.appendChild(descripcion);
                    break;
                case 'precio':
                    const precio = document.createElement('b');
                    precio.textContent = element[key];
                    divCardItem.appendChild(precio);
                    break;
                case 'puertas':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
                case 'kilometros':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
                case 'potencia':
                    divIcons.appendChild(crearDivIcono(element, key));
                    break;
            }
        }

        divCardItem.appendChild(divIcons);
        const button = document.createElement('button');
        button.textContent = "Ver vehiculo";
        divCardItem.appendChild(button);
        divCards.appendChild(divCardItem);
    });

    document.querySelector('section').appendChild(divCards);
}

function crearDivIcono(element, key) {
    const divIcono = document.createElement('div');
    const icono = document.createElement('i');

    if(key == "puertas"){          
        icono.classList.add('fa-sharp');
        icono.classList.add('fa-solid');
        icono.classList.add('fa-door-open');
    }else if( key == "kilometros"){
        icono.classList.add('fa-solid');
        icono.classList.add('fa-gauge-simple-high');
    }else if( key == "potencia"){
        icono.classList.add('fab');
        icono.classList.add('fa-searchengin');
    }

    const text = document.createElement('b');
    text.textContent = element[key];
    divIcono.appendChild(icono);
    divIcono.appendChild(text);

    return divIcono;
}

// function crearUnaCard
























//#region STORAGE
function LeerStorage(nameData) {
    let data = JSON.parse(localStorage.getItem(nameData));

    if (!Array.isArray(data)) data = [];

    return data;
}

function GuardarStorage(nameData, data) {
    localStorage.setItem(nameData, JSON.stringify(data));
}


  //#endregion 