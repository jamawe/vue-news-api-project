const menu = [
    {
        heading: 'News',
        categories: [
            {
                name: 'Home',
                toRouteName: 'HomePage',
                params: {
                    category: '',
                    isSection: false,
                },
            },
            {
                name: 'Business',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'business',
                    isSection: false,
                },
            },
            {
                name: 'Express',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'express',
                    isSection: false,
                },
            },
            {
                name: 'Foreign',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'foreign',
                    isSection: false,
                },
            },
            
            // {
            //     name: 'Obitiuaries',
            //     toRouteName: 'CategoryPage',
            //     params: {
            //         category: 'obitiuaries',
            //         isSection: true,
            //     },
            // },
            {
                name: 'Politics',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'politics',
                    isSection: false,
                },
            }
            ,
            {
                name: 'Science',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'science',
                    isSection: false,
                },
            }
            ,
            {
                name: 'Sports',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'sports',
                    isSection: false,
                },
            },
            {
                name: 'Technology',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'technology',
                    isSection: true,
                },
            },
            {
                name: 'U.S.',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'u.s.',
                    isSection: false, // maybe
                },
            },
            {
                name: 'World',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'world',
                    isSection: false,
                },
            }

        ]
    },

    {
        heading: 'Arts',
        categories: [
            {
                name: 'Arts',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'arts',
                    isSection: false, // maybe
                },
            },
            {
                name: 'Books',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'books',
                    isSection: false,
                },
            },
            {
                name: 'Culture',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'culture',
                    isSection: false,
                },
            },
            {
                name: 'Magazine',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'magazine',
                    isSection: false,
                },
            },
            {
                name: 'Movies',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'movies',
                    isSection: true,
                },
            },
            {
                name: 'Television',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'television',
                    isSection: true,
                },
            },
            {
                name: 'Weekend',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'weekend',
                    isSection: false,
                },
            },

        ]
    },

    {
        heading: 'Living',
        categories: [
            {
                name: 'Games',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'games',
                    isSection: false, // maybe
                },
            },
            {
                name: 'Education',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'education',
                    isSection: true,
                },
            },
            {
                name: 'Food',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'food',
                    isSection: false, // maybe
                },
            },
            {
                name: 'Health',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'health',
                    isSection: false, // maybe
                },
            },
            {
                name: 'Learning',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'learning',
                    isSection: false,
                },
            },
            {
                name: 'Parenting',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'parenting',
                    isSection: true,
                },
            },
            {
                name: 'Style',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'style',
                    isSection: false, // maybe
                },
            },
            {
                name: 'Travel',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'travel',
                    isSection: false,
                },
            }
        ]
    }
];

const newsDesks = [
    'Arts',
    'Books',
    'Business',
    'Culture',
    'Education',
    'Express',
    'Food',
    'Foreign',
    'Games',
    'Health',
    'Learning',
    'Magazine',
    'Movies',
    'Parenting',
    'Politics',
    'Science',
    'Sports',
    'Style',
    'Technology',
    'Television',
    'Travel',
    'U.S.',
    'Weekend',
    'World'

];

const newsDesksForNotFound = [
    {
        name: 'Arts',
        slug: 'arts',
    },
    {
        name: 'Books',
        slug: 'books',
    },
    {
        name: 'Business',
        slug: 'business',
    },
    {
        name: 'Culture',
        slug: 'culture',
    },
    {
        name: 'Education',
        slug: 'education',
    },
    {
        name: 'Express',
        slug: 'express',
    },
    {
        name: 'Food',
        slug: 'food',
    },
    {
        name: 'Foreign',
        slug: 'foreign',
    },
    {
        name: 'Games',
        slug: 'games',
    },
    {
        name: 'Health',
        slug: 'health',
    },
    {
        name: 'Learning',
        slug: 'learning',
    },
    {
        name: 'Magazine',
        slug: 'magazine',
    },
    {
        name: 'Movies',
        slug: 'movies',
    },
    {
        name: 'Parenting',
        slug: 'parenting',
    },
    {
        name: 'Politics',
        slug: 'politics',
    },
    {
        name: 'Science',
        slug: 'science',
    },
    {
        name: 'Sports',
        slug: 'sports',
    },
    {
        name: 'Style',
        slug: 'style',
    },
    {
        name: 'Technology',
        slug: 'technology',
    },
    {
        name: 'Television',
        slug: 'television',
    },
    {
        name: 'Travel',
        slug: 'travel',
    },
    {
        name: 'U.S.',
        slug: 'u.s.',
    },
    {
        name: 'Weekend',
        slug: 'weekend',
    },
    {
        name: 'World',
        slug: 'world',
    },
];

export { menu, newsDesks, newsDesksForNotFound };