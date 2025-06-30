import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader2, LinkIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import withAuth from '@/lib/withAuth';
import AdminNavbar from '@/components/AdminNavbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error('Title and content are required.');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const slug = generateSlug(title);

      await axios.post(
        '/api/posts/create',
        { title, content, slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Post created successfully!');
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      const message =
        err?.response?.data?.message || 'Failed to create post.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-[100vh] mt-10 md:min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white md:p-8 p-4 rounded-2xl shadow-md">
          <h1 className="md:text-3xl text-2xl font-semibold text-gray-800 md:mb-6 mb-3 flex items-center gap-2">
            Create New Blog Post
          </h1>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-12 bg-gray-200 rounded w-full md:mb-6 mb-3" />

              <div className="h-5 bg-gray-300 rounded w-2/3 mb-2" />
              <div className="h-[300px] bg-gray-200 rounded w-full md:mb-6 mb-3" />

              <div className="h-10 bg-blue-200 rounded w-40" />
            </div>
          ) : (
            <>
              <div className="mb-5">
                <label className="block text-gray-700 mb-1 font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Enter title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              {title && (
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <LinkIcon size={15} className="text-blue-600" />
                  <span className="font-mono">{generateSlug(title)}</span>
                </p>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 mb-1 font-medium">Content</label>
                <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    style={{ height: '300px' }}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer"
              >
                {loading && <Loader2 className="animate-spin w-4 h-4" />}
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(CreatePost);
