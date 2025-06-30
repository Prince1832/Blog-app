import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-gray-700 text-xl">Oops! Page not found.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
