function saveHeadline(id) {
    const title = document.querySelector(`#title-${id}`).innerHTML.trim();
    const summary = document.querySelector(`#summary-${id}`).innerHTML.trim();
    const url = document.querySelector(`#url-${id}`).getAttribute('href');
    const image = document.querySelector(`#img-${id}`).getAttribute('src');

    const article = { title, summary, url, image };

    fetch('/api/headlines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    }).then(() => {
        alert('Headline saved!');
    }).catch(err => {
        alert('Error saving headline.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to headline save buttons
    document.querySelectorAll('.save').forEach(btn => {

        btn.addEventListener('click', evt => {
            const headline = evt.target.attributes.headline;
            if (!headline) {
                return;
            }

            saveHeadline(headline.value);
        });
    });
});
