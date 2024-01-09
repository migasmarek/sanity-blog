// // frontend/pages/index.tsx

// import Link from 'next/link'
// import groq from 'groq'
// import client from '../utils/sanity/client'

// const Index = ({posts}) => {
//     return (
//       <div>
//         <h1>Welcome to a blog!</h1>
//         {posts.length > 0 && posts.map(
//           ({ _id, title = '', slug = '', publishedAt = '' }) =>
//             slug && (
//               <li key={_id}>
//                 <Link href={`/post/${encodeURIComponent(slug.current)}`}>
//                   {title}
//                 </Link>{' '}
//                 ({new Date(publishedAt).toDateString()})
//               </li>
//             )
//         )}
//       </div>
//     )
// }

// export async function getStaticProps() {
//     const posts = await client.fetch(groq`
//       *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
//     `)
//     return {
//       props: {
//         posts
//       }
//     }
// }

// export default Index

// ./src/app/page.tsx
import {client} from '@/src/utils/sanity/client'

type Post = {
  _id: string
  title?: string
  slug?: {
    current: string
  }
}

export async function PostIndex() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]`)

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <a href={post?.slug.current}>{post?.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Index