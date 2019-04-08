jQuery(document).ready(function($) {


    /*======= Skillset *=======*/
    
    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);
            
        });

    });
    
    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
    
    
    /* jQuery RSS - https://github.com/sdepold/jquery-rss */
    
    $("#rss-feeds").rss(
        "https://feeds.feedburner.com/TechCrunch/startups",
        
        {

            limit: 3,
            effect: 'slideFastSynced',
            ssl: true,
            layoutTemplate: "<div class='items'>{entries}</div>",
            entryTemplate: '<div class="item"><h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'
       
        }
    );

    new GitHubCalendar("#github-graph", "weslles");

});

async function getUser(){
    const response = await fetch('https://api.github.com/users/weslles/repos');
    const repos = await response.json();
    return {repos};
}

getUser().then((data) => {
    renderTemplate(data.repos);
});

function renderTemplate(gitHubRepos){
    let template = '';
    gitHubRepos = gitHubRepos.slice(1,4).concat(gitHubRepos.slice(6));
    gitHubRepos.forEach((element,index) => {
        template += `<div class="item">
        <h3 class="title"><a href="${element.html_url}" target="_blank">${element.name}</a></h3>
        <p class="summary">Linguagem: ${element.language}</p>
    </div>`;
    console.log(index);
    });
    document.getElementById('otherProjects').innerHTML = template;
}