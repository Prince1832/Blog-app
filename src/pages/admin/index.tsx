import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import withAuth from '@/lib/withAuth';
import AdminNavbar from '@/components/AdminNavbar';

type Post = {
    _id: string;
    title: string;
    slug: string;
    createdAt: string;
};

const IndexPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [slugToDelete, setSlugToDelete] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get('/api/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(res.data);
            } catch (err) {
                console.error('Failed to fetch posts', err);
                toast.error('Unauthorized or failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async () => {
        if (!slugToDelete) return;
        const token = localStorage.getItem('token');
        if (!token) return toast.error('Unauthorized');

        try {
            await axios.delete(`/api/posts/${slugToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPosts(posts.filter((p) => p.slug !== slugToDelete));
            toast.success('Post deleted successfully!');
            setSlugToDelete(null);
        } catch (err) {
            console.error('Failed to delete post', err);
            toast.error('Failed to delete post.');
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="flex items-center justify-center min-h-[100vh] md:mt-0 mt-10 md:min-h-screen px-4 py-12 bg-gradient-to-br from-gray-100 to-white">
                <div className="w-full max-w-2xl bg-gray-100 rounded-xl border-2 border-white">
                    <div className="bg-white border-2 border-gray-300 rounded-xl md:p-6 p-4">
                        <div className="flex md:flex-row flex-col justify-between items-center mb-8">
                            <h1 className="md:text-4xl text-3xl font-bold text-gray-800 flex items-center gap-2 md:mb-0 mb-5">
                                Blog Posts
                            </h1>
                            <Link
                                href="/admin/create"
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2 rounded-lg shadow hover:from-green-600 hover:to-emerald-600 transition-all md:w-fit w-full"
                            >
                                <Plus size={18} /> Create New Post
                            </Link>
                        </div>

                        {loading ? (
                            <div className="space-y-6 animate-pulse">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-gray-100 p-5 rounded-xl border border-gray-300 shadow">
                                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-1" />
                                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                                    </div>
                                ))}
                            </div>
                        ) : posts.length === 0 ? (
                            <p className="text-gray-600 text-center mt-20">No blog posts found.</p>
                        ) : (
                            <div className="space-y-6">
                                {posts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-200 md:p-6 p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
                                    >
                                        <div className="mb-4 md:mb-0">
                                            <h2
                                                title={post.title}
                                                className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate overflow-hidden whitespace-nowrap w-full max-w-[70vw] sm:max-w-[60vw] md:max-w-xs lg:max-w-sm xl:max-w-md"
                                            >
                                                {post.title}
                                            </h2>


                                            <p className="text-gray-500 text-sm">
                                                Created on: {new Date(post.createdAt).toLocaleDateString()}
                                            </p>
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm mt-1 group"
                                            >
                                                <ExternalLink
                                                    size={14}
                                                    className="transition-transform duration-300 group-hover:rotate-45"
                                                />
                                                View Post
                                            </Link>
                                        </div>

                                        <div className="flex gap-3">
                                            <Link
                                                href={`/admin/edit/${post.slug}`}
                                                className="flex items-center gap-2 md:p-2 p-0 rounded-md text-blue-600 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <button
                                                onClick={() => setSlugToDelete(post.slug)}
                                                className="flex items-center gap-2 p-2 rounded-md text-red-500 hover:bg-red-100 transition-all duration-300 cursor-pointer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {slugToDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 text-center border-b border-gray-300 pb-3">
                            Confirm Deletion
                        </h3>
                        <p className="text-md text-gray-600 text-center">
                            Are you sure you want to delete this blog?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setSlugToDelete(null)}
                                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default withAuth(IndexPage);
