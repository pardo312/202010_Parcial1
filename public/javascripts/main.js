let socket = io.connect("http://localhost:3000", { "forceNew": true });

let nitActual = 0;
let razonsocialActual = '';
let ofertaActual = 0;
let ofertaMax = 0;
let primeraOferta = true;
let estadoActual = "Oferta no aceptada";

socket.on("offers", data => {   
    data.forEach(element =>{
        if(element.offer>ofertaMax )
        {
            ofertaMax = element.offer;
        }
    } );
    render(data);
});

function render(data) {
    let html = data.map((e, i) => {
        if(data.length != 0)
        {         
            primeraOferta = false;
            if(e.estado === "Oferta Aceptada")
            {
                document.getElementById("inscripcion").style.display = 'none';
                document.getElementById("oferta").style.display = 'none';
                document.getElementById("reiniciar").style.display = ''; 
                return (`
                <div>
                    <p>${e.razonsocial} <strong>[ ${e.estado}. Valor: $${e.offer} ] </strong> </p>
                    <p></p>
                </div>
            `);
            }
            else{
                return (`
                <div>
                    <p>${e.razonsocial} [ ${e.estado} ] </p>
                    <p></p>
                </div>
            `);
            }
        }
         
    }).join(" ");
    document.getElementById("listaOfertas").innerHTML = html;
}
function reiniciar()
{
    socket.emit("reinicio");
    
    return true;
}
socket.on("reiniciar", data => {   
    document.getElementById("inscripcion").style.display = '';
    document.getElementById("oferta").style.display = 'none';
    document.getElementById("reiniciar").style.display = 'none';
    document.getElementById("listaOfertas").innerHTML = "";
    ofertaMax = 0;
    estadoActual =  "Oferta no aceptada";
});
function addUser() {
    nitActual = document.getElementById("nit").value;
    razonsocialActual =  document.getElementById("razonsocial").value;
 
    document.getElementById("inscripcion").style.display = 'none';
    document.getElementById("oferta").style.display = '';
    return false;
}

function addOffer() {
    let PB = (Math.floor((Math.random() * 80) + 30)) / 100;
    let PO = (Math.floor((Math.random() * 80) + 30)) / 100; 
    console.log(PO+ " hi "+ PB)
    if (PO>PB) {
        estadoActual = "Oferta Aceptada"

    }
    let valorMas = ((Math.floor(Math.random() * 10000000) + 5000000));
    let participante = {};
    if(!primeraOferta)
    {
        participante= {
            nit: document.getElementById("nit").value,
            razonsocial: document.getElementById("razonsocial").value,
            offer: ofertaMax + valorMas,
            estado: estadoActual
        }
       
    }
    else{
        participante= {
            nit: document.getElementById("nit").value,
            razonsocial: document.getElementById("razonsocial").value,
            offer: 1500000000,
            estado: estadoActual
        }
    }
    
    if(estadoActual ===  "Oferta no aceptada")
    { 
        document.getElementById("oferta").setAttribute('disabled', 'disabled');
        alert("Realizaste una oferta de: $"+participante.offer+ ".Lastimosamente no fue aceptada.Espere 30 segundos para volver a ofertar.");
        setTimeout(function()
        {
            document.getElementById("oferta").removeAttribute('disabled'); 
        },30000 );
        
    }
    else
    {
        alert("GANASTE!! Tu oferta fue de:$"+participante.offer+".")
    }
    socket.emit("new-offer", participante);
   

    return false;
}
