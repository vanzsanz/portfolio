
let lamp = document.getElementById ("lamp");
let interruptor = false;

lamp.addEventListener("click", lig_des)

function lig_des() {
    if (!interruptor) {
        document.body.style.background = "radial-gradient(circle, white 8%, yellow 100%)"
        lamp.src="assets/lamp_on.png"
        lamp.alt="Lâmpada acesa"
        interruptor = true;

    } else {
        document.body.style.background = "radial-gradient(circle, white 8%, black 100%)"
        lamp.src="assets/lamp_off.png"
        lamp.alt="Lâmpada apagada"
        interruptor = false;
    }

}
