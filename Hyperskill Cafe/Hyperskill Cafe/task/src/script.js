
document.getElementById("reviewForm").addEventListener("submit", function(event){
    event.preventDefault();

    let reviewTitle = document.getElementById("reviewTitle");
    let reviewText =  document.getElementById("reviewText");
    let reviewName =  document.getElementById("reviewName");
    let reviewsRow =  document.getElementById("reviewsRow");

    let name = reviewName.value;
    if (name === "") {
        name = "Anonymous";
    }

    let text = `                    <div class="col-lg-4 col-md-6 py-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="card-title">${reviewTitle.value}</h4>
                                <blockquote class="blockquote,mb-0">
                                    <p>${reviewText.value}</p>
                                    <footer class="text-end,blockquote-footer"><i>${name}</i></footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>`;

    reviewsRow.innerHTML = reviewsRow.innerHTML + text;
});