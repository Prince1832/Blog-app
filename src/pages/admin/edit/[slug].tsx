import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import withAuth from '@/lib/withAuth';
import AdminNavbar from '@/components/AdminNavbar';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/posts/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error('Failed to fetch post', err);
        toast.error('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error('Title and content required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/posts/${slug}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Post updated successfully');
      router.push('/admin');
    } catch (err) {
      console.error('Failed to update post', err);
      toast.error('Failed to update post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-lg text-gray-700">Loading post...</p>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="min-h-[100vh] md:mt-0 mt-10 md:min-h-screen bg-gradient-to-br from-gray-100 to-white px-4 py-12 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white md:p-8 p-4 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 bg-white"
          />

          <ReactQuill value={content} onChange={setContent} className="bg-white mb-4" />

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="md:mt-6 mt-3 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 cursor-pointer"
          >
            {saving ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </div>
    </>

  );
};

export default withAuth(EditPost);
