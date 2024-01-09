import Link from "next/link";
import groq from "groq";
import client from "../client";
import { GetStaticProps } from "next";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

interface IndexProps {
  posts: Post[];
}

const Index: React.FC<IndexProps> = ({ posts }) => {
  return (
    <div>
      <h1>Welcome to a blog</h1>
      {posts.length > 0 && posts.map(
        ({_id, title = '', slug = '', publishedAt = ''}) =>
        slug && (
          <li key={_id}>
            <Link href={`/post/${encodeURIComponent(slug.current)}`}>
              {title}
            </Link> {'  '}
            ({ new Date(publishedAt).toDateString() })
          </li>
        )
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const posts = await client.fetch(
    groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`
  )
  return {
    props: {
      posts
    }
  }
}

export default Index;