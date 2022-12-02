let dom = document;

insertBootstrap();
if(getAuthCookies().status === "AUTH_SET") {
    insertUserNavigationBar();
} else {
    insertGuestNavigationBar();
}

function insertBootstrap(){
    let bootstrapLink = document.createElement("link");
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.integrity = "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi";
    bootstrapLink.crossOrigin = "anonymous";

    dom.head.appendChild(bootstrapLink);
}

function insertGuestNavigationBar(){
    let navDiv = dom.createElement("div");
    navDiv.classList.add("navbar");
    navDiv.classList.add("navbar-expand-lg");
    navDiv.classList.add("bg-light");

    let navInnerHTML = "<div id=\"navbarParentDiv\" class=\"container-fluid d-flex justify-content-start ms-1\">\n" +
        "            <div id=\"navbarBrandingSectionDiv\" class=\"navbar-brand\">\n" +
        "                <a class=\"navbar-brand\" href=\"index.html\">\n" +
        "                    SurveySite\n" +
        "                </a>\n" +
        "            </div>\n" +
        "            <div id=\"navbarItemsSectionDiv\" class=\"navbar-nav\">\n" +
        "                <a class=\"nav-link active\" aria-current=\"page\" href=\"index.html\">\n" +
        "                    Home\n" +
        "                </a>\n" +
        "                <a class=\"nav-link\" href=\"survey_feed.html\">\n" +
        "                    Surveys\n" +
        "                </a>\n" +
        "            </div>\n" +
        "            <div id=\"navbarAccountSectionDiv\" class=\"navbar-nav ms-auto me-1\">\n" +
        "                <a class=\"nav-link\" href=\"login.html\">\n" +
        "                    Login\n" +
        "                </a>\n" +
        "                <a class=\"nav-link\" href=\"sign_up.html\">\n" +
        "                    Sign-Up\n" +
        "                </a>\n" +
        "            </div>\n" +
        "        </div>";

    navDiv.innerHTML = navInnerHTML;

    dom.body.appendChild(navDiv);
}

function insertUserNavigationBar(){
    let navDiv = dom.createElement("div");
    navDiv.classList.add("navbar");
    navDiv.classList.add("navbar-expand-lg");
    navDiv.classList.add("bg-light");

    let navInnerHTML = "<div id=\"navbarParentDiv\" class=\"container-fluid d-flex justify-content-start ms-1\">\n" +
        "            <div id=\"navbarBrandingSectionDiv\" class=\"navbar-brand\">\n" +
        "                <a class=\"navbar-brand\" href=\"index.html\">\n" +
        "                    SurveySite\n" +
        "                </a>\n" +
        "            </div>\n" +
        "            <div id=\"navbarItemsSectionDiv\" class=\"navbar-nav\">\n" +
        "                <a class=\"nav-link active\" aria-current=\"page\" href=\"index.html\">\n" +
        "                    Home\n" +
        "                </a>\n" +
        "                <a class=\"nav-link\" href=\"survey_feed.html\">\n" +
        "                    Surveys\n" +
        "                </a>\n" +
        "                <a class=\"nav-link\" href=\"survey_library.html\">\n" +
        "                    Library\n" +
        "                </a>\n" +
        "                <a class=\"nav-link\" href=\"survey_library.html\">\n" +
        "                    Analytics\n" +
        "                </a>\n" +
        "            </div>\n" +
        "            <div id=\"navbarAccountSectionDiv\" class=\"navbar-nav ms-auto me-1\">\n" +
        "                <a class=\"nav-link\" href=\"login.html\">\n" +
        "                    "+getAuthCookies().userName+"\n" +
        "                </a>\n" +
        "                <button onclick='logout()'>" +
        "                    <a class=\"nav-link\">\n" +
        "                        Logout\n" +
        "                    </a>" +
        "                </button>" +
        "            </div>\n" +
        "        </div>";

    navDiv.innerHTML = navInnerHTML;

    dom.body.appendChild(navDiv);
}