export default {
  methods: {
    makePrettyTitle(title) {
      // Ersten Teil des Titels (vor " - ") als Titel anzeigen (mit articel.prettyTitle[1]), zweiten Teile (Name der Source) mit articel.prettyTitle[2]
      let prettyTitle = title.match(/(.*)\s-\s(.*)/)

      return prettyTitle;
    },
    makeSlug(prettyTitle) {
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
    },
    makePrettyDate(publishedAt) {
      // Datumformat der Response ersetzen durch eigenes DE
      let prettyDate = publishedAt.replace(/T.*/,'').split('-').reverse().join('.');

      return prettyDate;
    }
  }
};