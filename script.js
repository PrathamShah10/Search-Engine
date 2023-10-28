let trie = new Trie();
let fileContent = [];

function loadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const lines = e.target.result.split('\n');
            fileContent = lines.flatMap(line => line.split(' ').map(word => word.trim()));
            buildTrie();
        };
        reader.readAsText(file);
    }
}

function buildTrie() {
    trie = new Trie();
    fileContent.forEach(word => trie.insert(word.toLowerCase()));
}

function search() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase();

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (query.length === 0) {
        return;
    }

    const results = trie.autoComplete(query);
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.textContent = result;
        searchResults.appendChild(resultItem);
    });
    trie.search(query);
}
