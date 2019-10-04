function deleteHeadline(id) {

    const card = document.getElementById(id);
    if (!card) {
        return;
    }

    fetch(`/api/headlines/${id}`, {
        method: 'DELETE'
    }).then(() => {
        card.remove();
        alert('Headline deleted!');
        window.location.reload();
    }).catch(err => {
        alert('Error deleting headline. Try again.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to headline save buttons
    document.querySelectorAll('.delete').forEach(btn => {

        btn.addEventListener('click', evt => {
            const headline = evt.target.attributes.headline;
            if (!headline) {
                return;
            }

            deleteHeadline(headline.value);
        });
    });
});
