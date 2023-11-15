document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("greetingCanvas");
    const context = canvas.getContext("2d");

    const backgroundMusic = document.getElementById("backgroundMusic");

    const languages = [
        { lang: "fr", word: "Joyeux Noël" },
        { lang: "es", word: "¡Feliz Navidad!" },
        { lang: "ja", word: "メリークリスマス(Merī Kurisumasu)" },
        { lang: "ru", word: "С Рождеством (S Rozhdestvom) " },
        { lang: "en", word: "Merry Christmas" },
        { lang: "ar", word: " عيد ميلاد مجيد (Eid Milad Majeed)" },
        { lang: "ko", word: "메리 크리스마스  (meli keuliseumaseu)" },
        { lang: "th", word: "สุขสันต์วันคริสต์มาส (S̄uk̄hs̄ạnt̒ wạn khris̄t̒mās̄)" },
        { lang: "ch", word: "圣诞快乐(Shèngdàn kuàilè)" },
        { lang: "fi", word: "Hyvää Joulua" },
        { lang: "da", word: "Glædelig Jul" },
        { lang: "de", word: "Frohe Weihnachten" },
        { lang: "it", word: "Buon Natale" },
        { lang: "nl", word: "Vrolijk kerstfeest" },
        { lang: "pt", word: "Feliz Natal" },
        { lang: "sv", word: "God Jul" },
        { lang: "no", word: "God Jul" },
        { lang: "pl", word: "Wesołych Świąt" },
        { lang: "hu", word: "Boldog Karácsonyt" },
        { lang: "tr", word: "Mutlu Noeller" },
        { lang: "el", word: "Καλά Χριστούγεννα (Kalá Christoúgenna)" },
        { lang: "he", word: "חג מולד שמח (Chag Molad Sameach)" },
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function resizeCanvas () {
        canvas.width = Math.min(window.innerWidth, 800);  
        canvas.height = Math.min(window.innerHeight, 600);
    }
    function playBackgroundMusic() {
        backgroundMusic.play();
        document.removeEventListener("click", playBackgroundMusic);
    }
    document.addEventListener("click", playBackgroundMusic);
    
    document.addEventListener("click", playBackgroundMusic);

    window.addEventListener("resize", resizeCanvas);


    function drawFirework(x, y, size) {
        const particles = [];

        function Particle() {
            this.x = x;
            this.y = y;
            this.size = size * (Math.random() * 3 + 1);
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
        }

        Particle.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size -= 0.2;
        };

        Particle.prototype.draw = function () {
            context.fillStyle = "silver";
            context.strokeStyle = "silver";
            context.lineWidth = 10;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.stroke();
        };

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].size <= 0.2) {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }

        function animateFirework() {
            const fireworkInterval = setInterval(() => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                animateParticles();

                if (particles.length === 0) {
                    clearInterval(fireworkInterval);
                }
            }, 30);
        }

        animateFirework();
    }

    function animateWord(language, index) {
        const wordWidth = 150;
        const wordHeight = 30;

        const randomX = Math.random() * (canvas.width - wordWidth);
        const randomY = Math.random() * (canvas.height - wordHeight);

        const wordElement = document.createElement('div');
        wordElement.className = 'word';
        wordElement.style.position = 'absolute';
        wordElement.style.left = randomX + 'px';
        wordElement.style.top = randomY + 'px';
        wordElement.textContent = language.word;

        document.body.appendChild(wordElement);

        drawFirework(randomX + wordWidth / 2, randomY + wordHeight / 2, 2);
    }

    function animateWords() {
        shuffle(languages);

        languages.forEach((language, index) => {
            setTimeout(() => {
                animateWord(language, index);
            }, index * 1000);
        });
    }

    function init() {
        document.addEventListener("click", function () {
            backgroundMusic.play();
            animateWords();
        });
    }

    init();
});
