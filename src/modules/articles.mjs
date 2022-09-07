import axios from "axios";

// REQUEST HELPERS
// To formulate request
function modifyDateForApiRequest(date) {
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

function getPreviousDate(oldDate) {
    const previousDate = new Date(oldDate.getTime());
    previousDate.setDate(oldDate.getDate() - 1);
    return previousDate;
}

function createApiRequest(newsDesk, page = 0) {
    if (newsDesk === '') {
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;
    }
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${newsDesk}")&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;
}

// To process response

function modifyArticlesForDisplay(articles) {
    let articlesForDisplay = [];

    articles.forEach(element => {
        const article = {
            abstract: element.abstract,
            byline: element.byline.original,
            // category: this.category,
            content: element.lead_paragraph,
            headline: element.headline.main,
            newsDesk: element.news_desk,
            pubDate: makePrettyDate(element.pub_date),
            slug: makeSlug(element.headline.main),
            source: element.source,
            subCategory: element.subsection_name,
            url: element.web_url,
            wordCount: element.word_count
        };

        article.image = element.multimedia.length ? `https://www.nytimes.com/${element.multimedia[0].url}` : '';

        articlesForDisplay.push(article);
    });

    return articlesForDisplay;
}

function makeSlug(prettyTitle) {
    // Create slug from article.prettyTitle[1]
    // Remove any whitespace at beginning or end
    let slug = prettyTitle.replace(/^\s+|\s+$/g, '');

    // Convert to lower case
    slug = slug.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = ['ä', 'ö', 'ü', 'ß'];
    let to   = ['ae', 'oe', 'ue', 'ss'];

    for (let key in from) {
      slug = slug.replace(new RegExp(from[key], 'g'), to[key]);
    }

    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return slug
}

function makePrettyDate(date) {
    // Datumformat der Response ersetzen durch eigenes DE
    let dateForDisplay = date.replace(/T.*/,'').split('-').reverse().join('.');

    return dateForDisplay;
}

// REQUEST

async function getArticles(url) {
    const res = await axios.get(url);
    const { docs, meta } = res.data.response;
    return { docs, meta };
}

export { modifyDateForApiRequest, getPreviousDate, createApiRequest, modifyArticlesForDisplay, makePrettyDate, getArticles };