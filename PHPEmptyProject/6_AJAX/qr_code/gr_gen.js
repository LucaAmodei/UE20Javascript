document.getElementById("butt_gen").addEventListener("click", () => {
    const url = encodeURI(document.getElementById("url").value);
    const psize = document.getElementById("psize").value;

    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${psize}x${psize}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la réponse de la requete")
            }

            return response.blob()
        })
        .then(blob => {
            const qrCodeUrl = URL.createObjectURL(blob);

            const screen = document.getElementById("screen")
            screen.innerHTML = '';

            const img = document.createElement('images');
            img.src = qrCodeUrl
            screen.appendChild(img)
        })
        .catch(error => {
            console.log(`Erreur : ${error.message}`)
        });
});
