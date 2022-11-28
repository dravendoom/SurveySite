let dom = document;
let navDiv = dom.createElement("div");

insertBootstrap();

function insertBootstrap(){
    let bootstrapLink = document.createElement("link");
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css";
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.integrity = "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi";
    bootstrapLink.crossOrigin = "anonymous";

    dom.head.appendChild(bootstrapLink);
}

function insertNavigationBar(isAuthComplete){

    /* model
    * <div class="navbar navbar-expand-lg bg-light"><div id="navbarParentDiv" class="container-fluid d-flex justify-content-start ms-1">
            <div id="navbarBrandingSectionDiv" class="navbar-brand">
                <a class="navbar-brand" href="index.html">
                    SurveySite
                </a>
            </div>
            <div id="navbarItemsSectionDiv" class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="index.html">
                    Home
                </a>
                <a class="nav-link" href="survey_feed.html">
                    Surveys
                </a><a class="nav-link" href="survey_library.html">
                    My Library
                </a>
                <a class="nav-link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                    Analytics
                </a>
            </div>
            <div id="navbarAccountSectionDiv" class="navbar-nav ms-auto me-1">
                <a class="nav-link" href="login.html">
                    Login
                </a>
                <a class="nav-link" href="sign_up.html">
                    Sign-Up
                </a>
            </div>
        </div></div>
    * */

    navDiv.classList.add("navbar");
    navDiv.classList.add("navbar-expand-lg");
    navDiv.classList.add("bg-light");

    let hiddenString;

    if(isAuthComplete !== null) hiddenString = isAuthComplete ? "" : "hidden";
    else hiddenString = "";

    let navbarParentDiv = dom.createElement("div");
    navbarParentDiv.id = "navbarParentDiv";
    navbarParentDiv.classList.add("container-fluid");
    navbarParentDiv.classList.add("d-flex");
    navbarParentDiv.classList.add("justify-content-start");
    navbarParentDiv.classList.add("ms-1");

    let navbarBrandingSectionDiv = dom.createElement("div");
    navbarBrandingSectionDiv.id = "navbarBrandingSectionDiv";
    navbarBrandingSectionDiv.classList.add("navbar-brand");

    let navbarBrandLink = dom.createElement("a");
    navbarBrandLink.classList.add("ms-1");
    navbarBrandLink.href = "index.html";

    let navbarHomeLink = dom.createElement("a");
    navbarHomeLink.classList.add("ms-1");
    navbarHomeLink.href = "index.html";

    let navbarSurveysLink = dom.createElement("a");
    navbarSurveysLink.classList.add("ms-1");
    navbarSurveysLink.href = "survey_feed.html";

    let navbarLibraryLink = dom.createElement("a");
    navbarLibraryLink.classList.add("ms-1");
    navbarLibraryLink.href = "survey_library.html";

    let navbarAnalyticsLink = dom.createElement("a");
    navbarAnalyticsLink.classList.add("ms-1");
    navbarAnalyticsLink.href = "index.html";

    let navbarLoginLink = dom.createElement("a");
    navbarLoginLink.classList.add("ms-1");
    navbarLoginLink.href = "login.html";

    let navbarSignupLink = dom.createElement("a");
    navbarSignupLink.classList.add("ms-1");
    navbarSignupLink.href = "sign_up.html";

    navbarParentDiv.appendChild(navbarBrandingSectionDiv);
    navDiv.appendChild(navbarParentDiv);

    dom.body.appendChild(navDiv);
}

function authNavigationBar(){
    insertNavigationBar(true);
}

function noAuthNavigationBar(){
    insertNavigationBar(false);
}