function deleteHeadline(id) {
    const card = document.getElementById(id);
    if (!card) {
        return;
    }

    fetch(`/api/headlines/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            card.remove();
            alert('Headline deleted!');
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert('Error deleting headline. Try again.');
        });
}

function addComment(id) {
    const input = prompt('Enter a comment:');
    if (!input) {
        return;
    }

    const comment = input.trim();
    if (comment === '') {
        return;
    }

    fetch(`/api/headlines/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({message: comment})
    }).then(() => {
        window.location.reload();
    }).catch(err => {
        console.log(err);
        alert('Error adding comment. Try again.')
    });
}

function deleteComment(id) {

    fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    }).then(() => {
        window.location.reload();
    }).catch(err => {
        console.log(err);
        alert('Error deleting comment. Try again.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to headline save buttons
    document.querySelectorAll('.delete').forEach(icon => {
        icon.addEventListener('click', evt => {
            const headline = evt.target.attributes.headline;
            if (!headline) {
                return;
            }

            deleteHeadline(headline.value);
        });
    });

    document.querySelectorAll('.add-comment').forEach(icon => {
        icon.addEventListener('click', evt => {
            const headline = evt.target.attributes.headline;
            if (!headline) {
                return;
            }

            addComment(headline.value);
        });
    });

    document.querySelectorAll('.delete-comment').forEach(icon => {
        icon.addEventListener('click', evt => {
            const headline = evt.target.attributes.headline;
            if (!headline) {
                return;
            }

            deleteComment(headline.value);
        });
    });
});
