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
                name: 'Foreign',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'foreign',
                    isSection: false,
                },
            },
            {
                name: 'Obitiuaries',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'obitiuaries',
                    isSection: true,
                },
            },
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
                name: 'Style',
                toRouteName: 'CategoryPage',
                params: {
                    category: 'tstyle',
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
]

export { menu };