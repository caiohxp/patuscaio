const blackCards = [
            "A vida deu-me limões, e eu fiz ___.", "Qual é o segredo para uma vida feliz? ___.", "Lamento, professora, mas ___ comeu o meu trabalho de casa.", "A nova política do governo para resolver a pobreza é ___.", "Durante o sexo, eu gosto de gritar '___!'", "O que o meu psicólogo me disse para eu parar de fazer? ___.", "O prémio da academia para ___ vai para... a tua mãe.", "O verdadeiro culpado pela crise climática é ___.", "O que é que cheira pior que queijo velho? ___.", "A Amazon vai começar a entregar ___ por drone.", "A minha paixão secreta é ___.", "O que é que se encontra no fundo da minha alma? ___."
        ];

        const whiteCards = [
            "Um anão zangado.", "Ansiedade de desempenho.", "O som do silêncio, mas com mais peidos.", "Apropriação cultural.", "Chorar no autocarro.", "O capitalismo tardio.", "Uma crise existencial na secção de cereais.", "Gentrificação.", "Fingir que se percebe de vinhos.", "O inevitável avanço da morte.", "Um golpe de estado.", "Privilégio branco.", "A monarquia a abanar o rabo.", "Um coach de vida desempregado.", "Bacon. A resposta é sempre bacon.", "Dizer 'você também' ao empregado do cinema.", "A minha total falta de vontade de viver.", "Um pombo a julgar as tuas escolhas de vida.", "Debates acesos sobre ananás na pizza.", "Opiniões não solicitadas sobre CrossFit.", "Aquele email que começa com 'Espero que este email o encontre bem'.", "Explicar memes a pessoas mais velhas.", "Um gato a planear a dominação mundial.", "Impostos.", "Não ter dinheiro para o psicólogo."
        ];
        
        let availableWhiteCards = [...whiteCards];
        let currentClickedCardElement = null; // Guarda a referência do elemento da carta clicada

        const startScreenEl = document.getElementById('start-screen');
        const gameAreaEl = document.getElementById('game-area');
        const handContainerEl = document.getElementById('hand-container');
        const showBlackCardBtn = document.getElementById('show-black-card-btn');
        const closeBlackCardBtn = document.getElementById('close-black-card-btn');
        const discardWhiteCardBtn = document.getElementById('discard-white-card-btn');
        
        const blackCardModal = document.getElementById('black-card-modal');
        const whiteCardModal = document.getElementById('white-card-modal');
        const blackCardModalText = document.getElementById('black-card-modal-text');
        const whiteCardModalText = document.getElementById('white-card-modal-text');

        function drawWhiteCard() {
            if (availableWhiteCards.length === 0) {
                availableWhiteCards = [...whiteCards]; 
            }
            const cardIndex = Math.floor(Math.random() * availableWhiteCards.length);
            return availableWhiteCards.splice(cardIndex, 1)[0];
        }

        function createWhiteCardElement(cardText) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card white-card';
            cardEl.innerText = cardText;
            
            cardEl.addEventListener('click', () => {
                currentClickedCardElement = cardEl; // Guarda o elemento clicado
                whiteCardModalText.innerText = cardText;
                whiteCardModal.classList.add('active');
            });
            return cardEl;
        }

        function dealHand() {
            handContainerEl.innerHTML = ''; 
            for (let i = 0; i < 7; i++) {
                const cardText = drawWhiteCard();
                const cardEl = createWhiteCardElement(cardText);
                handContainerEl.appendChild(cardEl);
            }
        }

        function startGame() {
            startScreenEl.style.display = 'none';
            gameAreaEl.style.display = 'flex';
            dealHand();
        }

        // --- Event Listeners ---
        startScreenEl.addEventListener('click', startGame);

        showBlackCardBtn.addEventListener('click', () => {
            const blackCardIndex = Math.floor(Math.random() * blackCards.length);
            const blackCardText = blackCards[blackCardIndex];
            blackCardModalText.innerHTML = blackCardText.replace('___', '<span style="color: var(--accent-color)">______</span>');
            blackCardModal.classList.add('active');
        });
        
        closeBlackCardBtn.addEventListener('click', () => {
            blackCardModal.classList.remove('active');
        });

        discardWhiteCardBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique se propague para o modal
            if (currentClickedCardElement) {
                // Remove a carta antiga
                handContainerEl.removeChild(currentClickedCardElement);

                // Adiciona uma carta nova
                const newCardText = drawWhiteCard();
                const newCardEl = createWhiteCardElement(newCardText);
                handContainerEl.appendChild(newCardEl);

                // Fecha o modal e limpa a referência
                whiteCardModal.classList.remove('active');
                currentClickedCardElement = null;
            }
        });

        // Clicar no modal da carta branca (fora do botão) apenas o fecha
        whiteCardModal.addEventListener('click', () => {
            whiteCardModal.classList.remove('active');
            currentClickedCardElement = null; // Limpa a referência
        });