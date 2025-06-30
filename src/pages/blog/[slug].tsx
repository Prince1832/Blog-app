import { GetServerSideProps } from 'next';
import Head from 'next/head';
import dbConnect from '@/lib/db';
import Post from '@/lib/models/Post';
import AdminNavbar from '@/components/AdminNavbar';

type BlogPostProps = {
  title: string;
  content: string;
  createdAt: string;
  slug: string;
};

export default function BlogPost({ title, content, createdAt, slug }: BlogPostProps) {
  const description = title.slice(0, 150);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fullUrl = `${baseUrl}/blog/${slug}`;
  const ogImage = `${baseUrl}/default-og-image.jpg`;

  return (
    <>

      <Head>
        <title>{title} | Blog</title>
        <meta name="description" content={description} />


        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:image" content={ogImage} />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <AdminNavbar />
      <main className="min-h-screen flex justify-center px-4 pt-24 bg-white mt-10">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-500 text-sm md:mb-5 mb-3">
            Published on {new Date(createdAt).toLocaleDateString()}
          </p>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>

    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  await dbConnect();

  const post = await Post.findOne({ slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      slug: post.slug,
    },
  };
};
