// // client.ts
// import sanityClient from '@sanity/client'

// export default sanityClient({
//   projectId: '8zjje1se', // you can find this in sanity.json
//   dataset: 'production', // or the name you chose in step 1
//   useCdn: true // `false` if you want to ensure fresh data
// })

import {createClient} from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
})