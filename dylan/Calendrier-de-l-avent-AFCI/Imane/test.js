        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        const images = [];
        
        // Crée 10 images avec des positions aléatoires
        for (let i = 0; i < 10; i++) {
            const image = new Image();
            image.src = "../../images/cadeau-noel.png"; 
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            images.push({ image, x, y, width: 50, height: 50 });
        }

        // Dessine les images sur le canvas
        function drawImages() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const imageObj of images) {
                ctx.drawImage(imageObj.image, imageObj.x, imageObj.y, imageObj.width, imageObj.height);
            }
        }

        // Gère le clic sur le canvas pour faire disparaître les images
        canvas.addEventListener("click", (event) => {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            const mouseY = event.clientY - canvas.getBoundingClientRect().top;

            for (let i = images.length - 1; i >= 0; i--) {
                const imageObj = images[i];
                if (
                    mouseX >= imageObj.x &&
                    mouseX <= imageObj.x + imageObj.width &&
                    mouseY >= imageObj.y &&
                    mouseY <= imageObj.y + imageObj.height
                ) {
                    // L'image est cliquée, supprimez-la du tableau
                    images.splice(i, 1);
                }
            }

            // Redessine le canvas avec les images mises à jour
            drawImages();
        });

        // Anime les images en les déplaçant aléatoirement
        function animate() {
            for (const imageObj of images) {
                imageObj.x += Math.random() * 4 - 2;
                imageObj.y += Math.random() * 4 - 2;

                // Assurez-vous que les images restent dans les limites du canvas
                imageObj.x = Math.max(0, Math.min(canvas.width - imageObj.width, imageObj.x));
                imageObj.y = Math.max(0, Math.min(canvas.height - imageObj.height, imageObj.y));
            }

            drawImages();

            requestAnimationFrame(animate);
        }

        drawImages();
        animate();
