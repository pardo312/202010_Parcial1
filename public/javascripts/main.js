let socket = io.connect("http://localhost:3000", { "forceNew": true });

let participantes = [];

socket.on("offers", data => {
    participantes.forEach(element => element.oferta = data.oferta);
    render();
    
});



function render() {
    let PB = Math.floor(Math.random() * (0.8 - 0.3) ) + 0.3;
    let PO = Math.floor(Math.random() * (0.8 - 0.3) ) + 0.3;
    let html = participantes.map((e, i) => {
        return (`
            <div>
                <p>${e.razonsocial}</p>
                <p>${e.oferta}</p>
            </div>
        `);
    }).join(" ");
    if(PO>PB)
    {
html.concat(`
<div>
    <p>${e.razonsocial}</p>
    <p>Oferta Aceptada valor: <strong>${e.oferta}</strong></p>
    
</div>
`)
    }
    
    document.getElementById("listaOfertas").innerHTML = html;
    

    
}

function addUser() {
    let participante = {
        nit: document.getElementById("nit").value,
        razonsocial: document.getElementById("razonsocial").value
    };
  
    socket.emit("new-user", participante);
    document.getElementById("inscripcion").style.display = 'none'; 
    document.getElementById("oferta").style.display = '';

    return false;
}
function addOferta() {
    let offer = {
        oferta: document.getElementById("offer").value
    };


    console.log("New Offer");
    socket.emit("new-offer", offer);

    return false;
}
