const tagsEl = document.getElementById('tags');
const textArea = document.getElementById('textarea');
const rollBtn = document.getElementById('roll-btn');
const ldBoard = document.querySelector('.leaderboard table');

ldBoard.innerHTML = `
                <tr>
                    <th>ROLL</th>
                    <th>WINNER</th>
                </tr>
`;

var ldBoardCount = 0;

textArea.focus();

textArea.addEventListener('keyup', (e) => {
    textArea.value.trim();
    if (textArea.value === '') {
        clearLeaderBoard();
    }

    createTags(e.target.value);
    if (e.key === 'Enter') {
        randomChoice();
    }
});
rollBtn.addEventListener('click', (e) => {
    randomChoice();
    rollBtn.disabled = true;
});

function createTags(input) {
    const tagList = input
        .split(',')
        .filter((tag) => tag.trim() !== '')
        .map((tag) => tag.trim());

    tagsEl.innerHTML = '';

    tagList.forEach((tag) => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

function randomChoice() {
    const times = 30;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();
        highlightTag(randomTag);
        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        const tags = document.querySelectorAll('.tag');
        tags.forEach((tag) => {
            tag.classList.remove('highlight');
        });
        setTimeout(() => {
            const randomTag = pickRandomTag();
            addLeaderBoard(randomTag);
            highlightTag(randomTag);
            rollBtn.disabled = false;
        }, 100);
    }, times * 100);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight');
}

function addLeaderBoard(tag) {
    ldBoardCount++;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${ldBoardCount}</td>
        <td>${tag.innerText}</td>
    `;
    ldBoard.appendChild(row);
}

function clearLeaderBoard() {
    ldBoardCount = 0;
    ldBoard.innerHTML = `
    <tr>
        <th>ROLL</th>
        <th>WINNER</th>
    </tr>
`;
}
