<template>
    <v-row class="mb-6">
        <v-col class="d-flex justify-center">
            <div class="text-h4">
                <span class="serif tracking-normal font-weight-black font-italic">{{ headerTitle }}</span>
                <!-- Maybe implement router-link on condition for ArticlePage view -->
                <!-- <router-link :to="{ name: 'CategoryPage', params: { category: category } }" class="text-decoration-none text-lowercase" :title="`${articleDetail.newsDesk} öffnen`"><span class="line-behind">{{ articleDetail.newsDesk }}</span>
                </router-link> -->
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        props: {
            headerTitle: String,
        }
    }
</script>